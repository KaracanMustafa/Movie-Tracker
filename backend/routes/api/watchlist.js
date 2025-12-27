const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
    getWatchlistItems,
    addWatchlistItem,
    updateWatchlistItem,
    deleteWatchlistItem
} = require('../../controllers/watchlistController');

// @route   GET api/watchlist
// @desc    Get all watchlist items for a user
// @access  Private
router.get('/', auth, getWatchlistItems);

// @route   POST api/watchlist
// @desc    Add a movie to the watchlist
// @access  Private
router.post('/', auth, addWatchlistItem);

// @route   PUT api/watchlist/:id
// @desc    Update a watchlist item
// @access  Private
router.put('/:id', auth, updateWatchlistItem);

// @route   DELETE api/watchlist/:id
// @desc    Delete a watchlist item
// @access  Private
router.delete('/:id', auth, deleteWatchlistItem);

module.exports = router;
