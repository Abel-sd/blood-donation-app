const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment/Appointment "); // Import Appointment model
const authMiddleware = require("../Middleware/AuthMiddleware");

/**
 * @route POST /appointments
 * @description Create a new appointment for a donor
 * @access Public
 * @body {Object} { donorId: ObjectId, centerId: ObjectId, appointmentDate: Date, appointmentTime: String }
 * @returns {Object} Created appointment details
 */
router.post("/appointments", authMiddleware, async (req, res) => {
  try {
    const { donorId, centerId, appointmentDate, appointmentTime } = req.body;
    const newAppointment = new Appointment({
      donorId,
      centerId,
      appointmentDate,
      appointmentTime,
      status: "scheduled",
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route GET /appointments
 * @description Get all appointments
 * @access Public
 * @returns {Array} List of appointments
 */
router.get("/appointments", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route GET /appointments/:id
 * @description Get a single appointment by ID
 * @access Public
 * @params {String} id - Appointment ID
 * @returns {Object} Appointment details
 */
router.get("/appointments/:id", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route PUT /appointments/:id
 * @description Update an appointment
 * @access Public
 * @params {String} id - Appointment ID
 * @body {Object} { appointmentDate: Date, appointmentTime: String, status: String }
 * @returns {Object} Updated appointment details
 */
router.put("/appointments/:id", authMiddleware, async (req, res) => {
  try {
    const { appointmentDate, appointmentTime, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { appointmentDate, appointmentTime, status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route DELETE /appointments/:id
 * @description Delete an appointment
 * @access Public
 * @params {String} id - Appointment ID
 * @returns {204} No content
 */
router.delete("/appointments/:id", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
