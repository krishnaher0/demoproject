import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ShopsPage = () => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: ''
    });

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', formData);
            toast.success('Product added successfully');
            setShowForm(false);
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                image: '',
                stock: ''
            });
            fetchProducts();
        } catch (error) {
            console.error(error);
            toast.error('Failed to add product');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-secondary">Shop</h1>
                {(user?.role === 'admin' || user?.role === 'organizer') && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        {showForm ? 'Cancel' : '+ Add Product'}
                    </button>
                )}
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border">
                    <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
                        <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 rounded" required />
                        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 rounded" required />
                        <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} className="border p-2 rounded" required />
                        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="border p-2 rounded md:col-span-2" />
                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded md:col-span-2" rows="3" required></textarea>
                        <button type="submit" className="bg-green-600 text-white py-2 rounded md:col-span-2 hover:bg-green-700">Submit Product</button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                        <img
                            src={product.image || 'https://via.placeholder.com/300'}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-500 mb-2 text-sm">{product.category}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-primary">${product.price}</span>
                                <button className="bg-secondary text-white px-3 py-1 rounded text-sm hover:bg-opacity-90">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopsPage;
