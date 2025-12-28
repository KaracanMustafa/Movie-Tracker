import axios from 'axios';

const envApi = import.meta.env.VITE_API_URL;
const API_BASE = envApi !== undefined ? envApi : 'https://yu-movie-backend.onrender.com';
const API_URL = `${API_BASE}/api/reviews`;

// Create a new axios instance to handle auth headers for posting
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

// Get all reviews for a movie
const getReviews = (tmdbId) => {
    // This can be a public endpoint, so we can use axios directly
    return axios.get(`${API_URL}/${tmdbId}`);
};

// Create a review
const createReview = (tmdbId, reviewData) => {
    return api.post(`/${tmdbId}`, reviewData);
};

const reviewService = {
    getReviews,
    createReview,
};

export default reviewService;
