const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
        return res.status(401).render("login", { error: "Invalid credentials" });
    }

    // Use environment variable for JWT secret, with a fallback
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secretKey", {
        expiresIn: "1h" // Optional: add token expiration
    });

    // Redirige al dashboard con el token en el parámetro de query
    res.redirect(`/dashboard?token=${encodeURIComponent(token)}`);
};