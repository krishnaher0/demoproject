import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import toast from 'react-hot-toast';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await api.get('/blogs');
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Blogs & News</h1>
                    <p className="text-gray-600">Insights, tips, and updates from Nepal's event industry</p>
                </div>
                <button
                    onClick={() => navigate('/create-blog')}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    Write Blog
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map(blog => (
                    <div key={blog._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
                        {blog.image && (
                            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">{blog.title}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{blog.content}</p>
                            <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-4">
                                <span className="font-medium text-indigo-600">By {blog.author?.name || 'Author'}</span>
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {blogs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No blogs found. Be the first to write one!
                </div>
            )}
        </div>
    );
};

export default BlogsPage;
