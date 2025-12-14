import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { type, item, tickets, totalAmount } = location.state || {};
    const [paymentMethod, setPaymentMethod] = useState('esewa');
    const [loading, setLoading] = useState(false);

    if (!location.state) {
        return <div className="text-center py-20 text-red-500">Invalid access</div>;
    }

    const handlePayment = async () => {
        setLoading(true);
        try {
            // Mock payment processing time
            await new Promise(resolve => setTimeout(resolve, 2000));

            const bookingData = {
                type, // 'event' or 'venue'
                eventId: type === 'event' ? item._id : undefined,
                venueId: type === 'venue' ? item._id : undefined,
                tickets: tickets,
                totalAmount: totalAmount,
                date: new Date(), // Booking date
                paymentId: `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            };

            await api.post('/bookings', bookingData);
            toast.success('Payment Successful! Ticket Booked.');
            navigate('/tickets');
        } catch (error) {
            console.error('Payment failed:', error);
            toast.error('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">Order Summary</h3>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Item</span>
                    <span className="font-medium">{item.title || item.name}</span>
                </div>
                {type === 'event' && (
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Tickets</span>
                        <span className="font-medium">x {tickets}</span>
                    </div>
                )}
                <div className="flex justify-between pt-2 border-t mt-2">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="font-bold text-indigo-600">${totalAmount}</span>
                </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <h3 className="text-lg font-bold mb-4">Select Payment Method</h3>
                <div className="space-y-3">
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'esewa' ? 'border-green-500 bg-green-50' : 'hover:bg-gray-50'}`}>
                        <input
                            type="radio"
                            name="payment"
                            value="esewa"
                            checked={paymentMethod === 'esewa'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-3 font-medium">eSewa Mobile Wallet</span>
                    </label>
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'khalti' ? 'border-purple-500 bg-purple-50' : 'hover:bg-gray-50'}`}>
                        <input
                            type="radio"
                            name="payment"
                            value="khalti"
                            checked={paymentMethod === 'khalti'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-3 font-medium">Khalti Digital Wallet</span>
                    </label>
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                        <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 font-medium">Credit/Debit Card</span>
                    </label>
                </div>
            </div>

            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </>
                ) : (
                    `Pay NPR ${totalAmount * 130}` // Mock NPR conversion
                )}
            </button>
        </div>
    );
};

export default PaymentPage;
