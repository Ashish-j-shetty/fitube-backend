const { Playlist } = require("../models/playlist.model");

const createPlaylist = async (req, res) => {
  try {
    const playlist = req.body;

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

const updatePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { videoId } = req.body;

    const playlist = await Playlist.findOne({ _id: playlistId });

    const isExist = playlist.videos.includes(videoId);

    isExist ? playlist.videos.pull(videoId) : playlist.videos.push(videoId);

    await playlist.save();

    res.json({
      success: true,
      updatedPlaylist: playlist,
      message: "video added to playlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    await Playlist.findByIdAndDelete({ _id: playlistId });
    res.json({
      success: true,
      message: "playlist deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePlaylistInfo = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { newName } = req.body;

    const playlist = await Playlist.findOneAndUpdate(
      {
        _id: playlistId,
      },
      {
        name: newName,
      }
    );

    res.json({ success: true, playlist, message: "Playlist name updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPlaylist,
  getUserPlaylist,
  updatePlaylist,
  deletePlaylist,
  updatePlaylistInfo,
};
