const mongoose = require("mongoose");

const LikedVideoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  videos: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
      active: Boolean,
    },
  ],
});

const LikedVideo = mongoose.model("LikedVideo", LikedVideoSchema);

module.exports = LikedVideo;
