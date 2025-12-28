import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import sharedWatchlistService from '../services/sharedWatchlistService';
import { IconUser, IconFilm, IconPin } from '../components/Icons';

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
        } catch (err) {
            console.error('Failed to add member', err);
            setError(err?.response?.data?.msg || 'Failed to add member');
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
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-indigo-200"><IconPin /> {list.name}</h1>
                <p className="text-sm text-gray-400">Owner: <IconUser /> {list.owner?.name}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-indigo-200 mb-3">Movies</h2>
                {list.movies.length === 0 ? (
                    <div className="text-gray-400">No movies added yet.</div>
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
                                    <img src={m.poster_path ? `https://image.tmdb.org/t/p/w200${m.poster_path}` : 'https://via.placeholder.com/80x120'} alt={m.title} className="w-20 h-28 object-cover rounded" />
                                    <div>
                                        <div className="font-semibold text-white">{m.title}</div>
                                        <div className="text-sm text-gray-400">Added by: {m.added_by}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-indigo-200 mb-3">Members</h2>
                <div className="space-y-2">
                    {list.members.map(m => (
                        <div key={m._id} className="text-gray-200">{m.name} ({m.email})</div>
                    ))}
                </div>

                <form onSubmit={handleAddMember} className="mt-4 flex gap-2">
                    <input value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} placeholder="member@example.com" className="flex-1 px-3 py-2 bg-gray-800 rounded" />
                    <button className="px-4 py-2 bg-indigo-600 rounded">Add</button>
                </form>
            </div>
        </div>
    );
};

export default SharedWatchlistDetail;
