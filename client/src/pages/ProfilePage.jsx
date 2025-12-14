import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header/Cover */}
                <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

                {/* Profile Info */}
                <div className="px-8 pb-8 relative">
                    <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-8">
                        <div className="w-32 h-32 bg-white rounded-full p-1 shadow-lg">
                            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-4xl font-bold text-gray-400 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop)' }}>
                                {/* User Avater or Initials */}
                                {!user?.name && 'U'}
                            </div>
                        </div>
                        <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
                            <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                            <p className="text-gray-500">{user?.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                                {user?.role}
                            </span>
                        </div>
                        <div className="md:ml-auto mt-4 md:mt-0 flex gap-3">
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <h3 className="text-2xl font-bold text-indigo-600">24</h3>
                            <p className="text-gray-600 text-sm">Events Attended</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <h3 className="text-2xl font-bold text-green-600">12</h3>
                            <p className="text-gray-600 text-sm">Upcoming</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl text-center">
                            <h3 className="text-2xl font-bold text-purple-600">5</h3>
                            <p className="text-gray-600 text-sm">Communities</p>
                        </div>
                    </div>

                    {/* Settings / Forms */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                Change Password
                            </h3>
                            <div className="bg-gray-50 p-6 rounded-xl max-w-lg">
                                <div className="space-y-4">
                                    <input type="password" placeholder="Current Password" className="w-full px-4 py-2 border rounded-lg bg-white" />
                                    <input type="password" placeholder="New Password" className="w-full px-4 py-2 border rounded-lg bg-white" />
                                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">Update Password</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4 text-red-600">Account Actions</h3>
                            <button className="text-red-500 hover:text-red-700 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
