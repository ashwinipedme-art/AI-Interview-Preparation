
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied! Token गायब है।" });
    }

    try {
        const tokenString = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;
        const verified = jwt.verify(tokenString, process.env.JWT_SECRET || "defaultsecret");
        
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token!" });
    }
};

module.exports = authMiddleware;