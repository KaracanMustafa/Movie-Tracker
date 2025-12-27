const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const {
    getUsers,
    deleteUser,
    getAllReviews,
    deleteReview
} = require('../../controllers/adminController');

// All routes in this file are protected by auth and admin middleware
router.use(auth, admin);

// @route   GET api/admin/users
// @desc    Get all users
// @access  Admin
router.get('/users', getUsers);

// @route   DELETE api/admin/users/:id
// @desc    Delete a user
// @access  Admin
router.delete('/users/:id', deleteUser);

// @route   GET api/admin/reviews
// @desc    Get all reviews
// @access  Admin
router.get('/reviews', getAllReviews);

// @route   DELETE api/admin/reviews/:id
// @desc    Delete a review
// @access  Admin
router.delete('/reviews/:id', deleteReview);

module.exports = router;
