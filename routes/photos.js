import express from "express";
import fs from "fs";
const router = express.Router();

// Get Photos
router.get("/", (req, res) => {
  try {
    const photosFile = fs.readFileSync(process.cwd() + "/data/photos.json");
    const photos = JSON.parse(photosFile);
    res.json(photos);
  } catch (error) {
    res.status(500).send("Error reading photo files");
  }
});

router.get("/:id", (req, res) => {
  try {
    const photosFile = fs.readFileSync(process.cwd() + "/data/photos.json");
    const photos = JSON.parse(photosFile);

    const photoId = req.params.id;

    const individualPhoto = photos.find((photo) => photo.id === photoId);

    if (!individualPhoto) {
      return res.status(404).send("Photo not found");
    }

    res.json(individualPhoto);
  } catch (error) {
    res.status(500).send("Error reading individual photo");
    return;
  }
});

export default router;
