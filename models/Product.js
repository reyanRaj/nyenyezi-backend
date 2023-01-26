const mongoose = require("mongoose");

const User = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    price: mongoose.Decimal128,
    description: String,
  })
);

module.exports = User;
