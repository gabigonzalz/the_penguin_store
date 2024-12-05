const express = require("express");
const { getOrders } = require("../controllers/orderController");
const auth = require("../middlewares/authMiddleware");
const Order = require("../models/Order");

const router = express.Router();

router.get("/orders", auth, getOrders);

router.post("/api/orders", async (req, res) => {
    try {
        const { customer, address, products, total } = req.body;
        await Order.create({ customer, address, products: products.split(","), total });
        res.status(201).send("Order placed successfully!");
    } catch (error) {
        res.status(500).send("Error placing order.");
    }
});

module.exports = router;
