const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  thumbnail: String,
});

module.exports = new mongoose.model("user", userSchema);
