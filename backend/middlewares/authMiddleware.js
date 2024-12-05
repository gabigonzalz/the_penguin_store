const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Try to get the token from multiple sources
    const token = 
        req.headers.authorization?.split(" ")[1] || 
        req.query.token || 
        req.body.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");
        req.user = decoded; // Attach the decoded user to the request
        req.token = token; // Also attach the token for further use
        next();
    } catch (error) {
        return res.redirect("/login");
    }
};
