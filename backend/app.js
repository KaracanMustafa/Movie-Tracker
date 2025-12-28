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

// Health endpoint: report env presence and DB status (no secrets)
app.get('/api/health', (req, res) => {
  const hasMongo = !!process.env.MONGO_URI;
  const hasJwt = !!process.env.JWT_SECRET;
  const hasTmdb = !!process.env.TMDB_API_KEY;
  const dbState = mongoose.connection.readyState; // 1 connected, 0 disconnected
  res.json({
    ok: true,
    env: {
      MONGO_URI: hasMongo,
      JWT_SECRET: hasJwt,
      TMDB_API_KEY: hasTmdb,
    },
    db: {
      connected: dbState === 1,
      state: dbState,
    },
    ts: new Date().toISOString(),
  });
});

// Alias health without /api prefix (e.g., for quick checks)
app.get('/health', (req, res) => {
  const hasMongo = !!process.env.MONGO_URI;
  const hasJwt = !!process.env.JWT_SECRET;
  const hasTmdb = !!process.env.TMDB_API_KEY;
  const dbState = mongoose.connection.readyState;
  res.json({
    ok: true,
    env: { MONGO_URI: hasMongo, JWT_SECRET: hasJwt, TMDB_API_KEY: hasTmdb },
    db: { connected: dbState === 1, state: dbState },
    ts: new Date().toISOString(),
  });
});

module.exports = app;
