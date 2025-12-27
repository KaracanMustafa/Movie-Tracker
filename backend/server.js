require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
