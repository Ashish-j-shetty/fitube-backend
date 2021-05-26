const LikedVideo = require("../models/likedvideo.model");

async function getLikedVideos(req, res) {
  const likedVideos = await LikedVideo.find({});

  res.status(200).json({ success: true, likedVideos });
}

module.exports = { getLikedVideos };
