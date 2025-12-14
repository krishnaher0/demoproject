import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const CommunitiesPage = () => {
    const [communities, setCommunities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const { data } = await api.get('/communities');
                setCommunities(data);
            } catch (error) {
                console.error('Error fetching communities:', error);
            }
        };
        fetchCommunities();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden mb-12 bg-indigo-900 text-white p-12">
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl font-bold mb-4">Communities and Groups</h1>
                    <p className="text-lg text-indigo-100 mb-8">
                        Connect with like-minded people, join discussions, and attend meetups with your local community.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-white text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                            Browse Groups
                        </button>
                        <button
                            onClick={() => navigate('/create-community')}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition border border-indigo-500"
                        >
                            + Create New
                        </button>
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-800 skew-x-12 transform translate-x-20 opacity-50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map(community => (
                    <div key={community._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition group">
                        <div className="h-32 bg-gray-100 relative">
                            {community.image ? (
                                <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                            )}
                            <div className="absolute -bottom-6 left-6">
                                <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-sm">
                                    <div className="w-full h-full bg-indigo-100 rounded flex items-center justify-center text-indigo-600 font-bold">
                                        {community.name.charAt(0)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{community.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{community.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    {/* {community.members?.length || 0} Members */}
                                    120 Members
                                </span>
                                <button className="text-indigo-600 font-semibold text-sm group-hover:underline">
                                    Join Community &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunitiesPage;
