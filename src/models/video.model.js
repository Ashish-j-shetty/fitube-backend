const mongoose = require("mongoose");
const getData = require("../database/fakeData");

const VideoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: "VideoId must be provided",
      unique: true,
    },
    title: {
      type: String,
      required: "Video title should be available",
    },
    autor: String,
    subscribers: Number,
    date: Date,
    description: String,
    views: Number,
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);

async function populateVideoColletion() {
  const data = await getData();
  try {
    data.forEach(async (item) => {
      const videos = new Video(item);
      await videos.save();
    });
  } catch (error) {}
}

module.exports = { Video, populateVideoColletion };
