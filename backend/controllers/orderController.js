const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  res.render("orders", { orders });
};
