const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WatchlistItemSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    tmdbId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    poster_path: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Plan to Watch', 'Watching', 'Completed', 'On-Hold', 'Dropped'],
        default: 'Plan to Watch',
    },
    score: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    added_date: {
        type: Date,
        default: Date.now,
    },
});

// Prevent a user from adding the same movie twice
WatchlistItemSchema.index({ user: 1, tmdbId: 1 }, { unique: true });

module.exports = WatchlistItem = mongoose.model('watchlistitem', WatchlistItemSchema);
