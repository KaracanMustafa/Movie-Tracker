const Review = require('../models/Review');
const User = require('../models/User');

// @route   GET api/reviews/:tmdbId
// @desc    Get all reviews for a movie
// @access  Public
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ tmdbId: req.params.tmdbId }).sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST api/reviews/:tmdbId
// @desc    Create a review for a movie
// @access  Private
exports.createReview = async (req, res) => {
    const { rating, text } = req.body;
    const { tmdbId } = req.params;
    const { id: userId } = req.user; // from auth middleware

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if user has already reviewed this movie
        let review = await Review.findOne({ user: userId, tmdbId });
        if (review) {
            return res.status(400).json({ msg: 'You have already reviewed this movie' });
        }

        review = new Review({
            user: userId,
            username: user.name,
            tmdbId,
            rating,
            text,
        });

        await review.save();
        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
