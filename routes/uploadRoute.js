const express = require("express");
const fs = require("fs");
const path = require("path");
const { parseCsv } = require("../utils/csvParser");
const { insertUsers, getAgeDistribution } = require("../db/userModel");
const { generateReport } = require("../utils/reportGenerator");
const { moveFileToSuccess } = require("../utils/moveFiles");

const router = express.Router();
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

router.post("/upload", async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(400).json({ error: "No file uploaded" });

  const file = req.files.file;
  const filePath = path.join(uploadDir, file.name);

  try {
    await file.mv(filePath);
    res.json({ message: "File uploaded successfully!", filePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving file" });
  }
});

router.get("/process", async (req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);
    if (files.length === 0)
      return res.status(400).json({ error: "No uploaded file found!" });

    const filePath = path.join(uploadDir, files[0]);
    const users = await parseCsv(filePath);
    await insertUsers(users);
    const ages = await getAgeDistribution();
    const report = await generateReport(ages);

    moveFileToSuccess(filePath);
    res.json({
      message: "Processing Complete check console output for report!",
      report,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Processing failed" });
  }
});

module.exports = router;
