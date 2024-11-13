const express = require("express");
const router = express.Router();
const DonationEvent = require("../models/DonationEvent/DonationEvent"); // Import DonationEvent model
const authMiddleware = require("../Middleware/AuthMiddleware");

/**
 * @route POST /donation-events
 * @description Create a new donation event
 * @access Admin
 * @body {Object} { eventName: String, eventDate: Date, location: Object, organizer: String }
 * @returns {Object} Created donation event details
 */
router.post("/donation-events", authMiddleware, async (req, res) => {
  try {
    const { eventName, eventDate, location, organizer } = req.body;
    const newEvent = new DonationEvent({
      eventName,
      eventDate,
      location,
      organizer,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route GET /donation-events
 * @description Get all donation events
 * @access Public
 * @returns {Array} List of donation events
 */
router.get("/donation-events", authMiddleware, async (req, res) => {
  try {
    const events = await DonationEvent.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route GET /donation-events/:id
 * @description Get a single donation event by ID
 * @access Public
 * @params {String} id - Event ID
 * @returns {Object} Donation event details
 */
router.get("/donation-events/:id", authMiddleware, async (req, res) => {
  try {
    const event = await DonationEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route PUT /donation-events/:id
 * @description Update a donation event
 * @access Admin
 * @params {String} id - Event ID
 * @body {Object} { eventName: String, eventDate: Date, location: Object, organizer: String }
 * @returns {Object} Updated donation event details
 */
router.put("/donation-events/:id", async (req, res) => {
  try {
    const { eventName, eventDate, location, organizer } = req.body;
    const event = await DonationEvent.findByIdAndUpdate(
      req.params.id,
      { eventName, eventDate, location, organizer },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route DELETE /donation-events/:id
 * @description Delete a donation event
 * @access Admin
 * @params {String} id - Event ID
 * @returns {204} No content
 */
router.delete("/donation-events/:id", async (req, res) => {
  try {
    const event = await DonationEvent.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
