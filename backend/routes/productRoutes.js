const express = require("express");
const { 
    getProducts, 
    createProduct, 
    editProduct, 
    deleteProduct,
    getProductEdit 
} = require("../controllers/productController");
const auth = require("../middlewares/authMiddleware");
const Product = require("../models/Product");

const router = express.Router();

// Existing routes with auth middleware
router.get("/products", auth, getProducts);
router.post("/products", auth, createProduct);

// New routes for editing and deleting products
router.get("/products/edit/:id", auth, getProductEdit);
router.post("/products/edit/:id", auth, editProduct);
router.get("/products/delete/:id", auth, deleteProduct);

// API routes remain the same
router.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send("Error fetching products.");
    }
});

module.exports = router;