const express = require('express');
const router = express.Router();
const Admin = require('./models/Admin'); // Import Admin model

/**
 * @route POST /admins
 * @description Create a new admin account
 * @access Public
 * @body {Object} { name: String, email: String, role: String, permissions: [String], assignedCenters: [Object] }
 * @returns {Object} Created admin details
 */
router.post('/admins', async (req, res) => {
    try {
        const { name, email, role, permissions, assignedCenters } = req.body;
        const newAdmin = new Admin({
            name,
            email,
            role,
            permissions,
            assignedCenters,
        });
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @route GET /admins
 * @description Get all admin accounts
 * @access Public
 * @returns {Array} List of all admin details
 */
router.get('/admins', async (req, res) => {
    try {
        const admins = await Admin.find(); // Fetch all admin users
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route GET /admins/:id
 * @description Get a single admin account by ID
 * @access Public
 * @params {String} id - Admin ID
 * @returns {Object} Admin details
 */
router.get('/admins/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @route PUT /admins/:id
 * @description Update an admin's profile
 * @access Public
 * @params {String} id - Admin ID
 * @body {Object} { name: String, email: String, role: String, permissions: [String], assignedCenters: [Object] }
 * @returns {Object} Updated admin details
 */
router.put('/admins/:id', async (req, res) => {
    try {
        const { name, email, role, permissions, assignedCenters } = req.body;
        const admin = await Admin.findByIdAndUpdate(req.params.id, {
            name,
            email,
            role,
            permissions,
            assignedCenters,
        }, { new: true }); // Return the updated document

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @route DELETE /admins/:id
 * @description Delete an admin account by ID
 * @access Public
 * @params {String} id - Admin ID
 * @returns {204} No content
 */
router.delete('/admins/:id', async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
