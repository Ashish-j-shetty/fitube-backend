const express = require("express");
const {
  createPlaylist,
  getUserPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} = require("../controllers/playlist.controller");
const router = express.Router();

router.route("/").post(createPlaylist);

router.route("/:userId").get(getUserPlaylist);

router
  .route("/:playlist")
  .post(addVideoToPlaylist)
  .delete(removeVideoFromPlaylist);

module.exports = router;
