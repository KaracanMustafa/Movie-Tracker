const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = 'https://api.themoviedb.org/3';

// @route   GET api/movies/popular
// @desc    Get popular movies from TMDB
// @access  Private
exports.getPopularMovies = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const response = await axios.get(`${TMDB_API_URL}/movie/popular`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
                page: page,
            },
        });
        res.json(response.data);
    } catch (err) {
        console.error('Error fetching popular movies:', err.response ? err.response.data : err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/movies/search
// @desc    Search for movies on TMDB
// @access  Private
exports.searchMovies = async (req, res) => {
    const { query, page } = req.query;
    if (!query) {
        return res.status(400).json({ msg: 'Search query is required' });
    }

    try {
        const pageNum = parseInt(page) || 1;
        const response = await axios.get(`${TMDB_API_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
                query: query,
                page: pageNum,
            },
        });
        res.json(response.data);
    } catch (err) {
        console.error('Error searching movies:', err.response ? err.response.data : err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/movies/genres
// @desc    Get movie genres from TMDB
// @access  Private
exports.getGenres = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_API_URL}/genre/movie/list`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
            },
        });
        res.json(response.data.genres);
    } catch (err) {
        console.error('Error fetching genres:', err.response ? err.response.data : err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/movies/discover
// @desc    Discover movies by filters (genre, year, rating)
// @access  Private
exports.discoverMovies = async (req, res) => {
    const { genre, year, rating, page } = req.query;

    const params = {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        sort_by: 'popularity.desc',
        include_adult: false,
        page: parseInt(page) || 1,
    };

    if (genre) params.with_genres = genre;
    if (year) params.primary_release_year = year;
    if (rating) params['vote_average.gte'] = rating;

    try {
        const response = await axios.get(`${TMDB_API_URL}/discover/movie`, { params });
        res.json(response.data);
    } catch (err) {
        console.error('Error discovering movies:', err.response ? err.response.data : err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/movies/:id
// @desc    Get details for a single movie from TMDB (including videos and providers)
// @access  Private
exports.getMovieDetails = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_API_URL}/movie/${req.params.id}`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
                append_to_response: 'videos,watch/providers'
            },
        });
        res.json(response.data);
    } catch (err) {
        console.error('Error fetching movie details:', err.response ? err.response.data : err.message);
        res.status(500).send('Server Error');
    }
};
