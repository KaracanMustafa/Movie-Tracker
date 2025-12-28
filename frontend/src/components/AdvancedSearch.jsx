import React, { useState, useEffect } from 'react';
import { IconStar } from './Icons';
import movieService from '../services/movieService';

const AdvancedSearch = ({ onAdvancedSearch }) => {
    const [genres, setGenres] = useState([]);
    const [filters, setFilters] = useState({
        genre: '',
        year: '',
        rating: '',
    });

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await movieService.getGenres();
                setGenres(response.data);
            } catch (error) {
                console.error("Failed to fetch genres", error);
            }
        };
        fetchGenres();
    }, []);

    const onChange = e => setFilters({ ...filters, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        onAdvancedSearch(filters);
    };
    
    // Generate year options
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    return (
        <div className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 backdrop-blur">
             <h3 className="text-2xl font-bold mb-6 text-white">Discover Movies</h3>
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="genre" className="block text-sm font-semibold text-indigo-300 mb-2">Genre</label>
                    <select name="genre" id="genre" value={filters.genre} onChange={onChange} className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                        <option value="">All Genres</option>
                        {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="year" className="block text-sm font-semibold text-indigo-300 mb-2">Year</label>
                    <select name="year" id="year" value={filters.year} onChange={onChange} className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all">
                        <option value="">Any Year</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="rating" className="block text-sm font-semibold text-indigo-300 mb-2"><IconStar />Min. Rating</label>
                    <input
                        type="number"
                        name="rating"
                        id="rating"
                        min="0"
                        max="10"
                        step="0.5"
                        value={filters.rating}
                        onChange={onChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        placeholder="e.g., 7.5"
                    />
                </div>
                <div className="flex items-end">
                     <button
                        type="submit"
                        className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Discover
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdvancedSearch;
