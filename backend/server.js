const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection
const MONGO_URI = "mongodb://localhost:27017/dc"; // Database name: dc
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});