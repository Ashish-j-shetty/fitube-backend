const express = require("express");
const { getLikedVideos } = require("../controllers/likedVideo.controller");
const auth = require("../middlewares/auth.middelware");

const router = express.Router();

router.route("/").get(auth, getLikedVideos);

module.exports = router;
