const mongoose = require("mongoose");

const Branch = mongoose.model(
  "Branch",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Branch;
