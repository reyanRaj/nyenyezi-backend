const mongoose = require("mongoose");

const User = mongoose.model(
  "Costumer",
  new mongoose.Schema({
    email: String,
    username: String,
  })
);

module.exports = User;
