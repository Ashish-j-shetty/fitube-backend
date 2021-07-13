const express = require("express");
const {
  createPlaylist,
  getUserPlaylist,
  updatePlaylist,
  updatePlaylistInfo,
  deletePlaylist,
} = require("../controllers/playlist.controller");

const router = express.Router();

router.route("/").post(createPlaylist);

router.route("/:userId").get(getUserPlaylist);

router.route("/:playlistId").post(updatePlaylist).delete(deletePlaylist);

router.route("/update/:playlistId").post(updatePlaylistInfo);

module.exports = router;
