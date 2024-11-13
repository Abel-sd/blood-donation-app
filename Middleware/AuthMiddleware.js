// authMiddleware.js
const { verifyToken } = require("../Utils/Jwtutils");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = decoded;
  next();
};

module.exports = authMiddleware;
