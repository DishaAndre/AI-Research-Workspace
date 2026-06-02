const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize configuration loader matrix
dotenv.config();

const app = express();

// Global Request Optimization Middlewares
app.use(cors());
app.use(express.json());

// Establish Database Handshake Vectors with MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✓ MongoDB Connected Safely.'))
  .catch((err) => console.error('✗ MongoDB Connection Failure:', err));

// Core Microservice Root Entry Node Checkpoint
app.get('/', (req, res) => {
  res.json({ message: "AI Research Workspace Server API Active." });
});

// App Router Registry Matrix
app.use('/api/auth', require('./routes/auth'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/ai', require('./routes/ai'));

// Open Active Network Port Channels
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✓ Backend Express Listening on Port ${PORT}`));