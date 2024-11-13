const express = require("express");
const router = express.Router();
const BloodInventory = require("../models/BloodInventory/BloodInventory"); // Import BloodInventory model
const authMiddleware = require("../Middleware/AuthMiddleware");

/**
 * @route POST /inventory
 * @description Add new blood inventory
 * @access Admin
 * @body {Object} { centerId: ObjectId, bloodType: String, unitsAvailable: Number }
 * @returns {Object} Created blood inventory details
 */
router.post("/inventory", authMiddleware, async (req, res) => {
  try {
    const { centerId, bloodType, unitsAvailable } = req.body;
    const newInventory = new BloodInventory({
      centerId,
      bloodType,
      unitsAvailable,
      lastUpdated: Date.now(),
    });
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route GET /inventory
 * @description Get all blood inventories
 * @access Admin
 * @returns {Array} List of blood inventories
 */
router.get("/inventory", authMiddleware, async (req, res) => {
  try {
    const inventories = await BloodInventory.find();
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route GET /inventory/:id
 * @description Get a single blood inventory by ID
 * @access Admin
 * @params {String} id - Inventory ID
 * @returns {Object} Blood inventory details
 */
router.get("/inventory/:id", authMiddleware, async (req, res) => {
  try {
    const inventory = await BloodInventory.findById(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route PUT /inventory/:id
 * @description Update blood inventory details
 * @access Admin
 * @params {String} id - Inventory ID
 * @body {Object} { bloodType: String, unitsAvailable: Number }
 * @returns {Object} Updated blood inventory details
 */
router.put("/inventory/:id", authMiddleware, async (req, res) => {
  try {
    const { bloodType, unitsAvailable } = req.body;
    const inventory = await BloodInventory.findByIdAndUpdate(
      req.params.id,
      { bloodType, unitsAvailable },
      { new: true }
    );
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route DELETE /inventory/:id
 * @description Delete blood inventory by ID
 * @access Admin
 * @params {String} id - Inventory ID
 * @returns {204} No content
 */
router.delete("/inventory/:id", authMiddleware, async (req, res) => {
  try {
    const inventory = await BloodInventory.findByIdAndDelete(req.params.id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
