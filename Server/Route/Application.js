const express = require("express");
const router = express.Router();
const sql = require("../DB/connection");
const supabase = require("../supabaseClient");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const upload = multer();

router.post("/upload", upload.single("cv"), async (req, res) => {
  try {
    const { name, email, phone, education, experience, jobid } = req.body;
    const file = req.file;

    if (!name || !email || !phone || !education || !experience || !jobid) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let cvUrl = null;
    let userId;

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email};
    `;

    if (existingUser.length > 0) {
      userId = existingUser[0].id;
    } else {
      userId = uuidv4();
      await sql`
        INSERT INTO users (id, name, email, phone)
        VALUES (${userId}, ${name}, ${email}, ${phone});
      `;
    }

    const uniqueFileName = userId; // Use UUID as filename

    // Check if file already exists in Supabase
    const { data: existingFile, error: headError } = await supabase.storage
      .from(process.env.SUPABASE_PDF)
      .list("", {
        search: uniqueFileName,
      });

    const fileAlreadyExists = existingFile?.some((f) => f.name === uniqueFileName);

    if (!fileAlreadyExists && file) {
      const { error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_PDF)
        .upload(uniqueFileName, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        return res.status(500).json({ error: "File upload failed" });
      }
    }

    // Get public URL (whether just uploaded or already existed)
    const { data: publicUrlData } = supabase.storage
      .from(process.env.SUPABASE_PDF)
      .getPublicUrl(uniqueFileName);

    cvUrl = publicUrlData.publicUrl;

    // Insert job application
    await sql`
      INSERT INTO job_applications (
        user_id, job_id, email, full_name, contact_no, education, experience, resume_url
      )
      VALUES (
        ${userId}, ${jobid}, ${email}, ${name}, ${phone}, ${education}, ${experience}, ${cvUrl}
      );
    `;

    const [resumeData] = await sql`
      SELECT resume_url FROM job_applications 
      WHERE user_id = ${userId} AND job_id = ${jobid};
    `;

    const [jobDetails] = await sql`
      SELECT * FROM jobs WHERE id = ${jobid};
    `;

    return res.status(201).json({
      message: "Application submitted",
      userId: userId,
      resumeUrl: resumeData.resume_url,
      requiredFields: jobDetails,
    });

  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});





router.post("/post", async (req, res) => {
  const {
    position,
    location,
    department,
    salary,
    about,
    responsibilities,
    requirements,
    benefits,
    status
  } = req.body;

  try {
    const result = await sql.query(
      `
      INSERT INTO public.jobs (
        title,
        location,
        department,
        salary,
        description,
        responsibilities,
        requirements,
        benefits,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
      `,
      [
        position,
        location,
        department,
        salary,
        about,
        responsibilities,
        requirements,
        benefits,
        status
      ]
    );

    res.status(201).json({
      message: "Job created successfully",
      job: result.rows[0]
    });
  } catch (err) {
    console.error("Error inserting job:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
