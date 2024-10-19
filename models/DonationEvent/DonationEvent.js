const mongoose = require("mongoose");

const donationEventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  location: {
    centerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Center",
    },
  },
  organizer: {
    type: String,
    required: true,
  },

  totalBloodCollected: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const DonationEvent = mongoose.model("DonationEvent", donationEventSchema);

module.exports = DonationEvent;
