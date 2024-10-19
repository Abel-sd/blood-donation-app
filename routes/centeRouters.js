const express = require("express");
const router = express.Router();
const Center = require("../models/Center/Center");

/**
 * @route POST /center
 * @description Add a new blood donation center
 * @access Admin
 * @body {Object} { centerName: String, address: Object, contactInfo: Object, workingHours: Object, bloodInventory: Object }
 * @returns {Object} Created center details
 */
router.post("/center", async (req, res) => {
  try {
    const { centerName, address, contactInfo, workingHours, bloodInventory } =
      req.body;
    const newCenter = new Center({
      centerName,
      address,
      contactInfo,
      workingHours,
      bloodInventory,
    });
    await newCenter.save();
    res.status(201).json(newCenter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/center", async (req, res) => {
  try {
    const centers = await Center.find();
    res.status(200).json(centers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/center/:id", async (req, res) => {
  try {
    const center = await Center.findById(req.params.id);
    if (!center) {
      return res.status(404).json({ message: "Center not found" });
    }
    res.status(200).json(center);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/center/:id", async (req, res) => {
  try {
    const { centerName, address, contactInfo, workingHours, bloodInventory } =
      req.body;
    const updatedCenter = {
      centerName,
      address,
      contactInfo,
      workingHours,
      bloodInventory,
    };
    const center = await Center.findByIdAndUpdate(
      req.params.id,
      updatedCenter,
      { new: true }
    );
    if (!center) {
      return res.status(404).json({ message: "Center not found" });
    }
    res.status(200).json(center);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
