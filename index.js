require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const { initializeDBConnection } = require("./database/db.connect");
const { routeNotFound } = require("./middlewares/route-not-fount-middelware");
const { errorHandler } = require("./middlewares/error-handler-middelware");

const videoRouter = require("./routes/videos.router");
const { populateVideoColletion } = require("./models/video.model");

/**
 * Database connection do not move the code.
 */
(async () => {
  await initializeDBConnection();
})();

/**
 * one time dump of video data
 */

//populateVideoColletion();

app.get("/", (req, res) => {
  res.json({ mssage: "welcome to fittube api explorer" });
});

app.use("/video", videoRouter);

/**
 * Route not found middleware do not move
 */
app.use(routeNotFound);

/**
 * Error handler middleware do not move
 */
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
