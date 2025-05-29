const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const applicationRoutes = require('./Route/Application');
const jobRoutes = require('./Route/Jobs');
const messagesRoutes = require('./Route/Messages');
const verdictRoutes = require('./Route/getverdict');
const resumeRoutes = require('./Route/Resume');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', applicationRoutes);
app.use('/api', jobRoutes);
app.use('/api', messagesRoutes);
app.use('/api', verdictRoutes);
app.use('/api', resumeRoutes);

// app.get("/", async (req, res) => {
//   console.log("Hello World");
// });
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});