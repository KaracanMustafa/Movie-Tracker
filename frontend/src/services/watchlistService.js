import axios from 'axios';

const envApi = import.meta.env.VITE_API_URL;
const API_BASE = envApi !== undefined ? envApi : 'https://yu-movie-backend.onrender.com';
const API_URL = `${API_BASE}/api/watchlist/`;

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

// Get user's watchlist
const getWatchlist = () => {
    return api.get('/');
};

// Add item to watchlist
const addToWatchlist = (itemData) => {
    return api.post('/', itemData);
};

// Update item in watchlist
const updateWatchlistItem = (id, itemData) => {
    return api.put(`/${id}`, itemData);
};

// Delete item from watchlist
const deleteWatchlistItem = (id) => {
    return api.delete(`/${id}`);
};

const watchlistService = {
    getWatchlist,
    addToWatchlist,
    updateWatchlistItem,
    deleteWatchlistItem,
};

export default watchlistService;
