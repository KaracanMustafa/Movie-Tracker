const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
    createSharedWatchlist,
    getMySharedWatchlists,
    getSharedWatchlistById,
    addMember,
    addMovieToList,
    deleteSharedWatchlist
} = require('../../controllers/sharedWatchlistController');

// All routes here are private
router.use(auth);

router.route('/')
    .post(createSharedWatchlist)
    .get(getMySharedWatchlists);

router.route('/:id')
    .get(getSharedWatchlistById)
    .delete(deleteSharedWatchlist);

router.route('/:id/members')
    .post(addMember);

router.route('/:id/movies')
    .post(addMovieToList);

module.exports = router;
