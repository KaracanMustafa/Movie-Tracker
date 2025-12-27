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
        return <div className="text-center mt-8">Loading watchlist...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
                {watchlist.length === 0 ? (
                    <p>Your watchlist is empty. Add some movies!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {watchlist.map(item => (
                            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title}
                                    className="w-full h-auto"
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="font-bold text-lg flex-grow">{item.title}</h3>
                                    <p className="text-sm text-gray-600 mt-2">Status: {item.status}</p>
                                    <p className="text-sm text-gray-600">Score: {item.score}/10</p>
                                    <div className="mt-4 flex justify-between space-x-2">
                                        <button
                                            onClick={() => handleUpdateClick(item)}
                                            className="w-1/2 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="w-1/2 px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
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
