const express = require("express");

const Donor = require("./models/Donor");
const Auths = require("../models/Authentication/Authetication");
const router = express.Router();
const { hashPassword, verifyPassword } = require("../Utils/bcryptUtils");
const { generateToken } = require("../Utils/Jwtutils");

/**
 * @route POST /register-admin
 * @description Register a new admin
 * @access Public
 * @body {Object} { name: String, email: String, password: String, role: String }
 * @returns {Object} New admin details
 */
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newAdmin = new Auths({
      firstName,
      lastName,

      email,
      password: hashedPassword,
      role: "admin",
    });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route POST /login-admin
 * @description Admin login
 * @access Public
 * @body {Object} { email: String, password: String }
 * @returns {String} JWT token
 */
router.post("/login-admin", async (req, res) => {
  try {
    const admin = await Auths.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const match = await verifyPassword(req.body.password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(admin);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
