const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://10.0.1.221:2025", // Allow requests from the React frontend running on port 2025
  })
);
app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection
const MONGO_URI = "mongodb://10.0.1.221:27017/mernapp"; // Use "mongo" as the hostname (Docker service name)

const connectWithRetry = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    });
};

connectWithRetry(); // Initial connection attempt

// Import FormModel
const FormModel = require("./models/FormModel");

// Route to handle form submission
app.post("/api/submit-form", async (req, res) => {
  try {
    const formData = req.body; // Access the form data from the request body

    // Log the received data
    console.log("Received form data:", formData);

    // Save the form data to MongoDB
    const newForm = new FormModel(formData);
    await newForm.save();

    // Send success response
    res.status(201).json({ message: "Form submitted successfully", data: formData });
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(400).json({ error: err.message });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Start the server
const PORT = process.env.PORT || 2026; // Use port 2026 for the backend
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});