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
  code: { type: String, default: () => Math.random().toString(36).substr(2, 9) },
});

const Patient = mongoose.model('Patient', PatientSchema);

// Add code for handling uncaught exceptions
process.on('uncaughtException', function (err) {
  console.log(err);
});

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
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
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

mongoose.connect('mongodb://localhost:27017/hospitalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose.connect returns a promise
mongoose.connection.on('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB', err);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
