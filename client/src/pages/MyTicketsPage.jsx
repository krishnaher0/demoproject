import { useEffect, useState } from 'react';
import api from '../api';

const MyTicketsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const { data } = await api.get('/bookings/my');
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div className="text-center py-20">Loading tickets...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">My Tickets</h1>

            {bookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500 mb-4">You haven't booked any events yet.</p>
                    <a href="/" className="text-indigo-600 font-semibold hover:underline">Browse Events</a>
                </div>
            ) : (
                <div className="space-y-6">
                    {bookings.map(booking => (
                        <div key={booking._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row border border-gray-100">
                            {/* Image Section */}
                            <div className="md:w-1/3 bg-gray-200 h-48 md:h-auto">
                                <img
                                    src={booking.type === 'event' ? booking.event?.image : booking.venue?.images[0]}
                                    alt="Event"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="md:w-2/3 p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {booking.type === 'event' ? booking.event?.title : booking.venue?.name}
                                        </h2>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="text-gray-600 mb-4 space-y-1">
                                        <p>📅 {new Date(booking.date).toLocaleDateString()}</p>
                                        <p>📍 {booking.type === 'event' ? booking.event?.location : booking.venue?.address}</p>
                                        <p>🎟️ {booking.tickets} Ticket(s)</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center border-t pt-4 mt-4">
                                    <div>
                                        <p className="text-xs text-gray-400">Order ID</p>
                                        <p className="font-mono text-sm">{booking._id.slice(-8).toUpperCase()}</p>
                                    </div>
                                    <a href="#" className="text-indigo-600 font-semibold text-sm hover:underline">Download Ticket</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTicketsPage;
