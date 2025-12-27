import React, { useState, useEffect } from 'react';
import watchlistService from '../services/watchlistService';

const UpdateWatchlistModal = ({ item, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        status: 'Plan to Watch',
        score: 0,
    });

    useEffect(() => {
        if (item) {
            setFormData({
                status: item.status,
                score: item.score || 0,
            });
        }
    }, [item]);

    if (!item) return null;

    const { status, score } = formData;
    const statuses = ['Plan to Watch', 'Watching', 'Completed', 'On-Hold', 'Dropped'];

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const updatedItem = await watchlistService.updateWatchlistItem(item._id, { status, score });
            onUpdate(updatedItem.data);
            onClose();
        } catch (error) {
            console.error('Failed to update item', error);
            alert('Failed to update item.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative mx-auto p-6 border w-96 shadow-2xl rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-indigo-500/30">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-bold text-indigo-300">✏️ Update "{item.title}"</h3>
                    <form className="mt-4 px-2 py-3" onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-sm font-semibold text-indigo-300 text-left mb-2">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={status}
                                onChange={onChange}
                                className="w-full py-2 px-3 border border-gray-600 bg-gray-700/50 text-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="score" className="block text-sm font-semibold text-indigo-300 text-left mb-2">
                                Score (0-10) ⭐
                            </label>
                            <input
                                id="score"
                                name="score"
                                type="number"
                                min="0"
                                max="10"
                                value={score}
                                onChange={onChange}
                                className="w-full py-2 px-3 border border-gray-600 bg-gray-700/50 text-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="items-center px-2 py-3 space-y-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-base font-semibold rounded-lg w-full shadow-lg transition-all duration-300"
                            >
                                Update Item
                            </button>
                        </div>
                    </form>
                    <div className="items-center px-2 py-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-base font-medium rounded-lg w-full shadow-sm transition-all duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateWatchlistModal;
