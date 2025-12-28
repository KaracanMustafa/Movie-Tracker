import React, { useState, useEffect } from 'react';
import watchlistService from '../services/watchlistService';
import UpdateWatchlistModal from '../components/UpdateWatchlistModal';

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await watchlistService.getWatchlist();
                setWatchlist(response.data);
            } catch (err) {
                setError('Failed to fetch watchlist.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWatchlist();
    }, []);

    const handleDelete = async (id) => {
        try {
            await watchlistService.deleteWatchlistItem(id);
            setWatchlist(watchlist.filter(item => item._id !== id));
        } catch (err) {
            console.error('Failed to delete item', err);
            setError('Failed to delete item. Please try again.');
        }
    };

    const handleUpdateClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handleItemUpdate = (updatedItem) => {
        setWatchlist(watchlist.map(item => (item._id === updatedItem._id ? updatedItem : item)));
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="rounded-xl overflow-hidden">
                        <div className="skeleton skeleton-img mb-4"></div>
                        <div className="skeleton skeleton-line mb-2"></div>
                        <div className="skeleton skeleton-subline"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-8 text-red-400 bg-red-500/20 border border-red-500/50 rounded-lg p-4">❌ {error}</div>;
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8 space-y-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">🎬 My Watchlist</h1>
                    <div className="h-1 w-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                </div>
                {watchlist.length === 0 ? (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-2xl border border-indigo-500/20 text-center">
                        <p className="text-gray-400 text-lg">📽️ Your watchlist is empty. Add some movies!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {watchlist.map(item => (
                            <div key={item._id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-indigo-500/20">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title}
                                    className="w-full h-72 object-cover"
                                />
                                <div className="p-4 flex flex-col flex-grow space-y-3">
                                    <h3 className="font-bold text-base text-white line-clamp-2">{item.title}</h3>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-indigo-300">📌 Status: <span className="text-gray-300">{item.status}</span></p>
                                        <p className="text-purple-300">⭐ Score: <span className="text-gray-300">{item.score}/10</span></p>
                                    </div>
                                    <div className="mt-4 flex justify-between gap-2">
                                        <button
                                            onClick={() => handleUpdateClick(item)}
                                            className="flex-1 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-300"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="flex-1 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isModalOpen && (
                <UpdateWatchlistModal
                    item={selectedItem}
                    onClose={handleModalClose}
                    onUpdate={handleItemUpdate}
                />
            )}
        </>
    );
};

export default Watchlist;
