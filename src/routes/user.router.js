const express = require("express");
const { userSignup, userLogin } = require("../controllers/user.controller");

const router = express.Router();

router.route("/login").post(userLogin);

router.route("/signup").post(userSignup);

module.exports = router;
