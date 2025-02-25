import express from "express";
import tagsRoute from "./routes/tags.js";
import photosRoute from "./routes/photos.js";
const app = express();
const PORT = 5050;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/tags", tagsRoute);

app.use("/photos", photosRoute);

app.listen(PORT, function () {
  console.log(`Server is running on PORT ${PORT}`);
});
