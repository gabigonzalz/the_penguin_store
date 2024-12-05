const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
    const token = req.token; // Use the token from middleware
    try {
        const products = await Product.find();
        res.render("products", { 
            products, 
            token 
        });
    } catch (error) {
        res.status(500).send("Error loading products.");
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;
    const token = req.token; // Use the token from middleware

    try {
        await Product.create({ name, description, price, stock });
        res.redirect(`/products?token=${encodeURIComponent(token)}`);
    } catch (error) {
        res.status(500).send("Error creating product.");
    }
};

exports.editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const token = req.token; // Use the token from middleware

    try {
        await Product.findByIdAndUpdate(id, { 
            name, 
            description, 
            price, 
            stock 
        });
        res.redirect(`/products?token=${encodeURIComponent(token)}`);
    } catch (error) {
        res.status(500).send("Error updating product.");
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const token = req.token; // Use the token from middleware

    try {
        await Product.findByIdAndDelete(id);
        res.redirect(`/products?token=${encodeURIComponent(token)}`);
    } catch (error) {
        res.status(500).send("Error deleting product.");
    }
};

exports.getProductEdit = async (req, res) => {
    const { id } = req.params;
    const token = req.token; // Use the token from middleware

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render("product-edit", { 
            product, 
            token 
        });
    } catch (error) {
        res.status(500).send("Error loading product for editing.");
    }
};