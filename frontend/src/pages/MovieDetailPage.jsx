import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import movieService from '../services/movieService';
import reviewService from '../services/reviewService';
import AuthContext from '../context/AuthContext';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

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

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
    if (!movie) return <div className="text-center mt-8">Movie not found.</div>;

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750.png?text=No+Image';

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl p-8">
                <img src={posterUrl} alt={movie.title} className="w-full md:w-1/3 rounded-lg" />
                <div className="md:ml-8 mt-6 md:mt-0">
                    <h1 className="text-4xl font-bold">{movie.title} ({movie.release_date.substring(0, 4)})</h1>
                    <p className="text-lg italic text-gray-600 mt-2">{movie.tagline}</p>
                    <div className="flex items-center my-4">
                        <span className="text-yellow-500 font-bold text-xl">{movie.vote_average.toFixed(1)} / 10</span>
                        <span className="ml-4 text-gray-500">({movie.vote_count} votes)</span>
                    </div>
                    <div className="my-4">
                        {movie.genres.map(g => (
                            <span key={g.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                {g.name}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-xl font-bold mt-6 mb-2">Overview</h3>
                    <p>{movie.overview}</p>
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
