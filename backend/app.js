require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
const allowedMethods = 'GET,POST,PUT,DELETE,OPTIONS';
const allowedHeaders = 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token';

// Simplify: allow any origin (no credentials) to avoid preview-domain mismatch
app.use(cors({ origin: true, methods: allowedMethods, allowedHeaders, credentials: false, optionsSuccessStatus: 204 }));

// Ensure preflight has headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', allowedMethods);
  res.header('Access-Control-Allow-Headers', allowedHeaders);
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

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
