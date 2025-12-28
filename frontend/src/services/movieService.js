import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/movies`;

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

// Get popular movies
const getPopular = (page = 1) => {
    return api.get(`/popular?page=${page}`);
};

// Search for movies
const searchMovies = (query, page = 1) => {
    return api.get(`/search?query=${query}&page=${page}`);
};

// Get movie genres
const getGenres = () => {
    return api.get('/genres');
};

// Discover movies with filters
const discoverMovies = (filters) => {
    const params = new URLSearchParams(filters);
    return api.get(`/discover?${params.toString()}`);
};

// Get details for a single movie
const getMovieDetails = (id) => {
    return api.get(`/${id}`);
};


const movieService = {
    getPopular,
    searchMovies,
    getGenres,
    discoverMovies,
    getMovieDetails,
};

export default movieService;
