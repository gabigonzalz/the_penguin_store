const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

require("dotenv").config();


const app = express();
connectDB();

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);

app.listen(3000, () => console.log("Admin Panel running on http://localhost:3000/login"));
