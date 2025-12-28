import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import movieService from '../services/movieService';
import reviewService from '../services/reviewService';
import AuthContext from '../context/AuthContext';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { IconStar, IconCalendar, IconPin } from '../components/Icons';

const MovieDetailPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovieData = async () => {
            setLoading(true);
            setError('');
            try {
                const movieRes = await movieService.getMovieDetails(id);
                setMovie(movieRes.data);

                const reviewsRes = await reviewService.getReviews(id);
                setReviews(reviewsRes.data);

            } catch (err) {
                console.error(err);
                setError('Failed to load movie details.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieData();
    }, [id]);

    const handleReviewSubmitted = (newReview) => {
        setReviews([newReview, ...reviews]);
    };

    if (loading) return (
        <div className="max-w-4xl mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="skeleton skeleton-img rounded-lg"></div>
                <div className="md:col-span-2 space-y-4">
                    <div className="skeleton skeleton-line w-3/4"></div>
                    <div className="skeleton skeleton-line w-1/2"></div>
                    <div className="skeleton skeleton-subline w-1/3"></div>
                    <div className="skeleton skeleton-line"></div>
                    <div className="skeleton skeleton-line"></div>
                </div>
            </div>
        </div>
    );
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
    if (!movie) return <div className="text-center mt-8">Movie not found.</div>;

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750.png?text=No+Image';

    const formatRuntime = (m) => {
        if (!m) return 'N/A';
        const h = Math.floor(m / 60);
        const mm = m % 60;
        return `${h}h ${mm}m`;
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-8 border border-indigo-500/20">
                <img src={posterUrl} alt={movie.title} className="w-full md:w-1/3 rounded-lg shadow-lg object-cover" />
                <div className="md:ml-8 mt-6 md:mt-0 text-white flex-1">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">{movie.title} {movie.release_date ? `(${movie.release_date.substring(0, 4)})` : ''}</h1>
                    {movie.tagline && <p className="text-lg italic text-indigo-200/80 mt-1">{movie.tagline}</p>}

                    <div className="flex items-center my-4 space-x-4">
                        <div className="flex items-center">
                            <IconStar className="w-5 h-5 inline-block mr-2 text-yellow-400" />
                            <span className="font-bold text-lg">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</span>
                            <span className="ml-3 text-sm text-gray-400">({movie.vote_count || 0} votes)</span>
                        </div>
                        <div className="text-sm text-gray-300 flex items-center">
                            <IconCalendar className="w-4 h-4 mr-1" />
                            <span>{movie.release_date || '—'}</span>
                        </div>
                        <div className="text-sm text-gray-300 flex items-center">
                            <IconPin className="w-4 h-4 mr-1" />
                            <span>{movie.status || '—'}</span>
                        </div>
                    </div>

                    <div className="my-4">
                        {Array.isArray(movie.genres) && movie.genres.length > 0 && movie.genres.map(g => (
                            <span key={g.id || g.name} className="inline-block bg-indigo-700/30 rounded-full px-3 py-1 text-sm font-semibold text-indigo-200 mr-2 mb-2">
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-2 text-indigo-200">Overview</h3>
                        <p className="text-gray-300 leading-relaxed">{movie.overview || 'No overview available.'}</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-300">
                        <div>
                            <div className="font-semibold text-indigo-200">Runtime</div>
                            <div>{formatRuntime(movie.runtime)}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-indigo-200">Language</div>
                            <div>{movie.original_language?.toUpperCase() || '—'}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <ReviewList reviews={reviews} />
                {user && (
                    <ReviewForm tmdbId={id} onReviewSubmitted={handleReviewSubmitted} />
                )}
            </div>
        </div>
    );
};

export default MovieDetailPage;
