import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

const BookEventPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event:', error);
                toast.error('Event not found');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleProceed = () => {
        navigate('/payment', {
            state: {
                type: 'event',
                item: event,
                tickets,
                totalAmount: (event.price || 0) * tickets
            }
        });
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!event) return <div className="text-center py-20">Event not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img src={event.image} alt={event.title} className="w-full h-96 object-cover" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                        <div className="flex items-center text-gray-600 mb-2">
                            <span className="mr-4">📅 {new Date(event.date).toLocaleDateString()}</span>
                            <span>📍 {event.location}</span>
                        </div>
                        <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>

                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Select Tickets</h3>
                            <div className="flex justify-between items-center mb-4">
                                <span>General Admission</span>
                                <span className="font-bold text-lg">${event.price || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Quantity</span>
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                        onClick={() => setTickets(Math.max(1, tickets - 1))}
                                    >
                                        -
                                    </button>
                                    <span className="font-bold text-lg w-8 text-center">{tickets}</span>
                                    <button
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                        onClick={() => setTickets(tickets + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold text-gray-900">Total</span>
                            <span className="text-2xl font-bold text-indigo-600">${(event.price || 0) * tickets}</span>
                        </div>
                        <button
                            onClick={handleProceed}
                            className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookEventPage;
