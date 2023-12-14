const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  injury: String,
  painScale: Number,
  code: {
    type: String,
    default: () => Math.random().toString(36).substr(2, 9) // Generates a random code
  },
});


const Patient = mongoose.model('Patient', PatientSchema);

app.post('/api/register', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // You can decide whether to exit the process or not
  // process.exit(1);
});

// Replace with your MongoDB URI
mongoose.connect('mongodb://localhost:27017/hospitalDB');

const port = process.env.PORT || 3001; // Changed to 3001 to avoid conflict with React's default port
app.listen(port, () => console.log(`Server running on port ${port}`));
