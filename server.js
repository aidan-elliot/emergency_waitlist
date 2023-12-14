const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true });

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
app.use(bodyParser.json());

// Function to calculate wait time (placeholder)
const calculateWaitTime = async () => {
  return 'Estimated wait time';
};

// Function to generate a three-digit code (placeholder)
const generateLoginCode = () => {
  return Math.floor(100 + Math.random() * 900).toString();
};

// API Endpoints
// Endpoint to add a new patient
app.post('/api/patients', async (req, res) => {
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
});

app.get('/api/patients', async (req, res) => {
  const patients = await Patient.find();
  res.send(patients);
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});