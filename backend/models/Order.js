const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: String,
  address: String,
  products: [String],
  total: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
