 
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

