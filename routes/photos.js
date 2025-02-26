import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
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

// Get individual photos
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

// Get comments for individual photos
router.get("/:id/comments", (req, res) => {
  try {
    const photosFile = fs.readFileSync(process.cwd() + "/data/photos.json");
    const photos = JSON.parse(photosFile);

    const photoId = req.params.id;

    const individualPhoto = photos.find((photo) => photo.id === photoId);

    if (!individualPhoto) {
      return res.status(404).send("Photo not found");
    }

    const comments = individualPhoto.comments || [];

    res.json(comments);
  } catch (error) {
    res.status(500).send("Error fetching comments");
    return;
  }
});

// Post a new comment
router.post("/:id/comments", (req, res) => {
  try {
    const photosFile = fs.readFileSync(process.cwd() + "/data/photos.json");
    const photos = JSON.parse(photosFile);

    const photoId = req.params.id;

    const individualPhoto = photos.find((photo) => photo.id === photoId);

    if (!individualPhoto) {
      return res.status(404).send("Photo not found");
    }

    const { name, comment } = req.body;

    if (!name || !comment) {
      return res.status(400).send("Name and comment are required");
    }

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      timestamp: Date.now(),
    };

    if (!individualPhoto.comments) {
      individualPhoto.comments = [];
    }
    individualPhoto.comments.push(newComment);

    fs.writeFileSync(
      process.cwd() + "/data/photos.json",
      JSON.stringify(photos, null, 2)
    );

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error posting comments:", error);
    res.status(500).send("Error posting comment");
  }
});

// Update the Photos URLs

router.post("/", (req, res) => {
  try {
    const photosFile = fs.readFileSync(process.cwd() + "/data/photos.json");
    const photos = JSON.parse(photosFile);
    const baseUrl = "http://localhost:5050/images";

    const updatedPhotosUrl = photos.map((photo) => {
      const photoFileName = photo.photo.split("/").pop();

      // Replace the old URL with the new one
      return {
        ...photo,
        photo: `${baseUrl}/${photoFileName}`,
      };
    });

    // save the updated data back to the photos.json file
    fs.writeFileSync(
      process.cwd() + "/data/photos.json",
      JSON.stringify(updatedPhotosUrl, null, 2)
    );

    res.status(200).json("Photo URLs updated successfully");
  } catch (error) {
    console.error("Error updating photo URLs:", error);
    res.status(500).send("Error updating photo URLs");
  }
});

export default router;
