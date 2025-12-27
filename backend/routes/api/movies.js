const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
    getPopularMovies,
    searchMovies,
    getGenres,
    discoverMovies,
    getMovieDetails
} = require('../../controllers/movieController');

// @route   GET api/movies/popular
// @desc    Get popular movies from TMDB
// @access  Private
router.get('/popular', auth, getPopularMovies);

// @route   GET api/movies/search
// @desc    Search for movies on TMDB
// @access  Private
router.get('/search', auth, searchMovies);

// @route   GET api/movies/genres
// @desc    Get movie genres from TMDB
// @access  Private
router.get('/genres', auth, getGenres);

// @route   GET api/movies/discover
// @desc    Discover movies by filters
// @access  Private
router.get('/discover', auth, discoverMovies);

// @route   GET api/movies/:id
// @desc    Get details for a single movie from TMDB
// @access  Private
router.get('/:id', auth, getMovieDetails);


module.exports = router;
