// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const patientRoutes = require('./src/api/patients');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/patients', patientRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));