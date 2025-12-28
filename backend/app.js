require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token'],
};
app.use(cors(corsOptions));
app.use(express.json());

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB (avoid duplicate connections on serverless by reusing)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(db);
  isConnected = true;
  console.log('MongoDB Connected...');
}

// health route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/watchlist', require('./routes/api/watchlist'));
app.use('/api/movies', require('./routes/api/movies'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/reviews', require('./routes/api/reviews'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/shared-watchlists', require('./routes/api/sharedWatchlists'));

// Ensure DB connects when app is first used
connectDB().catch(err => console.log(err));

module.exports = app;
