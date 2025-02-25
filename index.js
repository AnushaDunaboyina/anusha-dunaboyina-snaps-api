import express from "express";
import tagsRoute from "./routes/tags.js";
import photosRoute from "./routes/photos.js";
import cors from "cors";

const port = process.env.PORT ?? 5050;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/tags", tagsRoute);

app.use("/photos", photosRoute);

app.listen(port, function () {
  console.log(`Server is running on PORT ${PORT}`);
});
