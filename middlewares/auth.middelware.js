const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { User } = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "No token , authorization denied!" });
    }
    token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(id);

    if (user) {
      req.user = user;
      return next();
    }

    res.status(401).json({ success: false, message: "authorization denied!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = auth;
