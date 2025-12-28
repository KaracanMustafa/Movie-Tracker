import React from 'react';
import { Link } from 'react-router-dom';

const MinimalNavbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-950 via-blue-950 to-indigo-950 shadow-sm border-b border-indigo-500/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center py-3">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            YU-Movie
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MinimalNavbar;
