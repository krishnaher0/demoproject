import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Stats Cards Blueprint */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">12,458</p>
                    <span className="text-green-500 text-sm font-medium">+12% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Active Events</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">248</p>
                    <span className="text-green-500 text-sm font-medium">+28% this week</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">NPR 48.5 Lakhs</p>
                    <span className="text-green-500 text-sm font-medium">+32%</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    onClick={() => navigate('/venues')}
                    className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition border-l-4 border-indigo-500"
                >
                    <h2 className="text-xl font-bold mb-2">Manage Venues</h2>
                    <p className="text-gray-600 mb-4">Add, edit, or remove venues.</p>
                    <button className="text-indigo-600 font-semibold hover:underline">Go to Venues &rarr;</button>
                </div>

                <div
                    onClick={() => navigate('/')}
                    className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition border-l-4 border-purple-500"
                >
                    <h2 className="text-xl font-bold mb-2">Manage Events</h2>
                    <p className="text-gray-600 mb-4">Oversee all platform events.</p>
                    <button className="text-purple-600 font-semibold hover:underline">Go to Events &rarr;</button>
                </div>

                <div
                    onClick={() => navigate('/shops')}
                    className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition border-l-4 border-pink-500"
                >
                    <h2 className="text-xl font-bold mb-2">Manage Shops</h2>
                    <p className="text-gray-600 mb-4">Control shop items and inventory.</p>
                    <button className="text-pink-600 font-semibold hover:underline">Go to Shops &rarr;</button>
                </div>
            </div>

            {/* Recent Activity Section Placeholder */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Platform Activity</h2>
                <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <p className="text-sm text-gray-600">New venue "Nepal Academy Hall" added by Admin.</p>
                        <span className="ml-auto text-xs text-gray-400">2 mins ago</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <p className="text-sm text-gray-600">Event "Tech Summit 2025" approved.</p>
                        <span className="ml-auto text-xs text-gray-400">1 hour ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
