import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import sharedWatchlistService from '../services/sharedWatchlistService';
import { IconX, IconFilm, IconCheck } from './Icons';

const AddToSharedListModal = ({ movie, onClose, onAdded }) => {
    const [lists, setLists] = useState([]);
    const [selected, setSelected] = useState('');
    const [newListName, setNewListName] = useState('');
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [showCreateInput, setShowCreateInput] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await sharedWatchlistService.getMySharedWatchlists();
                setLists(res.data);
                if (res.data && res.data.length > 0) setSelected(res.data[0]._id);
                else setShowCreateInput(true); // Automatically show create input if no lists exist
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

    const handleCreateAndAdd = async () => {
        if (!newListName.trim()) return setError('Please enter a list name');
        setError('');
        setCreating(true);
        try {
            // 1. Create the new list
            const createRes = await sharedWatchlistService.createSharedWatchlist(newListName);
            const newList = createRes.data;

            // 2. Add the movie to this new list
            const payload = {
                tmdbId: String(movie.id),
                title: movie.title,
                poster_path: movie.poster_path || ''
            };
            await sharedWatchlistService.addMovieToList(newList._id, payload);

            setCreating(false);
            toast.success(`List '${newList.name}' created and movie added!`);
            onClose();
        } catch (err) {
            console.error('Failed to create list and add movie', err);
            const msg = err?.response?.data?.msg || err.message || 'Failed to create list.';
            setError(msg);
            setCreating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-indigo-500/20 p-6">
                
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                        <IconFilm className="text-indigo-400 mr-2" /> 
                        Add to List
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700/50">
                        <IconX />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg mb-4 flex items-center">
                        <IconX className="w-4 h-4 mr-2" /> {error}
                    </div>
                )}

                {/* EXISTING LISTS SELECTION */}
                {!showCreateInput && lists.length > 0 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Select a List</label>
                            <select 
                                value={selected} 
                                onChange={(e) => setSelected(e.target.value)} 
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            >
                                {lists.map(l => (
                                    <option key={l._id} value={l._id}>{l.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                            <button 
                                onClick={() => setShowCreateInput(true)} 
                                className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-xl transition-all"
                            >
                                + New List
                            </button>
                            <button 
                                onClick={handleAdd} 
                                disabled={loading} 
                                className="flex-[2] px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Adding...' : 'Add Movie'}
                            </button>
                        </div>
                    </div>
                )}

                {/* CREATE NEW LIST FORM */}
                {(showCreateInput || lists.length === 0) && (
                    <div className="space-y-4 animate-fadeIn">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Create New List Name</label>
                            <input 
                                type="text" 
                                autoFocus
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                placeholder="e.g. 'Favorites 2024' or 'Horror Night'"
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            {lists.length > 0 && (
                                <button 
                                    onClick={() => setShowCreateInput(false)} 
                                    className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-lg transition-all"
                                >
                                    Cancel
                                </button>
                            )}
                            <button 
                                onClick={handleCreateAndAdd} 
                                disabled={creating || !newListName.trim()} 
                                className="px-6 py-2 text-sm bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {creating ? 'Creating...' : <><IconCheck className="mr-1 w-4 h-4" /> Create & Add</>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddToSharedListModal;