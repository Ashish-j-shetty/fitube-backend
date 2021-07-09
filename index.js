require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const { initializeDBConnection } = require("./src/database/db.connect");
const {
  routeNotFound,
} = require("./src/middlewares/route-not-found-middelware");
const { errorHandler } = require("./src/middlewares/error-handler-middelware");

const videoRouter = require("./src/routes/videos.router");

const userRouter = require("./src/routes/user.router");
const playlistRouter = require("./src/routes/playlist.router");
const { populateVideoColletion } = require("./src/models/video.model");
const verifyRequest = require("./src/middlewares/auth.middelware");
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

app.use("/user", userRouter);
app.use("/video", videoRouter);

app.use("/playlists", playlistRouter);

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
