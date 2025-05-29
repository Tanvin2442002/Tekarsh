const express = require("express");
const router = express.Router();
const sql = require("../DB/connection");



router.post("/messages", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await sql`
      INSERT INTO messages (name, email, phone, subject, message)
      VALUES (${name}, ${email}, ${phone}, ${subject}, ${message})
      RETURNING *;
    `;

    return res.status(201).json({
      message: "Message submitted successfully",
      data: result[0],
    });
  } catch (err) {
    console.error("Insert Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/subscribe", async(req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  try {
    const result = await sql`
      INSERT INTO newsletter (email)
      VALUES (${email}) 
    `;
    console.log("Subscription Result:", result);
    return res.status(200).json({ message: "Subscription successful" });
  } catch (err) {
    console.error("Subscription Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }

});

module.exports = router;


module.exports = router;
