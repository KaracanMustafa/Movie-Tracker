import React from 'react';

const ReviewList = ({ reviews }) => {
    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">User Reviews</h3>
            {reviews.length === 0 ? (
                <p>No reviews yet for this movie.</p>
            ) : (
                <div className="space-y-4">
                    {reviews.map(review => (
                        <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <p className="font-bold">{review.username}</p>
                                <p className="text-sm text-gray-500 ml-4">
                                    {new Date(review.date).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="font-semibold text-yellow-500">Rating: {review.rating} / 10</p>
                            <p className="mt-2">{review.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewList;
