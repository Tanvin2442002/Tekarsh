const express = require("express");
const router = express.Router();
const sql = require("../DB/connection"); 

router.post("/resumes", async (req, res) => {
  try {
    const { userId, resume } = req.body;

    if (!userId || !resume) {
      return res.status(400).json({ error: "Missing userId or resume" });
    }

    const {
      contact,
      education,
      skills,
      workExperience,
      projects,
      problemSolvingEvidence
    } = resume;

    // Insert into resumes table
    const result = await sql`
      INSERT INTO resumes (
        user_id,
        contact,
        education,
        skills,
        work_experience,
        projects,
        problem_solving_evidence
      )
      VALUES (
        ${userId},
        ${sql.json(contact)},
        ${sql.json(education)},
        ${skills || []},
        ${sql.json(workExperience)},
        ${sql.json(projects)},
        ${problemSolvingEvidence || ""}
      )
      RETURNING *;
    `;

    return res.status(201).json({
      message: "Resume saved successfully",
      resume: result[0]
    });

  } catch (err) {
    console.error("Error saving resume:", err);
    return res.status(500).json({ error: "Failed to save resume" });
  }
});

module.exports = router;
