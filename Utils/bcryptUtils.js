// bcryptUtils.js
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10; // Number of salt rounds for hashing

// Function to hash a password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

// Function to verify a password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, verifyPassword };
