const express = require("express");
const {
  getLikedVideos,
  postLikedVideos,
} = require("../controllers/likedVideo.controller");

const router = express.Router();

router.route("/").get(getLikedVideos).post(postLikedVideos);

module.exports = router;
