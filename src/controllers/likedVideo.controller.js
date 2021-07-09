const LikedVideo = require("../models/likedvideo.model");

async function getLikedVideos(req, res) {
  const { _id } = req.user;

  let likedVideos = await LikedVideo.findById({ _id });
  if (!likedVideos) {
    likedVideos = new LikedVideo({ userId: _id, videos: [] });
    likedVideos = await likedVideos.save();
    return res.status(200).json({ success: true, likedVideos });
  }

  likedVideos = await likedVideos.populate("videos._id").execPopulate();
}

async function postLikedVideos(req, res) {
  try {
    const { _id } = req.user;

    const { videoId } = req.body;

    let userLikedVideos = await LikedVideo.findOne({ userId: _id });

    console.log(userLikedVideos);
    userLikedVideos.videos.push({ videoId });

    userLikedVideos = await userLikedVideos.save();

    res.status(200).json({ success: true, message: "Posted", userLikedVideos });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
}

module.exports = { getLikedVideos, postLikedVideos };
