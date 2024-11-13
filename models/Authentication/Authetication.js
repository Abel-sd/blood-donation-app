const mongoose = require("mongoose");

// Define a schema for donors
const authenticationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // First name is required
  },
  lastName: {
    type: String,
    required: true, // Last name is required
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email must be unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  role: {
    type: String,
    enum: [ "admin", "hospital"],
    default: "donor",
  },
});

// Create a model based on the schema
const Auth = mongoose.model("Auth", authenticationSchema);

module.exports = Auth;
