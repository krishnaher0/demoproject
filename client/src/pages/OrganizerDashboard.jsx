import { useNavigate } from 'react-router-dom';

const OrganizerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
                    <p className="text-gray-600">Welcome back, Organizer</p>
                </div>
                <button
                    onClick={() => navigate('/create-event')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    + Create New Event
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">My Events</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">24</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Bookings</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">1,284</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">NPR 4,56,890</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Avg Rating</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">4.8</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    onClick={() => navigate('/create-event')}
                    className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition border-l-4 border-indigo-500"
                >
                    <h2 className="text-xl font-bold mb-2">Create & Manage Events</h2>
                    <p className="text-gray-600 mb-4">Post new events and manage existing ones.</p>
                    <button className="text-indigo-600 font-semibold hover:underline">Go to Create Event &rarr;</button>
                </div>

                <div
                    onClick={() => navigate('/shops')}
                    className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition border-l-4 border-pink-500"
                >
                    <h2 className="text-xl font-bold mb-2">Manage Shop Items</h2>
                    <p className="text-gray-600 mb-4">Sell merchandise related to your events.</p>
                    <button className="text-pink-600 font-semibold hover:underline">Go to Shops &rarr;</button>
                </div>
            </div>

            {/* Recent Bookings Placeholder */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="pb-3 text-gray-500 font-medium text-sm">Customer</th>
                                <th className="pb-3 text-gray-500 font-medium text-sm">Event</th>
                                <th className="pb-3 text-gray-500 font-medium text-sm">Tickets</th>
                                <th className="pb-3 text-gray-500 font-medium text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-gray-100">
                                <td className="py-3">Rajesh Sharma</td>
                                <td className="py-3">Tech Summit Nepal 2025</td>
                                <td className="py-3">2</td>
                                <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Confirmed</span></td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-3">Anita Gurung</td>
                                <td className="py-3">Holi Music Festival</td>
                                <td className="py-3">4</td>
                                <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Confirmed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrganizerDashboard;
