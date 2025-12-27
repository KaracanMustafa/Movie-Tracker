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

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Shared Watchlists</h1>

            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Create a New Shared List</h2>
                <form onSubmit={handleCreateList}>
                    <input
                        type="text"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        placeholder="New list name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                    <button type="submit" className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md">
                        Create List
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">My Lists</h2>
                {lists.length === 0 ? (
                    <p>You are not a member of any shared watchlists.</p>
                ) : (
                    <div className="space-y-4">
                        {lists.map(list => (
                            <div key={list._id} className="p-4 bg-white rounded-lg shadow">
                                <h3 className="text-xl font-bold">{list.name}</h3>
                                <p className="text-sm text-gray-500">Owner: {list.owner.name}</p>
                                <p className="text-sm">Members: {list.members.length}</p>
                                <p className="text-sm">Movies: {list.movies.length}</p>
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
