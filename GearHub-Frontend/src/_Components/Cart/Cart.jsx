import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const data = await api.get('/cart');
      setCart(data);
    } catch (e) {
      setError(e.message || 'Error fetching cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      await api.put(`/cart/items/${productId}`, { quantity });
      fetchCart();
    } catch (e) {
      alert('Failed to update cart');
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/items/${productId}`);
      fetchCart();
    } catch (e) {
      alert('Failed to remove item');
    }
  };

  const checkout = async () => {
    try {
      await api.post('/orders/checkout');
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (e) {
      alert('Checkout failed: ' + e.message);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading cart...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>
      {(!cart || !cart.items || cart.items.length === 0) ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.items.map(item => (
              <div key={item.productId} className="flex justify-between items-center border p-4 rounded bg-white">
                <div>
                  <h3 className="font-bold text-lg">{item.productName}</h3>
                  <p className="text-gray-600">${(item.unitPrice || 0).toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold">${((item.unitPrice || 0) * item.quantity).toFixed(2)}</span>
                  <div className="flex items-center">
                    <button onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))} className="bg-gray-200 px-3 py-1">-</button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="bg-gray-200 px-3 py-1">+</button>
                  </div>
                  <button onClick={() => removeItem(item.productId)} className="text-red-500 text-sm">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center border-t py-4">
            <h3 className="text-xl font-bold">Total: ${(cart.items.reduce((sum, item) => sum + (item.unitPrice || 0) * item.quantity, 0)).toFixed(2)}</h3>
            <button onClick={checkout} className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

