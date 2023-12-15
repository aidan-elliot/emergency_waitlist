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
  createdAt: { type: Date, default: Date.now },
  priorityScore: Number,
});

const Patient = mongoose.model('Patient', PatientSchema);

/**
 * Represents a mapping of injury names to their severity scores.
 * @type {Object.<string, number>}
 */
const injurySeverityScores = {
  "Fracture": 5,
  "Laceration": 3,
  "Burn": 4,
  "Head Injury": 6,
  "Sprain": 2,
  "Dislocation": 4,
  "Concussion": 5,
  "Heart Attack": 9,
  "Stroke": 9,
  "Severe Bleeding": 7,
  "Poisoning": 6,
  "Allergic Reaction": 5,
  "Asthma Attack": 5,
  "Seizure": 6,
  "Hypothermia": 5,
  "Heat Stroke": 6,
  "Dehydration": 4,
  "Diabetic Emergency": 6,
  "Pneumonia": 5,
  "Appendicitis": 6,
  "Hypertensive Crisis": 7,
  "Anaphylaxis": 8,
  "Sepsis": 8,
  "Kidney Stones": 4,
  "Gallstones": 4,
  "Chest Pain (Unspecified)": 7,
  "Abdominal Pain (Unspecified)": 5,
  "Traumatic Injury": 6,
  "Electrocution": 7,
  "Drowning/Near Drowning": 7,
  "Animal Bite": 4,
  "Foreign Body Obstruction": 6,
  "Pregnancy Complications": 7,
  "Major Head Trauma": 8,
  "Spinal Injury": 7,
  "Respiratory Distress": 7,
  "Psychiatric Emergency": 5
};


const calculatePriorityScore = (patient) => {
  const now = new Date();
  const timeAdmitted = new Date(patient.createdAt);
  const waitTimeInMinutes = (now - timeAdmitted) / 60000;
  const injuryScore = injurySeverityScores[patient.injury] || 0;
  const painScore = patient.painScale || 0;
  const waitTimeScore = Math.floor(waitTimeInMinutes / 15);
  return injuryScore + painScore + waitTimeScore;
};



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
    // Create a new patient with request data and set createdAt to current time
    const newPatientData = {
      ...req.body,
      createdAt: new Date(),
    };

    // Create a new Patient instance
    const newPatient = new Patient(newPatientData);

    // Calculate the priority score for the new patient
    newPatient.priorityScore = calculatePriorityScore(newPatient);

    // Save the new patient with priorityScore and createdAt
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

// GET: Retrieve all patients
app.get('/api/patients', async (req, res) => {
  try {
    let patients = await Patient.find();
    patients = patients.map(patient => ({
      ...patient.toObject(),
      priorityScore: calculatePriorityScore(patient)
    }));
    patients.sort((a, b) => b.priorityScore - a.priorityScore);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
