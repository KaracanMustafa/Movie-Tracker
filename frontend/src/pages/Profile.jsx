import React, { useState, useEffect, useContext } from 'react';
import userService from '../services/userService';
import AuthContext from '../context/AuthContext';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const { updateContextUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await userService.getProfile();
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                });
            } catch (error) {
                setMessage('Failed to fetch profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const { name, email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await userService.updateProfile({ name, email });
            updateContextUser(response.data);
            setMessage('Profile updated successfully!');
        } catch (error) {
            const errorMsg =
                (error.response && error.response.data && error.response.data.msg) ||
                'Failed to update profile.';
            setMessage(errorMsg);
        }
    };

    if (loading) {
        return <div className="text-center mt-8 text-indigo-300">⏳ Loading profile...</div>;
    }

    return (
        <div className="w-full max-w-lg mx-auto mt-8">
            <div className="mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-2">👤 User Profile</h2>
                <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
            {message && (
                <div className={`p-4 mb-4 text-sm text-center rounded-lg border ${message.includes('successfully') ? 'bg-green-500/20 text-green-300 border-green-500/50' : 'bg-red-500/20 text-red-300 border-red-500/50'}`} role="alert">
                    {message.includes('successfully') ? '✅' : '❌'} {message}
                </div>
            )}
            <form className="space-y-5 bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-2xl rounded-2xl border border-indigo-500/20" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-indigo-300 mb-2">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        value={name}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-indigo-300 mb-2">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
