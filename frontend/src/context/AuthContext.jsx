import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAuth = JSON.parse(localStorage.getItem('user'));
        if (storedAuth) {
            setUser(storedAuth.user);
        }
        setLoading(false);
    }, []);

    const login = async (userData) => {
        const response = await authService.login(userData);
        if (response.token) {
            setUser(response.user);
        }
        return response;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const register = (userData) => {
        return authService.register(userData);
    };
    
    const updateContextUser = (newUserData) => {
        setUser(newUserData);
        const storedAuth = JSON.parse(localStorage.getItem('user'));
        if (storedAuth) {
            storedAuth.user = newUserData;
            localStorage.setItem('user', JSON.stringify(storedAuth));
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register, updateContextUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
