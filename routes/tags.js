import express from "express";
import fs from "fs";
const router = express.Router();

// Get Tags
router.get("/", (req, res) => {
  try {
    const tagsFile = fs.readFileSync(process.cwd() + "/data/tags.json");
    const tags = JSON.parse(tagsFile);
    res.json(tags);
  } catch (error) {
    res.status(500).send("Error reading tag files");
  }
});

export default router;
