const mongoose = require('mongoose');

// Define a schema for notifications
const notificationSchema = new mongoose.Schema({
    // Unique identifier for the notification
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // This field is required
        ref: 'User' // Reference to the User model (can be Donor or Admin)
    },
    // Message content of the notification
    message: {
        type: String,
        required: true // This field is required
    },
    // Type of notification (e.g., appointment reminder, alert)
    notificationType: {
        type: String,
        required: true // This field is required
    },
    // Status of the notification (e.g., sent, delivered, read)
    status: {
        type: String,
        default: 'sent' // Default status when notification is created
    },
    // Timestamp when the notification was created
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to current date/time
    },
    // Timestamp for the last update of the notification
    updatedAt: {
        type: Date,
        default: Date.now // Automatically set to current date/time
    }
});

// Create a model based on the schema
const Notification = mongoose.model('Notification', notificationSchema);

// Export the model
module.exports = Notification;
