const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Playlist } = require("../models/playlist.model");
const secret = process.env.JWT_SECRET;

const { User } = require("../models/user.model");

const defaultPlaylist = [
  {
    name: "Liked Videos",
  },
  {
    name: "Saved Videos",
  },
  {
    name: "Watch Later Videos",
  },
];

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Incorect username or password" });
      }
      const token = jwt.sign(
        { username: user.username, userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.status(200).json({
        success: true,
        user: { name: user.name, email: user.email, userId: user._id },
        token,
        message: "Login successfull",
      });
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
    const { name, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "This email id is already registered with us",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    defaultPlaylist.forEach(async (item) => {
      const newplaylist = new Playlist({
        owner: savedUser._id,
        name: item.name,
        videos: [],
      });
      await newplaylist.save();
    });

    const token = jwt.sign({ userId: savedUser._id }, secret, {
      expiresIn: "30d",
    });

    res.json({
      success: true,
      user: {
        name: savedUser.name,
        email: savedUser.email,
        userId: savedUser._id,
      },
      token,
      message: "Signed up successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

const updateAccount = async (req, res) => {
  try {
    const newDetails = req.body;

    const { id } = newDetails;

    const user = await User.findById({ _id: id });

    if (user) {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(newDetails.password, salt);

      const newUser = await User.findOneAndUpdate(
        { _id: id },
        {
          name: newDetails.name,
          email: newDetails.email,
          password: hashedPassword,
          updatedAt: Date(),
        }
      );

      res.json({ success: true, message: newUser });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { userLogin, userSignup, updateAccount };
