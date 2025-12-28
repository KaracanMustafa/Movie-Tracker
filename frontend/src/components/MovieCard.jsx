import React from 'react';
import { IconCalendar } from './Icons';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onAddToWatchlist }) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750.png?text=No+Image';

    const handleAdd = (e) => {
        e.stopPropagation(); // Prevent the link from being triggered
        e.preventDefault(); // Prevent default button behavior
        const itemData = {
            tmdbId: movie.id.toString(),
            title: movie.title,
            poster_path: movie.poster_path,
        };
        onAddToWatchlist(itemData);
    };

    return (
        <Link to={`/movie/${movie.id}`} className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                <img src={posterUrl} alt={movie.title} className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-4 flex flex-col flex-grow bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur">
                <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors flex-grow line-clamp-2">{movie.title}</h3>
                <p className="text-xs text-indigo-300 mt-2">
                    <IconCalendar /> {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
                </p>
                <button
                    onClick={handleAdd}
                    className="mt-3 w-full px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl z-10 transform group-hover:scale-95"
                >
                    + Watchlist
                </button>
            </div>
        </Link>
    );
};

export default MovieCard;

