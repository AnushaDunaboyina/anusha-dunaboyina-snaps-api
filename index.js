import express from "express";
import cors from "cors";
import tagsRoute from "./routes/tags.js";
import photosRoute from "./routes/photos.js";

import "dotenv/config";

const port = process.env.PORT ?? 5050;
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use(express.static("public")); // Serve static files from the public folder

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/tags", tagsRoute);

app.use("/photos", photosRoute);

app.listen(port, function () {
  console.log(`Server is running on PORT ${port}`);
});
