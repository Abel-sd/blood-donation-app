const mongoose = require('mongoose');

// Define a schema for blood inventory
const bloodInventorySchema = new mongoose.Schema({
    centerId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Blood Bank or Donation Center
        required: true,
        ref: 'Center' // Assuming you have a Center model for blood donation centers
    },
    bloodType: {
        type: String,
        required: true, // Blood type is required (e.g., A+, O-, B-)
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] // Possible blood types
    },
    unitsAvailable: {
        type: Number,
        required: true, // Number of blood units available is required
        min: 0 // Must be a non-negative number
    },
    lastUpdated: {
        type: Date,
        default: Date.now // Timestamp for when the inventory was last updated
    },
    createdAt: {
        type: Date,
        default: Date.now // Timestamp for when the inventory record was created
    },
    updatedAt: {
        type: Date,
        default: Date.now // Timestamp for the last update
    }
});

// Create a model based on the schema
const BloodInventory = mongoose.model('BloodInventory', bloodInventorySchema);

// Export the model
module.exports = BloodInventory;
