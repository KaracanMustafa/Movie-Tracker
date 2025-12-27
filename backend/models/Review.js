const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    username: { // Denormalizing for easier access on the frontend
        type: String,
        required: true,
    },
    tmdbId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// A user can only write one review per movie
ReviewSchema.index({ user: 1, tmdbId: 1 }, { unique: true });

module.exports = Review = mongoose.model('review', ReviewSchema);
