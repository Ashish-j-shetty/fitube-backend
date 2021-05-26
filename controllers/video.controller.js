const { Video } = require("../models/video.model");

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});

    res.status(200).json({ succes: true, videos });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

module.exports = { getVideos };
