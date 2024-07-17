require('dotenv').config(); // Ensure dotenv is configured at the top of your file
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (token == null) {
        return res.status(401).json({ error: "Access Denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for JWT secret
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid Token", token });
    }
}

module.exports = authenticateToken;