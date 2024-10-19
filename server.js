const express = require("express");
const mongoose = require("mongoose");
const donorRoutes = require("./routes/donorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const centerRoutes = require("./routes/centerRoutes");
const bloodInventoryRoutes = require("./routes/bloodInventoryRoutes");
const donationEventRoutes = require("./routes/donationEventRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/blood-donation")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/donors", donorRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/centers", centerRoutes);
app.use("/api/blood-inventory", bloodInventoryRoutes);
app.use("/api/donation-events", donationEventRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(5001, () => console.log("Server started on port 5001"));
