const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Donor = require('./models/Donor');
const Admin = require('./models/Admin');
const router = express.Router();

// JWT secret for signing tokens
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your own secret

/**
 * @route POST /register-donor
 * @description Register a new donor
 * @access Public
 * @body {Object} { firstName: String, lastName: String, email: String, password: String }
 * @returns {Object} New donor details
 */
router.post('/register-donor', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDonor = new Donor({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        await newDonor.save();
        res.status(201).json(newDonor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @route POST /login-donor
 * @description Donor login
 * @access Public
 * @body {Object} { email: String, password: String }
 * @returns {String} JWT token
 */
router.post('/login-donor', async (req, res) => {
    try {
        const donor = await Donor.findOne({ email: req.body.email });
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        const match = await bcrypt.compare(req.body.password, donor.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ donorId: donor._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route POST /register-admin
 * @description Register a new admin
 * @access Public
 * @body {Object} { name: String, email: String, password: String, role: String }
 * @returns {Object} New admin details
 */
router.post('/register-admin', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            role
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
router.post('/login-admin', async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const match = await bcrypt.compare(req.body.password, admin.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
