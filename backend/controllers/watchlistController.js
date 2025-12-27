const WatchlistItem = require('../models/WatchlistItem');

// @route   GET api/watchlist
// @desc    Get all watchlist items for a user
// @access  Private
exports.getWatchlistItems = async (req, res) => {
    try {
        const items = await WatchlistItem.find({ user: req.user.id }).sort({ added_date: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST api/watchlist
// @desc    Add a movie to the watchlist
// @access  Private
exports.addWatchlistItem = async (req, res) => {
    const { tmdbId, title, poster_path, status, score } = req.body;

    try {
        // Check if the item already exists for this user
        let item = await WatchlistItem.findOne({ user: req.user.id, tmdbId });
        if (item) {
            return res.status(400).json({ msg: 'Item already in watchlist' });
        }

        const newItem = new WatchlistItem({
            user: req.user.id,
            tmdbId,
            title,
            poster_path,
            status,
            score
        });

        item = await newItem.save();
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT api/watchlist/:id
// @desc    Update a watchlist item
// @access  Private
exports.updateWatchlistItem = async (req, res) => {
    const { status, score } = req.body;

    // Build item object
    const itemFields = {};
    if (status) itemFields.status = status;
    if (score !== undefined) itemFields.score = score;


    try {
        let item = await WatchlistItem.findById(req.params.id);

        if (!item) return res.status(404).json({ msg: 'Item not found' });

        // Make sure user owns the item
        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        item = await WatchlistItem.findByIdAndUpdate(
            req.params.id,
            { $set: itemFields },
            { new: true }
        );

        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE api/watchlist/:id
// @desc    Delete a watchlist item
// @access  Private
exports.deleteWatchlistItem = async (req, res) => {
    try {
        let item = await WatchlistItem.findById(req.params.id);

        if (!item) return res.status(404).json({ msg: 'Item not found' });

        // Make sure user owns the item
        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await WatchlistItem.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
