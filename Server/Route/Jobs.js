const express = require("express");
const router = express.Router();
const sql = require("../DB/connection"); // Adjust path as needed

// GET /jobs - fetch all jobs
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await sql`
      SELECT 
        id,
        title,
        department,
        location,
        type,
        posted_date,
        salary,
        description,
        responsibilities,
        requirements,
        benefits,
        created_at,
        updated_at
      FROM public.jobs
      ORDER BY posted_date DESC;
    `;
    // console.log("Fetched jobs:", jobs);
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
