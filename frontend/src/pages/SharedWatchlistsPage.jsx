import React, { useState, useEffect } from 'react';
import sharedWatchlistService from '../services/sharedWatchlistService';

const SharedWatchlistsPage = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listName, setListName] = useState('');

    const fetchLists = async () => {
        try {
            const response = await sharedWatchlistService.getMySharedWatchlists();
            setLists(response.data);
        } catch (error) {
            console.error("Failed to fetch shared watchlists", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    const handleCreateList = async (e) => {
        e.preventDefault();
        if (!listName) return;
        try {
            const response = await sharedWatchlistService.createSharedWatchlist(listName);
            setLists([response.data, ...lists]);
            setListName('');
        } catch (error) {
            console.error("Failed to create list", error);
            alert('Failed to create shared list.');
        }
    };

    if (loading) return (
        <div className="space-y-4 py-8">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700/40">
                    <div className="skeleton skeleton-line w-1/2 mb-2"></div>
                    <div className="skeleton skeleton-subline w-1/3"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">📋 Shared Watchlists</h1>
                <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-indigo-500/20">
                <h2 className="text-2xl font-bold mb-6 text-indigo-300">✨ Create a New Shared List</h2>
                <form onSubmit={handleCreateList} className="space-y-4">
                    <input
                        type="text"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        placeholder="📝 Enter list name..."
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        required
                    />
                    <button 
                        type="submit" 
                        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Create List
                    </button>
                </form>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-indigo-300">📌 My Lists</h2>
                {lists.length === 0 ? (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-indigo-500/20 text-center">
                        <p className="text-gray-400 text-lg">ℹ️ You are not a member of any shared watchlists.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lists.map(list => (
                            <div 
                                key={list._id} 
                                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                            >
                                <h3 className="text-xl font-bold text-white mb-4">{list.name}</h3>
                                <div className="space-y-2 text-sm">
                                    <p className="text-indigo-300">
                                        👤 Owner: <span className="text-gray-300">{list.owner.name}</span>
                                    </p>
                                    <p className="text-purple-300">
                                        👥 Members: <span className="text-gray-300">{list.members.length}</span>
                                    </p>
                                    <p className="text-indigo-300">
                                        🎬 Movies: <span className="text-gray-300">{list.movies.length}</span>
                                    </p>
                                </div>
                                {/* Link to detail page will go here */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SharedWatchlistsPage;
