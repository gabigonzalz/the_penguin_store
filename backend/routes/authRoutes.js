const express = require("express");
const { login } = require("../controllers/authController");
const router = express.Router();

router.get("/login", (req, res) => res.render("login"));
router.post("/login", login);

router.get("/dashboard", (req, res) => {
    const token = req.query.token; // Obtiene el token desde el parámetro de query
    if (!token) {
        return res.redirect("/login");
    }
    res.render("dashboard", { token }); // Pasa el token a la vista
});



module.exports = router;
