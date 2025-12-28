import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Search from './Search';
import { IconFilm, IconUser, IconCog } from './Icons';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSearch = (query) => {
        if (!query) return;
        navigate(`/?q=${encodeURIComponent(query)}`);
    };

    return (
        <nav className="bg-gradient-to-r from-indigo-950 via-blue-950 to-indigo-950 shadow-2xl border-b border-indigo-500/20 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-all duration-300 flex items-center">
                        <IconFilm /> YU-Movie
                    </Link>

                    <div className="flex-1 mx-6 hidden md:block">
                        <Search onSearch={handleSearch} />
                    </div>

                    <div className="flex items-center space-x-6">
                        {user ? (
                            <>
                                <span className="text-sm text-indigo-200 hidden md:inline"><IconUser />{user.name || 'User'}</span>
                                <Link to="/" className="text-white hover:text-indigo-300 transition-colors text-sm md:text-base">
                                    Home
                                </Link>
                                <Link to="/watchlist" className="text-white hover:text-indigo-300 transition-colors text-sm md:text-base">
                                    My Watchlist
                                </Link>
                                <Link to="/shared-watchlists" className="text-white hover:text-purple-300 transition-colors text-sm md:text-base">
                                    Shared
                                </Link>
                                <Link to="/profile" className="text-white hover:text-indigo-300 transition-colors text-sm md:text-base">
                                    Profile
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-yellow-300 hover:text-yellow-200 font-bold transition-colors text-sm md:text-base flex items-center">
                                        <IconCog /> Admin
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-indigo-300 transition-colors text-sm md:text-base">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
