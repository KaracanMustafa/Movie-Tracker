import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

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

// Get all users
const getUsers = () => {
    return api.get('/users');
};

// Delete a user
const deleteUser = (id) => {
    return api.delete(`/users/${id}`);
};

// Get all reviews
const getAllReviews = () => {
    return api.get('/reviews');
};

// Delete a review
const deleteReview = (id) => {
    return api.delete(`/reviews/${id}`);
};


const adminService = {
    getUsers,
    deleteUser,
    getAllReviews,
    deleteReview,
};

export default adminService;
