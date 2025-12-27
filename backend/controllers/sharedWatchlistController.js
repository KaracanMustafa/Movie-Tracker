const SharedWatchlist = require('../models/SharedWatchlist');
const User = require('../models/User');

// @desc    Create a new shared watchlist
// @route   POST /api/shared-watchlists
// @access  Private
exports.createSharedWatchlist = async (req, res) => {
    const { name } = req.body;
    try {
        const newList = new SharedWatchlist({
            name,
            owner: req.user.id,
        });
        const savedList = await newList.save();
        res.status(201).json(savedList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all shared watchlists for the current user (as owner or member)
// @route   GET /api/shared-watchlists
// @access  Private
exports.getMySharedWatchlists = async (req, res) => {
    try {
        const lists = await SharedWatchlist.find({ members: req.user.id }).populate('owner', 'name').populate('members', 'name');
        res.json(lists);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a single shared watchlist by ID
// @route   GET /api/shared-watchlists/:id
// @access  Private
exports.getSharedWatchlistById = async (req, res) => {
    try {
        const list = await SharedWatchlist.findById(req.params.id).populate('owner', 'name').populate('members', 'name');
        if (!list) {
            return res.status(404).json({ msg: 'Watchlist not found' });
        }
        // Ensure user is a member
        if (!list.members.some(member => member._id.equals(req.user.id))) {
            return res.status(403).json({ msg: 'Access denied' });
        }
        res.json(list);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add a member to a shared watchlist
// @route   POST /api/shared-watchlists/:id/members
// @access  Private (Owner only)
exports.addMember = async (req, res) => {
    const { email } = req.body;
    try {
        const list = await SharedWatchlist.findById(req.params.id);
        if (!list) return res.status(404).json({ msg: 'Watchlist not found' });
        // Ensure user is owner
        if (!list.owner.equals(req.user.id)) return res.status(403).json({ msg: 'Only the owner can add members' });

        const userToAdd = await User.findOne({ email });
        if (!userToAdd) return res.status(404).json({ msg: 'User with that email not found' });

        if (list.members.includes(userToAdd.id)) return res.status(400).json({ msg: 'User is already a member' });

        list.members.push(userToAdd.id);
        await list.save();
        const populatedList = await SharedWatchlist.findById(req.params.id).populate('owner', 'name').populate('members', 'name');
        res.json(populatedList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add a movie to a shared watchlist
// @route   POST /api/shared-watchlists/:id/movies
// @access  Private (Members only)
exports.addMovieToList = async (req, res) => {
    const { tmdbId, title, poster_path } = req.body;
    try {
        const list = await SharedWatchlist.findById(req.params.id);
        if (!list) return res.status(404).json({ msg: 'Watchlist not found' });
        // Ensure user is a member
        if (!list.members.some(memberId => memberId.equals(req.user.id))) return res.status(403).json({ msg: 'Access denied' });

        if (list.movies.some(movie => movie.tmdbId === tmdbId)) return res.status(400).json({ msg: 'Movie is already in this list' });

        const newMovie = {
            tmdbId,
            title,
            poster_path,
            added_by: req.user.id,
        };
        list.movies.push(newMovie);
        await list.save();
        res.status(201).json(list.movies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a shared watchlist
// @route   DELETE /api/shared-watchlists/:id
// @access  Private (Owner only)
exports.deleteSharedWatchlist = async (req, res) => {
    try {
        const list = await SharedWatchlist.findById(req.params.id);
        if (!list) return res.status(404).json({ msg: 'Watchlist not found' });
        // Ensure user is owner
        if (!list.owner.equals(req.user.id)) return res.status(403).json({ msg: 'Only the owner can delete this list' });
        
        await SharedWatchlist.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Watchlist deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
