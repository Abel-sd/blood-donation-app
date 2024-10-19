const mongoose = require('mongoose');

// Define a schema for donation events
const donationEventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true // Event name is required
    },
    eventDate: {
        type: Date,
        required: true // Event date is required
    },
    location: {
        centerId: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the donation center
            required: true,
            ref: 'Center' // Assuming you have a Center model for donation centers
        },
        centerName: {
            type: String,
            required: true // Center name is required
        },
        street: {
            type: String,
            required: true // Street address is required
        },
        city: {
            type: String,
            required: true // City is required
        },
        state: {
            type: String,
            required: true // State is required
        },
        postalCode: {
            type: String,
            required: true // Postal code is required
        }
    },
    organizer: {
        type: String,
        required: true // Organizer name is required
    },
    donorsParticipated: [
        {
            donorId: {
                type: mongoose.Schema.Types.ObjectId, // Reference to the Donor
                ref: 'Donor' // Assuming you have a Donor model
            },
            donationStatus: {
                type: String,
                enum: ['completed', 'deferred'], // Possible statuses
                required: true // Status is required
            }
        }
    ],
    totalBloodCollected: {
        type: Number,
        default: 0 // Default to 0 if not provided
    },
    createdAt: {
        type: Date,
        default: Date.now // Timestamp when the event record is created
    },
    updatedAt: {
        type: Date,
        default: Date.now // Timestamp for the last update
    }
});

// Create a model based on the schema
const DonationEvent = mongoose.model('DonationEvent', donationEventSchema);

// Export the model
module.exports = DonationEvent;
