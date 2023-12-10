// server.js

// Import the necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create an Express application
const app = express();

// Use the body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Read the active item from the database
let activeItem = JSON.parse(fs.readFileSync('db.json')).activeItem;

// Handle GET requests to the /active-item endpoint
app.get('/active-item', (req, res) => {
  // Send the active item as the response
  res.json({ activeItem });
});

// Handle POST requests to the /active-item endpoint
app.post('/active-item', (req, res) => {
  // Update the active item with the one from the request body
  activeItem = req.body.activeItem;

  // Write the active item to the database
  fs.writeFileSync('db.json', JSON.stringify({ activeItem }));

  // Send a success response
  res.json({ success: true });
});

// Start the server on port 3001
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});