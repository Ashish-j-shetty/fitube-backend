const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user.model");

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res
          .status(401)
          .json({ success: false, message: "Incorect username or password" });
      }
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.status(200).json({ success: true, token });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Incorect username or password" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

const userSignup = async (req, res) => {
  try {
    const user = req.body;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = new User(user);
    await newUser.save();
    res.status(201).json({ success: true, data: "User created successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

module.exports = { userLogin, userSignup };
