import React, { useEffect, useState } from 'react';
import sharedWatchlistService from '../services/sharedWatchlistService';
import { IconX, IconFilm } from './Icons';

const AddToSharedListModal = ({ movie, onClose, onAdded }) => {
    const [lists, setLists] = useState([]);
    const [selected, setSelected] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await sharedWatchlistService.getMySharedWatchlists();
                setLists(res.data);
                if (res.data && res.data.length > 0) setSelected(res.data[0]._id);
            } catch (err) {
                console.error('Failed to load shared lists', err);
                setError('Failed to load your shared lists.');
            }
        };
        fetch();
    }, []);

    const handleAdd = async () => {
        if (!selected) return setError('Please select a list');
        setError('');
        setLoading(true);
        try {
            const payload = {
                tmdbId: String(movie.id),
                title: movie.title,
                poster_path: movie.poster_path || ''
            };
            const res = await sharedWatchlistService.addMovieToList(selected, payload);
            setLoading(false);
            if (onAdded) onAdded(res.data);
            onClose();
        } catch (err) {
            console.error('Failed to add movie to list', err);
            const msg = err?.response?.data?.msg || err.message || 'Failed to add movie.';
            setError(msg);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
            <div className="relative w-full max-w-lg mx-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-indigo-500/20 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-indigo-200 flex items-center"><IconFilm /> Add to Shared List</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><IconX /></button>
                </div>

                {error && <div className="text-sm text-red-400 mb-3">{error}</div>}

                <div className="space-y-3">
                    {lists.length === 0 ? (
                        <div className="text-gray-400">You have no shared lists. Create one first.</div>
                    ) : (
                        <select value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                            {lists.map(l => (
                                <option key={l._id} value={l._id}>{l.name}</option>
                            ))}
                        </select>
                    )}

                    <div className="flex justify-end gap-3">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-700 rounded-lg text-white">Cancel</button>
                        <button onClick={handleAdd} disabled={loading || lists.length===0} className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-semibold">
                            {loading ? 'Adding…' : 'Add Movie'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddToSharedListModal;
