const mongoose = require('mongoose');

// Define a schema for feedback
const feedbackSchema = new mongoose.Schema({
    // Reference to the donor who submitted the feedback
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // This field is required
        ref: 'Donor' // Link to the Donor model
    },
    // Reference to the event for which feedback is provided
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // This field is required
        ref: 'DonationEvent' // Link to the DonationEvent model
    },
    // Rating given by the donor for the event (1-5 scale)
    rating: {
        type: Number,
        required: true, // This field is required
        min: 1, // Minimum rating value
        max: 5 // Maximum rating value
    },
    // Additional comments provided by the donor
    comments: {
        type: String,
        required: false // This field is optional
    },
    // Timestamp when the feedback record is created
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to current date/time
    },
    // Timestamp for the last update of the feedback record
    updatedAt: {
        type: Date,
        default: Date.now // Automatically set to current date/time
    }
});

// Create a model based on the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Export the model for use in other parts of the application
module.exports = Feedback;
