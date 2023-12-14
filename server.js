const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define a Mongoose Schema
const patientSchema = new mongoose.Schema({
  name: String,
  address: String,
  injuryType: String,
  painScale: Number,
  waitTime: String,
  loginCode: String
});

// Create a Mongoose Model
const Patient = mongoose.model('Patient', patientSchema);

const app = express();
app.use(cors()); // Enable All CORS Requests
app.use(bodyParser.json());

// Function to calculate wait time (placeholder)
const calculateWaitTime = async () => {
  // Add logic to calculate wait time
  return 'Estimated wait time';
};

// Function to generate a three-digit code (placeholder)
const generateLoginCode = () => {
  // Generates a random three-digit number
  return Math.floor(100 + Math.random() * 900).toString();
};

// API Endpoint to add a new patient
app.post('/api/patients', async (req, res) => {
  try {
    const waitTime = await calculateWaitTime();
    const loginCode = generateLoginCode();
    const patient = new Patient({ 
      name: req.body.name, 
      address: req.body.address, 
      injuryType: req.body.injuryType, 
      painScale: req.body.painScale,
      waitTime: waitTime,
      loginCode: loginCode
    });
    await patient.save();
    res.send(patient);
  } catch (error) {
    res.status(500).send('Error saving patient: ' + error.message);
  }
});

// API Endpoint to get all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.send(patients);
  } catch (error) {
    res.status(500).send('Error fetching patients: ' + error.message);
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
