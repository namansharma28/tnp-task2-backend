const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const rsvpRoutes = require('./routes/rsvpRoutes');
const cors = require('cors'); // Import cors

dotenv.config();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://tnp-task2-rsvp.vercel.app"
];
// CORS Setup: Update the origin to match your React app's URL
const corsOptions = {
  origin: allowedOrigins, // Change this to the correct URL of your frontend
  methods: ['GET', 'POST'],       // Allow GET and POST methods
  allowedHeaders: ['Content-Type'], // Allow Content-Type header
};

app.use(cors(   )); // Apply CORS middleware with the specified options

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


mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully!');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});