const JWT_SECRET = process.env.JWT_SECRET;

const jwt = require("jsonwebtoken");

function verifyRequest(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid user" });
    }
    let splitToken = token.split(" ")[1];
    const decode = jwt.verify(splitToken, JWT_SECRET);
    req.user = { userId: decode.userId };
    return next();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = verifyRequest;
