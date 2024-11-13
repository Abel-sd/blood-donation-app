const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification/Notification"); // Import Notification model

/**
 * @route POST /notifications
 * @description Create a new notification
 * @access Public
 * @body {Object} { recipientId: ObjectId, message: String, notificationType: String }
 * @returns {Object} Created notification details
 */
router.post("/notifications", async (req, res) => {
  try {
    const { recipientId, message, notificationType } = req.body; // Extract data from the request body
    const newNotification = new Notification({
      recipientId,
      message,
      notificationType,
      status: "sent", // Status indicating the notification has been sent
    });
    await newNotification.save(); // Save the notification to the database
    res.status(201).json(newNotification); // Respond with the created notification
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
});

/**
 * @route GET /notifications
 * @description Get all notifications
 * @access Public
 * @returns {Array} List of all notifications
 */
router.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find(); // Fetch all notifications from the database
    res.status(200).json(notifications); // Respond with the list of notifications
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle internal server errors
  }
});

/**
 * @route GET /notifications/:id
 * @description Get a single notification by ID
 * @access Public
 * @params {String} id - Notification ID
 * @returns {Object} Notification details
 */
router.get("/notifications/:id", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id); // Fetch notification by ID
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" }); // Handle not found
    }
    res.status(200).json(notification); // Respond with the found notification
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle internal server errors
  }
});

/**
 * @route PUT /notifications/:id
 * @description Update a notification status
 * @access Public
 * @params {String} id - Notification ID
 * @body {Object} { status: String } // Update status or other fields as necessary
 * @returns {Object} Updated notification details
 */
router.put("/notifications/:id", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); // Update notification
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" }); // Handle not found
    }
    res.status(200).json(notification); // Respond with the updated notification
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
});

/**
 * @route DELETE /notifications/:id
 * @description Delete a notification by ID
 * @access Public
 * @params {String} id - Notification ID
 * @returns {204} No content
 */
router.delete("/notifications/:id", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id); // Delete notification by ID
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" }); // Handle not found
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle internal server errors
  }
});

// Export the router
module.exports = router;
