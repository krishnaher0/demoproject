import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

const CreateBlogPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        excerpt: '', // Can map to content or tags if needed
        content: '',
        image: '',
        tags: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/blogs', {
                ...formData,
                tags: formData.tags // Backend handles splitting
            });
            toast.success('Blog post created successfully');
            navigate('/blogs');
        } catch (error) {
            console.error(error);
            toast.error('Failed to create blog post');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-3xl font-bold mb-2 text-center">Create New Blog Post</h1>
            <p className="text-gray-600 text-center mb-8">Share your insights, experiences, and stories with the community</p>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Blog Title *</label>
                    <input
                        name="title"
                        type="text"
                        placeholder="e.g. Ultimate Guide to Planning a Tech Event"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Category *</label>
                        <select
                            name="category"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Event Planning">Event Planning</option>
                            <option value="Technology">Technology</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Lifestyle">Lifestyle</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Tags</label>
                        <input
                            name="tags"
                            type="text"
                            placeholder="e.g. tips, planning, 2024"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Content *</label>
                    <textarea
                        name="content"
                        placeholder="Write your full blog post here..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-64"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Cover Image URL</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input
                                name="image"
                                type="text"
                                className="hidden"
                                onChange={handleChange}
                            // Since we are using URL for now, let's just make this a text input masked as file upload area strictly for UI demo or actually input URL
                            />
                        </label>
                    </div>
                    <input
                        name="image"
                        type="text"
                        placeholder="Or paste image URL here"
                        className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/blogs')}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Publish Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlogPage;
