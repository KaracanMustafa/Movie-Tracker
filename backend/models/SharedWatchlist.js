const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    tmdbId: { type: String, required: true },
    title: { type: String, required: true },
    poster_path: { type: String },
    added_by: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    added_date: { type: Date, default: Date.now }
}, { _id: false });

const SharedWatchlistSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
    movies: [MovieSchema],
    created_date: {
        type: Date,
        default: Date.now,
    },
});

// Ensure the owner is also a member
SharedWatchlistSchema.pre('save', function (next) {
    if (this.isNew) {
        if (!this.members.includes(this.owner)) {
            this.members.push(this.owner);
        }
    }
    next();
});

module.exports = SharedWatchlist = mongoose.model('sharedwatchlist', SharedWatchlistSchema);
