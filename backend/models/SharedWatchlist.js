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
// Use a synchronous pre-save hook (no `next` callback) and safe ObjectId comparison
SharedWatchlistSchema.pre('save', function () {
    if (this.isNew) {
        const ownerId = this.owner && this.owner.toString ? this.owner.toString() : String(this.owner);
        const hasOwner = (this.members || []).some(m => (m && m.toString ? m.toString() : String(m)) === ownerId);
        if (!hasOwner) {
            this.members = this.members || [];
            this.members.push(this.owner);
        }
    }
});

module.exports = SharedWatchlist = mongoose.model('sharedwatchlist', SharedWatchlistSchema);
