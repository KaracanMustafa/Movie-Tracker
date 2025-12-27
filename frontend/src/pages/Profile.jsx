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
        return <div className="text-center mt-8">Loading profile...</div>;
    }

    return (
        <div className="w-full max-w-lg mx-auto mt-8">
            <h2 className="text-3xl font-bold text-center mb-6">User Profile</h2>
            {message && (
                <div className="p-4 mb-4 text-sm text-center bg-green-100 text-green-700 rounded-lg" role="alert">
                    {message}
                </div>
            )}
            <form className="space-y-6 bg-white p-8 shadow-md rounded-lg" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={name}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
