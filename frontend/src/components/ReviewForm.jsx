import React, { useState } from 'react';
import reviewService from '../services/reviewService';

const ReviewForm = ({ tmdbId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(5);
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!text || !rating) {
            setError('Please provide a rating and a review text.');
            return;
        }
        setError('');
        try {
            const newReview = await reviewService.createReview(tmdbId, { rating, text });
            onReviewSubmitted(newReview.data);
            setText('');
            setRating(5);
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Failed to submit review.';
            setError(errorMsg);
        }
    };

    return (
        <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border border-indigo-500/20">
            <h3 className="text-2xl font-bold mb-4 text-indigo-300">⭐ Write a Review</h3>
            {error && <p className="text-red-400 mb-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3">❌ {error}</p>}
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-sm font-semibold text-indigo-300 mb-2">Your Rating</label>
                    <input
                        id="rating"
                        type="number"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="text" className="block text-sm font-semibold text-indigo-300 mb-2">Your Review</label>
                    <textarea
                        id="text"
                        rows="4"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        placeholder="What did you think of the movie?"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
