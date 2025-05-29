const express = require("express");
require("dotenv").config();
const https = require("https");
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const router = express.Router();

function fetchPdfBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const data = [];
        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () => resolve(Buffer.concat(data)));
      })
      .on("error", reject);
  });
}

function buildEvaluationPrompt(resumeJson, jobJson) {
  return `
You are a recruitment assistant. Based on the resume and the job description, determine if the candidate is qualified, partially qualified, or not qualified. Give a reasoned analysis.

Respond in the following JSON format only:

{
  "matchLevel": "Qualified" | "Partially Qualified" | "Not Qualified",
  "reasons": [],
  "missingRequirements": [],
  "recommendations": []
}

Resume:
${JSON.stringify(resumeJson, null, 2)}

Job Description:
${JSON.stringify(jobJson, null, 2)}
`;
}

router.post("/getverdict", async (req, res) => {
  const { pdfUrl, job } = req.body;

  if (!pdfUrl) {
    return res.status(400).json({ error: "PDF URL is required" });
  }

  try {
    const pdfBuffer = await fetchPdfBuffer(pdfUrl);

    const extractionPrompt = `
Extract the following structured information from this resume. Respond only in JSON format.

In addition to the fields below, also include a problemSolvingEvidence field that summarizes any explicit or implicit evidence of the candidate demonstrating problem-solving skills — including through projects, work experience, leadership, or competitive programming.

Only include what is explicitly mentioned or strongly implied in the resume.

Respond with a valid JSON in the following structure:

{
  "contact": {
    "fullName": "",
    "email": "",
    "phone": "",
    "address": "",
    "linkedin": "",
    "github": ""
  },
  "education": [
    {
      "degree": "",
      "institution": "",
      "location": "",
      "cgpa": "",
      "graduationDate": ""
    }
  ],
  "skills": [],
  "workExperience": [
    {
      "title": "",
      "company": "",
      "location": "",
      "duration": "",
      "description": ""
    }
  ],
  "projects": [
    {
      "name": "",
      "description": ""
    }
  ],
  "problemSolvingEvidence": ""
}
`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: extractionPrompt },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: pdfBuffer.toString("base64"),
              },
            },
          ],
        },
      ],
    });

    let resumeText = result.response.text();
    if (resumeText.startsWith("```json")) {
      resumeText = resumeText.replace(/```json\s*/, "").replace(/```$/, "").trim();
    } else if (resumeText.startsWith("```")) {
      resumeText = resumeText.replace(/```/, "").replace(/```$/, "").trim();
    }

    const resumeJson = JSON.parse(resumeText);

    const evaluationPrompt = buildEvaluationPrompt(resumeJson, job);

    const evalResult = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: evaluationPrompt }],
        },
      ],
    });

    let evalText = evalResult.response.text();

    if (evalText.startsWith("```json")) {
      evalText = evalText.replace(/```json\s*/, "").replace(/```$/, "").trim();
    } else if (evalText.startsWith("```")) {
      evalText = evalText.replace(/```/, "").replace(/```$/, "").trim();
    }

    try {
      const jsonStart = evalText.indexOf("{");
      const jsonEnd = evalText.lastIndexOf("}");
      const cleanText = evalText.substring(jsonStart, jsonEnd + 1);
      const evaluationJson = JSON.parse(cleanText);

      return res.json({
        resume: resumeJson,
        evaluation: evaluationJson,
      });
    } catch (parseErr) {
      console.error("Failed to parse evaluation JSON:", parseErr, "\nRaw Response:", evalText);
      return res.status(500).json({ error: "Invalid response from model. Could not parse evaluation." });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Error processing PDF or evaluation" });
  }
});

module.exports = router;
