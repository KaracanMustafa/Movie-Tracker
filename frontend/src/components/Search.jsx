import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (!query) {
            alert('Please enter something to search.');
            return;
        }
        onSearch(query);
        // setQuery(''); // Optional: clear after search
    };

    return (
        <form onSubmit={onSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <input
                    className="flex-grow px-5 py-3 bg-gray-700/50 border border-indigo-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:bg-gray-700/80 transition-all duration-300"
                    type="text"
                    placeholder="Search for a movie..."
                    aria-label="Search movie"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                    type="submit"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

export default Search;
