import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import movieService from '../services/movieService';
import watchlistService from '../services/watchlistService';
import AdvancedSearch from '../components/AdvancedSearch';
import MovieCard from '../components/MovieCard';
import { MovieCardSkeleton } from '../components/Skeleton';
import { IconFilm, IconInfo, IconX } from '../components/Icons';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('Popular Movies');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOption, setSortOption] = useState('default');

    const fetchPopular = async (pageNum = 1) => {
        setLoading(true);
        setTitle('Popular Movies');
        setError('');
        setMessage('');
        try {
            const response = await movieService.getPopular(pageNum);
            setMovies(response.data.results);
            setPage(response.data.page || pageNum);
            setTotalPages(response.data.total_pages || 1);
        } catch (err) {
            setError('Failed to fetch popular movies.');
            toast.error('Failed to fetch popular movies.');
        } finally {
            setLoading(false);
        }
    };

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q');
        const p = parseInt(params.get('page')) || 1;
        if (q) {
            handleSearch(q, p);
        } else {
            fetchPopular(p);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const handleSearch = async (query, pageNum = 1) => {
        setLoading(true);
        setTitle(`Search Results for: "${query}"`);
        setError('');
        setMessage('');
        try {
            const response = await movieService.searchMovies(query, pageNum);
            setMovies(response.data.results);
            setPage(response.data.page || pageNum);
            setTotalPages(response.data.total_pages || 1);
            if (response.data.results.length === 0) {
                setMessage('No movies found for your search.');
            }
        } catch (err) {
            setError('Failed to search for movies.');
            toast.error('Failed to search for movies.');
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
            setPage(response.data.page || 1);
            setTotalPages(response.data.total_pages || 1);
            if (response.data.results.length === 0) {
                setMessage('No movies found for your criteria.');
            }
        } catch (err) {
            setError('Failed to discover movies.');
            toast.error('Failed to discover movies.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToWatchlist = async (itemData) => {
        try {
            await watchlistService.addToWatchlist(itemData);
            toast.success(`'${itemData.title}' added to your watchlist!`);
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Failed to add item.';
            toast.error(`Error: ${errorMsg}`);
        }
    };

    const sortedMovies = useMemo(() => {
        if (!movies) return [];
        const arr = [...movies];
        switch (sortOption) {
            case 'title-asc':
                return arr.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''));
            case 'title-desc':
                return arr.sort((a, b) => (b.title || b.name || '').localeCompare(a.title || a.name || ''));
            case 'date-desc':
                return arr.sort((a, b) => new Date(b.release_date || b.first_air_date || 0) - new Date(a.release_date || a.first_air_date || 0));
            case 'date-asc':
                return arr.sort((a, b) => new Date(a.release_date || a.first_air_date || 0) - new Date(b.release_date || b.first_air_date || 0));
            case 'rating-desc':
                return arr.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
            case 'rating-asc':
                return arr.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
            default:
                return arr;
        }
    }, [movies, sortOption]);

    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur">
                    <AdvancedSearch onAdvancedSearch={handleAdvancedSearch} />
                </div>
            </div>

            <div className="flex justify-center">
                <button onClick={fetchPopular} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center">
                    <IconFilm /> Show Popular Movies
                </button>
            </div>

            <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">{title}</h1>
                <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>

                <div className="flex items-center justify-end mt-4">
                    <label className="text-sm text-gray-300 mr-2">Sort:</label>
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="bg-gray-800 text-sm rounded px-2 py-1">
                        <option value="default">Default</option>
                        <option value="title-asc">Title (A–Z)</option>
                        <option value="title-desc">Title (Z–A)</option>
                        <option value="date-desc">Release Date (newest)</option>
                        <option value="date-asc">Release Date (oldest)</option>
                        <option value="rating-desc">Rating (high → low)</option>
                        <option value="rating-asc">Rating (low → high)</option>
                    </select>
                </div>
            </div>

            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            )}
            {error && <div className="text-center py-12 text-red-400 bg-red-500/10 rounded-lg p-4"><IconX />{error}</div>}
            {message && <div className="text-center py-12 text-indigo-300 bg-indigo-500/10 rounded-lg p-4"><IconInfo />{message}</div>}

            {!loading && !error && movies.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {sortedMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} onAddToWatchlist={handleAddToWatchlist} />
                    ))}
                </div>
            )}
            {/* Pagination controls */}
            {!loading && !error && totalPages > 1 && (
                <div className="flex items-center justify-center mt-6 space-x-3">
                    <button
                        onClick={() => {
                            const params = new URLSearchParams(location.search);
                            const q = params.get('q');
                            const newPage = Math.max(1, page - 1);
                            if (q) params.set('page', newPage);
                            else {
                                params.set('page', newPage);
                            }
                            navigate({ search: params.toString() });
                        }}
                        disabled={page <= 1}
                        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <div className="text-sm text-gray-300">Page {page} of {totalPages}</div>

                    <button
                        onClick={() => {
                            const params = new URLSearchParams(location.search);
                            const q = params.get('q');
                            const newPage = Math.min(totalPages, page + 1);
                            if (q) params.set('page', newPage);
                            else params.set('page', newPage);
                            navigate({ search: params.toString() });
                        }}
                        disabled={page >= totalPages}
                        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;