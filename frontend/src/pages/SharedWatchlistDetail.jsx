import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import sharedWatchlistService from '../services/sharedWatchlistService';
import { IconUser, IconFilm, IconPin, IconSearch } from '../components/Icons';

const SharedWatchlistDetail = () => {
    const { id } = useParams();
    const [list, setList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [memberEmail, setMemberEmail] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await sharedWatchlistService.getSharedWatchlistById(id);
                setList(res.data);
            } catch (err) {
                console.error('Failed to load list', err);
                setError(err?.response?.data?.msg || 'Failed to load list');
                toast.error('Failed to load shared list.');
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const handleAddMember = async (e) => {
        e.preventDefault();
        if (!memberEmail) return;
        try {
            const res = await sharedWatchlistService.addMember(id, { email: memberEmail });
            setList(res.data);
            setMemberEmail('');
            toast.success('Member added successfully!');
        } catch (err) {
            console.error('Failed to add member', err);
            const errMsg = err?.response?.data?.msg || 'Failed to add member';
            // setError(errMsg);
            toast.error(errMsg);
        }
    };

    if (loading) return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <div className="skeleton skeleton-line w-1/3 mb-3"></div>
                <div className="skeleton skeleton-subline w-1/4"></div>
            </div>

            <div className="mb-6">
                <div className="skeleton skeleton-line w-1/4 mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30">
                            <div className="flex items-center gap-3">
                                <div className="skeleton skeleton-img w-20 h-28 rounded mr-3"></div>
                                <div className="flex-1">
                                    <div className="skeleton skeleton-line w-3/4 mb-2"></div>
                                    <div className="skeleton skeleton-subline w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <div className="skeleton skeleton-line w-1/6 mb-3"></div>
                <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="skeleton skeleton-subline w-1/2"></div>
                    ))}
                </div>
            </div>
        </div>
    );
    if (error) return <div className="p-6 text-red-400">{error}</div>;
    if (!list) return <div className="p-6">No list found.</div>;

    return (
        <div className="container mx-auto p-6 space-y-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-indigo-200 mb-2"><IconPin /> {list.name}</h1>
                <p className="text-sm text-gray-400 bg-gray-800/50 inline-block px-3 py-1 rounded-full border border-gray-700">
                    <IconUser /> Owner: <span className="text-gray-200 ml-1">{list.owner?.name}</span>
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-indigo-200 mb-3 border-b border-gray-700 pb-2">Movies</h2>
                {list.movies.length === 0 ? (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-indigo-500/20 text-center">
                        <p className="text-gray-400 text-lg mb-4">No movies added yet.</p>
                        <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
                            <IconSearch className="mr-1" /> Search for movies to add
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {list.movies.map(m => (
                            <Link
                                to={`/movie/${m.tmdbId}`}
                                key={m.tmdbId}
                                aria-label={`Open movie ${m.title}`}
                                className="block bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-indigo-500/20 hover:shadow-2xl hover:scale-105 transition-all duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <img src={m.poster_path ? `https://image.tmdb.org/t/p/w200${m.poster_path}` : 'https://via.placeholder.com/80x120'} alt={m.title} className="w-20 h-28 object-cover rounded shadow-md" />
                                    <div>
                                        <div className="font-semibold text-white line-clamp-2">{m.title}</div>
                                        <div className="text-xs text-gray-400 mt-1">Added by user ID: {m.added_by}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50">
                <h2 className="text-xl font-semibold text-indigo-200 mb-4 border-b border-gray-700 pb-2">Members & Settings</h2>
                
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Current Members</h3>
                    <div className="space-y-2">
                        {list.members.map(m => (
                            <div key={m._id} className="flex items-center text-gray-200 bg-gray-800 px-3 py-2 rounded-lg">
                                <IconUser className="text-gray-500 mr-2" />
                                <span>{m.name}</span>
                                <span className="text-gray-500 text-sm ml-2">({m.email})</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Invite New Member</h3>
                    <form onSubmit={handleAddMember} className="flex gap-2 max-w-md">
                        <input 
                            type="email" 
                            value={memberEmail} 
                            onChange={(e) => setMemberEmail(e.target.value)} 
                            placeholder="friend@example.com" 
                            className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            required
                        />
                        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-lg">
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SharedWatchlistDetail;