// jwtUtils.js
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Use an environment variable for security
const EXPIRATION_TIME = "1h"; // Token expiration time

// Function to create a token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: EXPIRATION_TIME,
  });
};

// Function to verify a token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null; // or handle error as needed
  }
};

module.exports = { generateToken, verifyToken };
