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
    dateOfBirth: {
        type: Date,
        required: true // Date of birth is required
    },
    gender: {
        type: String,
        required: true // Gender is required
    },
    bloodType: {
        type: String,
        required: true, // Blood type is required (e.g., A+, O-, B-)
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] // Possible blood types
    },
    contactInfo: {
        phone: {
            type: String,
            required: true // Phone number is required
        },
        email: {
            type: String,
            required: true,
            unique: true // Email must be unique
        },
        address: {
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
            date: {
                type: Date,
                required: true // Date of donation is required
            },
            location: {
                type: String,
                required: true // Location of donation is required
            },
            donationType: {
                type: String,
                required: true // e.g., whole blood, plasma
            },
            status: {
                type: String,
                enum: ['completed', 'deferred', 'canceled'], // Possible donation statuses
                required: true // Status is required
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now // Timestamp when the donor record is created
    },
    updatedAt: {
        type: Date,
        default: Date.now // Timestamp for the last update
    }
});

// Create a model based on the schema
const Donor = mongoose.model('Donor', donorSchema);

// Export the model
module.exports = Donor;
