const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Costumer",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
    date: { type: Date, default: Date.now },
    total: mongoose.Decimal128,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

module.exports = Transaction;
