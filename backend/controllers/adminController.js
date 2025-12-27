const User = require('../models/User');
const Review = require('../models/Review');

// @route   GET api/admin/users
// @desc    Get all users
// @access  Admin
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE api/admin/users/:id
// @desc    Delete a user
// @access  Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        // Optional: Also delete content associated with the user, e.g., reviews
        await Review.deleteMany({ user: req.params.id });
        // Optional: Also delete watchlist items
        // await WatchlistItem.deleteMany({ user: req.params.id });

        await User.findByIdAndDelete(req.params.id);

        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/admin/reviews
// @desc    Get all reviews
// @access  Admin
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE api/admin/reviews/:id
// @desc    Delete a review
// @access  Admin
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }
        await Review.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Review removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
