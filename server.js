const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const rsvpRoutes = require('./routes/rsvpRoutes');
const cors = require('cors'); // Import cors

dotenv.config();

const app = express();

// CORS Setup: Update the origin to match your React app's URL
const corsOptions = {
  origin: 'http://localhost:5173', // Change this to the correct URL of your frontend
  methods: ['GET', 'POST'],       // Allow GET and POST methods
  allowedHeaders: ['Content-Type'], // Allow Content-Type header
};

app.use(cors(corsOptions)); // Apply CORS middleware with the specified options

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

// MongoDB Connection
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/rsvp', rsvpRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
