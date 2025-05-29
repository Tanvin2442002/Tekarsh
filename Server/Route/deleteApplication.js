const express = require("express");
const router = express.Router();
const sql = require("../DB/connection"); 

router.delete("/deleteApplication", async (req, res) => {
  const { userId, jobId } = req.query;

  if (!userId || !jobId) {
    return res.status(400).json({ error: "Missing userId or jobId in query params." });
  }

  try {
    const result = await sql`
      DELETE FROM job_applications
      WHERE user_id = ${userId} AND job_id = ${jobId}
      RETURNING *;
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "No matching job application found." });
    }

    res.json({ message: "Job application deleted.", deleted: result[0] });
  } catch (error) {
    console.error("Error deleting job application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
