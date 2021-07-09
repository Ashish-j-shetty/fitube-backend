const { Playlist } = require("../models/playlist.model");

const createPlaylist = async (req, res) => {
  try {
    const playlist = req.body;

    console.log(playlist);

    const newPlaylist = new Playlist(playlist);
    await newPlaylist.save();

    res.json({
      success: true,
      playlist: newPlaylist,
      message: "New playlist has been created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getUserPlaylist = async (req, res) => {
  try {
    const { userId } = req.params;

    const playlists = await Playlist.find({ owner: { _id: userId } });
    res.json({ success: true, playlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.messsage });
  }
};

const addVideoToPlaylist = async (req, res) => {
  try {
  } catch (error) {}
};

const removeVideoFromPlaylist = async (req, res) => {};

module.exports = {
  createPlaylist,
  getUserPlaylist,
  removeVideoFromPlaylist,
  addVideoToPlaylist,
};
