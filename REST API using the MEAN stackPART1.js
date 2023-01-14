// server.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true });
const db = mongoose.connection;

// Handle connection error
db.on('error', console.error.bind(console, 'connection error:'));

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Import routes
const playersRoutes = require('./routes/players');

// Use routes
app.use('/players', playersRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
