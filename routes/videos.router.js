const express = require("express");
const { getVideos, addVideos } = require("../controllers/video.controller");

const router = express.Router();

router.route("/").get(getVideos).post(addVideos);

module.exports = router;
