import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Search from './Search';
import { IconFilm, IconUser, IconCog, IconMenu, IconX } from './Icons';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearch = (query) => {
        if (!query) return;
        setIsMobileMenuOpen(false); // Close menu on search
        navigate(`/?q=${encodeURIComponent(query)}`);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="bg-gradient-to-r from-indigo-950 via-blue-950 to-indigo-950 shadow-2xl border-b border-indigo-500/20 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" onClick={closeMenu} className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-all duration-300 flex items-center z-50">
                        <IconFilm /> YU-Movie
                    </Link>

                    {/* Desktop Search */}
                    <div className="flex-1 mx-6 hidden md:block">
                        <Search onSearch={handleSearch} />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <>
                                <span className="text-sm text-indigo-200"><IconUser />{user.name || 'User'}</span>
                                <Link to="/" className="text-white hover:text-indigo-300 transition-colors">
                                    Home
                                </Link>
                                <Link to="/watchlist" className="text-white hover:text-indigo-300 transition-colors">
                                    My Watchlist
                                </Link>
                                <Link to="/shared-watchlists" className="text-white hover:text-purple-300 transition-colors">
                                    Shared
                                </Link>
                                <Link to="/profile" className="text-white hover:text-indigo-300 transition-colors">
                                    Profile
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-yellow-300 hover:text-yellow-200 font-bold transition-colors flex items-center">
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
                                <Link to="/login" className="text-white hover:text-indigo-300 transition-colors">
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

                    {/* Mobile Menu Button */}
                    <div className="md:hidden z-50">
                        <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                            {isMobileMenuOpen ? <IconX className="w-8 h-8" /> : <IconMenu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`fixed inset-0 bg-gray-900/95 backdrop-blur-lg transform ${
                        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out md:hidden z-40 pt-20`}
                >
                    <div className="flex flex-col items-center space-y-6 p-6">
                        {/* Mobile Search */}
                        <div className="w-full max-w-sm">
                            <Search onSearch={handleSearch} />
                        </div>

                        {user ? (
                            <>
                                <div className="text-indigo-200 font-semibold text-lg border-b border-gray-700 pb-2 w-full text-center">
                                    <IconUser className="inline mr-2" />
                                    {user.name || 'User'}
                                </div>
                                <Link to="/" onClick={closeMenu} className="text-xl text-white hover:text-indigo-300 transition-colors">
                                    Home
                                </Link>
                                <Link to="/watchlist" onClick={closeMenu} className="text-xl text-white hover:text-indigo-300 transition-colors">
                                    My Watchlist
                                </Link>
                                <Link to="/shared-watchlists" onClick={closeMenu} className="text-xl text-white hover:text-purple-300 transition-colors">
                                    Shared Lists
                                </Link>
                                <Link to="/profile" onClick={closeMenu} className="text-xl text-white hover:text-indigo-300 transition-colors">
                                    Profile
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" onClick={closeMenu} className="text-xl text-yellow-300 hover:text-yellow-200 font-bold transition-colors flex items-center">
                                        <IconCog className="mr-2" /> Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMenu();
                                    }}
                                    className="w-full max-w-xs px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={closeMenu} className="text-xl text-white hover:text-indigo-300 transition-colors">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="w-full max-w-xs px-6 py-3 text-center text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
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