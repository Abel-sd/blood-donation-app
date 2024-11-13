const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor/Donor"); // Import Donor model
const authMiddleware = require("../Middleware/AuthMiddleware");

/**
 * @route POST /donors
 * @description Create a new donor
 * @access Public
 * @body {Object} { firstName: String, lastName: String, dateOfBirth: Date, gender: String, bloodType: String, contactInfo: Object }
 * @returns {Object} Created donor details
 */
router.post("/donors", authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, bloodType, contactInfo } =
      req.body;
    const newDonor = new Donor({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      bloodType,
      contactInfo,
    });
    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route GET /donors
 * @description Get all donors
 * @access Public
 * @returns {Array} List of all donor details
 */
router.get("/donors", authMiddleware, async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route GET /donors/:id
 * @description Get a single donor by ID
 * @access Public
 * @params {String} id - Donor ID
 * @returns {Object} Donor details
 */
router.get("/donors/:id", authMiddleware, async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route PUT /donors/:id
 * @description Update a donor's profile
 * @access Public
 * @params {String} id - Donor ID
 * @body {Object} { firstName: String, lastName: String, dateOfBirth: Date, gender: String, bloodType: String, contactInfo: Object }
 * @returns {Object} Updated donor details
 */
router.put("/donors/:id", authMiddleware, async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route DELETE /donors/:id
 * @description Delete a donor
 * @access Public
 * @params {String} id - Donor ID
 * @returns {204} No content
 */
router.delete("/donors/:id", async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
