import React, { useState, useEffect } from 'react';
import movieService from '../services/movieService';
import watchlistService from '../services/watchlistService';
import Search from '../components/Search';
import AdvancedSearch from '../components/AdvancedSearch';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('Popular Movies');

    const fetchPopular = async () => {
        setLoading(true);
        setTitle('Popular Movies');
        setError('');
        setMessage('');
        try {
            const response = await movieService.getPopular();
            setMovies(response.data.results);
        } catch (err) {
            setError('Failed to fetch popular movies.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPopular();
    }, []);

    const handleSearch = async (query) => {
        setLoading(true);
        setTitle(`Search Results for: "${query}"`);
        setError('');
        setMessage('');
        try {
            const response = await movieService.searchMovies(query);
            setMovies(response.data.results);
            if (response.data.results.length === 0) {
                setMessage('No movies found for your search.');
            }
        } catch (err) {
            setError('Failed to search for movies.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdvancedSearch = async (filters) => {
        setLoading(true);
        setTitle('Discover Results');
        setError('');
        setMessage('');
        try {
            const response = await movieService.discoverMovies(filters);
            setMovies(response.data.results);
            if (response.data.results.length === 0) {
                setMessage('No movies found for your criteria.');
            }
        } catch (err) {
            setError('Failed to discover movies.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToWatchlist = async (itemData) => {
        try {
            await watchlistService.addToWatchlist(itemData);
            alert(`'${itemData.title}' added to your watchlist!`);
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Failed to add item.';
            alert(`Error: ${errorMsg}`);
        }
    };

    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-6 border border-indigo-500/30 backdrop-blur">
                    <Search onSearch={handleSearch} />
                </div>
                
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur">
                    <AdvancedSearch onAdvancedSearch={handleAdvancedSearch} />
                </div>
            </div>

            <div className="flex justify-center">
                <button onClick={fetchPopular} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    🎬 Show Popular Movies
                </button>
            </div>

            <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">{title}</h1>
                <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>

            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            )}
            {error && <div className="text-center py-12 text-red-400 bg-red-500/10 rounded-lg p-4">❌ {error}</div>}
            {message && <div className="text-center py-12 text-indigo-300 bg-indigo-500/10 rounded-lg p-4">ℹ️ {message}</div>}

            {!loading && !error && movies.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} onAddToWatchlist={handleAddToWatchlist} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
