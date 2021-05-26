const express = require("express");
const { getLikedVideos } = require("../controllers/likedVideo.controller");

const router = express.Router();

router.route("/").get(getLikedVideos);

module.exports = router;
