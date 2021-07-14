const express = require("express");
const {
  userSignup,
  userLogin,
  updateAccount,
} = require("../controllers/user.controller");

const router = express.Router();

router.route("/login").post(userLogin);

router.route("/signup").post(userSignup);

router.route("/account").post(updateAccount);

module.exports = router;
