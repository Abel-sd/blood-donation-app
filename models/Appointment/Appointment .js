const mongoose = require('mongoose');

// Define a schema for appointments
const appointmentSchema = new mongoose.Schema({
    donorId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Donor
        required: true,
        ref: 'Donor' // Assuming you have a Donor model
    },
    centerId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Blood Bank center
        required: true,
        ref: 'BloodBank' // Assuming you have a BloodBank model
    },
    appointmentDate: {
        type: Date,
        required: true // The date of the appointment
    },
    appointmentTime: {
        type: String, // Time format (e.g., "10:00 AM")
        required: true // The time of the appointment
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'canceled'], // Possible appointment statuses
        default: 'scheduled' // Default status when an appointment is created
    },
    createdAt: {
        type: Date,
        default: Date.now // Record the creation time of the appointment
    },
    updatedAt: {
        type: Date,
        default: Date.now // Record the last update time
    }
});

// Create a model based on the schema
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Export the model
module.exports = Appointment;
