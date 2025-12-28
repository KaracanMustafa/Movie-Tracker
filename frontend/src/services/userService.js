import axios from 'axios';

const envApi = import.meta.env.VITE_API_URL;
const API_BASE = envApi !== undefined ? envApi : 'http://localhost:5000';
const API_URL = `${API_BASE}/api/users`;

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

// Get current user's profile
const getProfile = () => {
    return api.get('/me');
};

// Update user profile
const updateProfile = (profileData) => {
    return api.put('/me', profileData);
};

const userService = {
    getProfile,
    updateProfile,
};

export default userService;
