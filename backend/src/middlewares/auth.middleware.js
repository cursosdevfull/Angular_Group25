const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

function requireAuth(req, res, next) {
    const authorizationHeader = req.headers.authorization || "";

    if (!authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token is required" });
    }

    const token = authorizationHeader.slice("Bearer ".length).trim();

    if (!token) {
        return res.status(401).json({ message: "Authorization token is required" });
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = {
    requireAuth,
};