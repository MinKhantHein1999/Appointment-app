const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  appointDate : String,
  name : String,
  email : String
});

module.exports = mongoose.model("appointment", userSchema);
