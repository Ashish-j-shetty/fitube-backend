const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: "Password should be provided",
    },
    email: {
      type: String,
      required: "Email is  required.",
      unique: true,
    },
    name: {
      type: String,
      required: "Name should be provided",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
