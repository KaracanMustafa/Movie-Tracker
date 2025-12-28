import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { IconLock, IconX } from '../components/Icons';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');
        try {
            await login({ email, password });
            navigate('/');
        } catch (error) {
            const errorMsg =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            setMessage(errorMsg);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-indigo-500/30">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"><IconLock /> Welcome Back</h2>
                    <p className="text-gray-400">Sign in to your account</p>
                </div>
                {message && (
                    <div className="p-4 text-sm text-red-200 bg-red-500/20 border border-red-500/50 rounded-lg" role="alert">
                        <IconX /> {message}
                    </div>
                )}
                <form className="space-y-5" onSubmit={onSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-indigo-300 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            placeholder="you@example.com"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-indigo-300 mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-400 text-sm">
                    Don't have an account? <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
