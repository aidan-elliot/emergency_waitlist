require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Use environment variable for MongoDB URI
const uri = process.env.MONGODB_URI;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

connect(); // Connect to MongoDB Atlas

const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  injury: String,
  painScale: Number,
  code: { type: String, default: () => Math.random().toString(36).substr(2, 9) },
});

const Patient = mongoose.model('Patient', PatientSchema);

// Handle uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});

// API endpoints

// POST: Register a new patient
app.post('/api/patients', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: Retrieve all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve a single patient by ID
app.get('/api/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update a patient's details
app.put('/api/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });yleeakrx5
    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a patient
app.delete('/api/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve a patient by code
app.get('/api/patients/code/:code', async (req, res) => {
  try {
    const patients = await Patient.find().sort({ priorityScore: -1 });
    const patientIndex = patients.findIndex(p => p.code === req.params.code);
    if (patientIndex === -1) return res.status(404).json({ message: 'Patient not found' });

    const patient = patients[patientIndex];
    const waitTime = patientIndex * 15; // 15 minutes per patient ahead in line
    res.json({ patient, waitTime });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
