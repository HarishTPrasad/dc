 
const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create a new user
const FormModel = require("./models/FormModel");

app.post("/api/submit-form", (req, res) => {
  const formData = req.body;

  const newForm = new FormModel(formData);
  newForm.save()
    .then(() => res.status(201).json({ message: "Form submitted successfully" }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;