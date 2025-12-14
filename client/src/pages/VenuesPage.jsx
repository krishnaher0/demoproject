import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const VenuesPage = () => {
    const [venues, setVenues] = useState([]);
    const { user } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        capacity: '',
        pricePerHour: '',
        images: '',
        amenities: ''
    });

    const fetchVenues = async () => {
        try {
            const { data } = await api.get('/venues');
            setVenues(data);
        } catch (error) {
            console.error('Error fetching venues:', error);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                images: [formData.images], // Wrap single image URL in array
                amenities: formData.amenities.split(',').map(item => item.trim()) // Split CSV
            };
            await api.post('/venues', payload);
            toast.success('Venue added successfully');
            setShowForm(false);
            setFormData({
                name: '',
                description: '',
                address: '',
                capacity: '',
                pricePerHour: '',
                images: '',
                amenities: ''
            });
            fetchVenues();
        } catch (error) {
            console.error(error);
            toast.error('Failed to add venue');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-secondary">Venues</h1>
                {user?.role === 'admin' && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        {showForm ? 'Cancel' : '+ Add Venue'}
                    </button>
                )}
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border">
                    <h2 className="text-2xl font-bold mb-4">Add New Venue</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" placeholder="Venue Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
                        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 rounded" required />
                        <input name="capacity" type="number" placeholder="Capacity" value={formData.capacity} onChange={handleChange} className="border p-2 rounded" required />
                        <input name="pricePerHour" type="number" placeholder="Price Per Hour" value={formData.pricePerHour} onChange={handleChange} className="border p-2 rounded" required />
                        <input name="images" placeholder="Image URL" value={formData.images} onChange={handleChange} className="border p-2 rounded" />
                        <input name="amenities" placeholder="Amenities (comma separated)" value={formData.amenities} onChange={handleChange} className="border p-2 rounded" />
                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded md:col-span-2" rows="3" required></textarea>
                        <button type="submit" className="bg-green-600 text-white py-2 rounded md:col-span-2 hover:bg-green-700">Submit Venue</button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map(venue => (
                    <div key={venue._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            {venue.images && venue.images[0] ? (
                                <img src={venue.images[0]} alt={venue.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-500">No Image</span>
                            )}
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-2">{venue.name}</h2>
                            <p className="text-gray-600 mb-2">Capacity: {venue.capacity}</p>
                            <p className="text-primary font-bold">${venue.pricePerHour}/hr</p>
                            <p className="text-sm text-gray-400 mt-2">{venue.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VenuesPage;
