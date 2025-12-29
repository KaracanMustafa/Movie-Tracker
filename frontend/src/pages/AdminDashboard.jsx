import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [view, setView] = useState('users'); // 'users' or 'reviews'

    const fetchData = async () => {
        setLoading(true);
        try {
            const usersRes = await adminService.getUsers();
            setUsers(usersRes.data);

            const reviewsRes = await adminService.getAllReviews();
            setReviews(reviewsRes.data);

        } catch (err) {
            setError('Failed to fetch admin data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user? This is irreversible.')) {
            try {
                await adminService.deleteUser(id);
                setUsers(users.filter(u => u._id !== id));
            } catch (err) {
                alert('Failed to delete user.');
            }
        }
    };
    
    const handleDeleteReview = async (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await adminService.deleteReview(id);
                setReviews(reviews.filter(r => r._id !== id));
            } catch (err) {
                alert('Failed to delete review.');
            }
        }
    };

    if (loading) return <div className="text-center mt-8">Loading Admin Dashboard...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-2">Admin Dashboard</h1>
                <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border border-indigo-500/20">
                <div className="border-b border-indigo-700/30">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button onClick={() => setView('users')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${view === 'users' ? 'border-indigo-300 text-indigo-300' : 'border-transparent text-indigo-200/80 hover:text-indigo-100 hover:border-indigo-600/30'}`}>
                            Manage Users
                        </button>
                        <button onClick={() => setView('reviews')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${view === 'reviews' ? 'border-indigo-300 text-indigo-300' : 'border-transparent text-indigo-200/80 hover:text-indigo-100 hover:border-indigo-600/30'}`}>
                            Manage Reviews
                        </button>
                    </nav>
                </div>

                {view === 'users' && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4 text-indigo-200">Users ({users.length})</h2>
                        <div className="overflow-x-auto bg-gray-800 rounded-lg">
                             <table className="min-w-full divide-y divide-indigo-700">
                                <thead className="bg-gray-900">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Email</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-300 uppercase tracking-wider">Role</th>
                                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Delete</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-indigo-700 text-indigo-100">
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {user.role !== 'admin' && (
                                                    <button onClick={() => handleDeleteUser(user._id)} className="text-red-400 hover:text-red-300">Delete</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {view === 'reviews' && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4 text-indigo-200">Reviews ({reviews.length})</h2>
                        {reviews.map(review => (
                            <div key={review._id} className="bg-gray-800 p-4 rounded-lg mb-4 border border-indigo-700/20">
                                <p className="text-indigo-100"><strong className="text-indigo-200">{review.username}</strong> reviewed movie <strong className="text-indigo-200">{review.tmdbId}</strong></p>
                                <p className="text-indigo-100">Rating: {review.rating}/10</p>
                                <p className="mt-2 italic text-indigo-200">"{review.text}"</p>
                                <button onClick={() => handleDeleteReview(review._id)} className="text-red-400 hover:text-red-300 mt-2 text-sm">Delete Review</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
