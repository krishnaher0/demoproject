import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

const CreateCommunityPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/communities', formData);
            toast.success('Community created successfully');
            navigate('/communities');
        } catch (error) {
            console.error(error);
            toast.error('Failed to create community');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-2 text-center">Create New Community</h1>
            <p className="text-gray-600 text-center mb-8">Build a community around shared passions and connect with like-minded people</p>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Community Name *</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="e.g. Kathmandu Tech Enthusiasts"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Description *</label>
                    <textarea
                        name="description"
                        placeholder="Describe what your community is about..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Community Cover Image</label>
                    <input
                        name="image"
                        type="text"
                        placeholder="Image URL"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">Provide a URL for the community banner image</p>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/communities')}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Create Community
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCommunityPage;
