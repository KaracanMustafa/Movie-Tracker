import axios from 'axios';

const envApi = import.meta.env.VITE_API_URL;
const API_BASE = envApi !== undefined ? envApi : 'http://localhost:5000';
const API_URL = `${API_BASE}/api/auth`;

// Register user
const register = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

// Login user
const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;
