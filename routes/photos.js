import express from "express";
import fs from "fs";
const router = express.Router();

// Get Tags
router.get("/", (req, res) => {
  try {
    const photosFile = fs.readFileSync(process.cwd() + "/data/photos.json");
    const photos = JSON.parse(photosFile);
    res.json(photos);
  } catch (error) {
    res.status(500).send("Error reading tag files");
  }
});

export default router;
