const express = require("express");
const {
  createPlaylist,
  getUserPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require("../controllers/playlist.controller");
const router = express.Router();

router.route("/").post(createPlaylist);

router.route("/:userId").get(getUserPlaylist);

router.route("/:playlistId").post(updatePlaylist).delete(deletePlaylist);

module.exports = router;
