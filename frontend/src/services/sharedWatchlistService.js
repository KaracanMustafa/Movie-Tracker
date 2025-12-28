import axios from 'axios';

const envApi = import.meta.env.VITE_API_URL;
const API_BASE = envApi !== undefined ? envApi : 'https://yu-movie-backend.onrender.com';
const API_URL = `${API_BASE}/api/shared-watchlists`;

// Create a new axios instance to handle auth headers
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in requests
api.interceptors.request.use(
    config => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['x-auth-token'] = user.token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Get user's shared watchlists
const getMySharedWatchlists = () => {
    return api.get('/');
};

// Create a new shared watchlist
const createSharedWatchlist = (name) => {
    return api.post('/', { name });
};

// Add a movie to a shared watchlist (listId)
const addMovieToList = (listId, movie) => {
    // movie should include: { tmdbId, title, poster_path }
    return api.post(`/${listId}/movies`, movie);
};

// Get shared watchlist by id
const getSharedWatchlistById = (id) => {
    return api.get(`/${id}`);
};

// Add member to shared list (owner only)
const addMember = (id, payload) => {
    return api.post(`/${id}/members`, payload);
};

// --- Other functions to be added later ---

const sharedWatchlistService = {
    getMySharedWatchlists,
    createSharedWatchlist,
    addMovieToList,
    getSharedWatchlistById,
    addMember,
};

export default sharedWatchlistService;
