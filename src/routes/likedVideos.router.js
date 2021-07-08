const express = require("express");
const {
  getLikedVideos,
  postLikedVideos,
} = require("../controllers/likedVideo.controller");
const auth = require("../middlewares/auth.middelware");

const router = express.Router();

router.route("/").get(auth, getLikedVideos).post(auth, postLikedVideos);

module.exports = router;
