const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/user.model");

module.exports.auth = async (req, res, next) => {
  try {
    const token = req.header.authorization;
    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "No token , authorization denied!" });
    }
    token = req.header.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
