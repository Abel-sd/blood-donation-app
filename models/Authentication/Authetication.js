const mongoose = require('mongoose');

// Define a schema for donors
const donorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true // First name is required
    },
    lastName: {
        type: String,
        required: true // Last name is required
    },
    email: {
        type: String,
        required: true,
        unique: true // Email must be unique
    },
    password: {
        type: String,
        required: true // Password is required
    },
    dateOfBirth: {
        type: Date // Date of birth can be optional
    },
    gender: {
        type: String // Gender can be optional
    },
    bloodType: {
        type: String // Blood type can be optional
    },
    contactInfo: {
        phone: {
            type: String // Phone number can be optional
        },
        address: {
            street: String,
            city: String,
            state: String,
            postalCode: String
        }
    },
    eligibilityStatus: {
        isEligible: {
            type: Boolean,
            default: false // Default eligibility status
        },
        nextEligibleDate: Date
    },
    healthInfo: {
        hemoglobinLevel: Number,
        bloodPressure: {
            systolic: Number,
            diastolic: Number
        }
    },
    donationHistory: [
        {
            donationId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Donation' // Reference to a Donation model if applicable
            },
            date: Date,
            location: String,
            donationType: String, // e.g., whole blood, plasma
            status: String // e.g., completed, deferred, canceled
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now // Timestamp when the donor record is created
    },
    updatedAt: {
        type: Date,
        default: Date.now // Timestamp when the donor record is last updated
    }
});

// Create a model based on the schema
const Donor = mongoose.model('Donor', donorSchema);

// Export the model
module.exports = Donor;
