const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback/Feedback"); // Import Feedback model

/**
 * @route POST /feedback
 * @description Submit feedback for an event
 * @access Public
 * @body {Object} { donorId: ObjectId, eventId: ObjectId, rating: Number, comments: String }
 * @returns {Object} Created feedback details
 */
router.post("/feedback", async (req, res) => {
  try {
    const { donorId, eventId, rating, comments } = req.body;
    const newFeedback = new Feedback({
      donorId,
      eventId,
      rating,
      comments,
      createdAt: Date.now(),
    });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route GET /feedback
 * @description Get all feedback
 * @access Public
 * @returns {Array} List of feedback
 */
router.get("/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
