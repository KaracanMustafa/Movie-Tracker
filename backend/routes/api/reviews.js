const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
    getReviews,
    createReview
} = require('../../controllers/reviewController');

// @route   GET api/reviews/:tmdbId
// @desc    Get all reviews for a movie
// @access  Public
router.get('/:tmdbId', getReviews);

// @route   POST api/reviews/:tmdbId
// @desc    Create a review for a movie
// @access  Private
router.post('/:tmdbId', auth, createReview);

module.exports = router;
