import React from 'react';

const ReviewList = ({ reviews }) => {
    return (
        <div className="mt-8 space-y-4">
            <h3 className="text-2xl font-bold text-indigo-300 mb-6">⭐ User Reviews</h3>
            {reviews.length === 0 ? (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-indigo-500/20">
                    <p className="text-gray-400">ℹ️ No reviews yet for this movie.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map(review => (
                        <div key={review._id} className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-bold text-indigo-300">{review.username}</p>
                                <p className="text-xs text-gray-400">
                                    📅 {new Date(review.date).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="font-semibold text-yellow-400 mb-3">⭐ Rating: {review.rating} / 10</p>
                            <p className="text-gray-300 leading-relaxed">{review.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewList;
