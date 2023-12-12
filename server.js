const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/patientDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Create a Mongoose Schema for Patients
const patientSchema = new mongoose.Schema({
  name: String,
  address: String,
  injuryType: String,
  painScale: Number,
  waitTime: String,
  loginCode: String // New field for the three-digit code
});

// Create a Mongoose Model
const Patient = mongoose.model('Patient', patientSchema);

const app = express();
app.use(bodyParser.json());

// Function to calculate wait time (placeholder)
const calculateWaitTime = async () => {
  // Implement your logic here
  return 'Estimated wait time';
};

// Function to generate a three-digit code (placeholder)
const generateLoginCode = () => {
  return Math.floor(100 + Math.random() * 900).toString(); // Generates a random three-digit number
};

// API Endpoints
// Endpoint to add a new patient
app.post('/api/patients', async (req, res) => {
  const waitTime = await calculateWaitTime();
  const loginCode = generateLoginCode(); // Generate a login code for the patient
  const patient = new Patient({ 
    name: req.body.name, 
    address: req.body.address, 
    injuryType: req.body.injuryType, 
    painScale: req.body.painScale,
    waitTime: waitTime,
    loginCode: loginCode // Assign the generated code
  });
  await patient.save();
  res.send(patient);
});


// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
