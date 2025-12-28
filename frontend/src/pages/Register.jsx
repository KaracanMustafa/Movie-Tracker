import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconCheck, IconX } from '../components/Icons';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');
        try {
            await register({ name, email, password });
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
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
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Join Us</h2>
                    <p className="text-gray-400">Create your account</p>
                </div>
                {message && (
                    <div className={`p-4 text-sm rounded-lg border ${message.includes('successful') ? 'text-green-200 bg-green-500/20 border-green-500/50' : 'text-red-200 bg-red-500/20 border-red-500/50'}`} role="alert">
                        {message.includes('successful') ? <><IconCheck />{message}</> : <><IconX />{message}</>}
                    </div>
                )}
                <form className="space-y-5" onSubmit={onSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-indigo-300 mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            placeholder="John Doe"
                            value={name}
                            onChange={onChange}
                        />
                    </div>
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
                            autoComplete="new-password"
                            required
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            placeholder="••••••••"
                            minLength="6"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-400 text-sm">
                    Already have an account? <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
