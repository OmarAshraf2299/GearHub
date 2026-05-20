import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCreditCard, FiArrowLeft } from 'react-icons/fi';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkoutStatus, setCheckoutStatus] = useState('');
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
      console.error('Failed to update cart quantity:', e);
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/items/${productId}`);
      fetchCart();
    } catch (e) {
      console.error('Failed to remove item:', e);
    }
  };

  const checkout = async () => {
    try {
      setCheckoutStatus('loading');
      await api.post('/orders/checkout');
      setCheckoutStatus('success');
      setTimeout(() => {
        navigate('/orders');
      }, 1500);
    } catch (e) {
      alert('Checkout failed: ' + e.message);
      setCheckoutStatus('');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-400">Loading your cart items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl max-w-md">
          <p className="font-bold text-lg mb-2">Error Accessing Cart</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const isEmpty = items.length === 0;
  const cartTotal = items.reduce((sum, item) => sum + (item.unitPrice || 0) * item.quantity, 0);

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto min-h-[80vh] animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <FiShoppingBag className="text-3xl text-blue-500" />
        <h2 className="text-3xl font-extrabold text-white">Your Shopping Cart</h2>
      </div>

      {isEmpty ? (
        <div className="glass-card text-center p-16 rounded-3xl max-w-xl mx-auto">
          <FiShoppingBag className="text-6xl text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h3>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            Looks like you haven't added any parts to your catalog cart yet. Explore our top brand catalog to find parts.
          </p>
          <button 
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
          >
            <FiArrowLeft /> Browse Products
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items List */}
          <div className="lg:w-2/3 flex flex-col gap-4">
            {items.map((item) => (
              <div 
                key={item.productId} 
                className="glass-card p-5 md:p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-white/10"
              >
                <div className="flex-grow">
                  <h3 className="font-bold text-white text-lg mb-1">{item.productName}</h3>
                  <p className="text-sm text-gray-400">
                    E£ {(item.unitPrice || 0).toLocaleString(undefined, {minimumFractionDigits: 2})} each
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity adjustment */}
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))} 
                      className="p-2 hover:bg-white/10 text-gray-300 transition-colors"
                      title="Decrease Quantity"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-white text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)} 
                      className="p-2 hover:bg-white/10 text-gray-300 transition-colors"
                      title="Increase Quantity"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Pricing and Delete */}
                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-white text-lg min-w-[90px] text-right">
                      E£ {(item.unitPrice * item.quantity).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </span>
                    <button 
                      onClick={() => removeItem(item.productId)} 
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-all"
                      title="Remove Item"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="lg:w-1/3">
            <div className="glass-card p-6 md:p-8 rounded-3xl sticky top-28">
              <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-white/10">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">E£ {cartTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Taxes (Included)</span>
                  <span className="text-white font-medium">E£ 0.00</span>
                </div>
                <div className="border-t border-white/5 pt-4 flex justify-between">
                  <span className="text-base font-bold text-white">Estimated Total</span>
                  <span className="text-2xl font-extrabold text-blue-400">
                    E£ {cartTotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </span>
                </div>
              </div>

              <button 
                onClick={checkout} 
                disabled={checkoutStatus === 'loading' || checkoutStatus === 'success'}
                className={`w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
                  checkoutStatus === 'success' 
                    ? "bg-emerald-600 shadow-emerald-600/20"
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 hover:scale-[1.02]"
                }`}
              >
                <FiCreditCard />
                <span>
                  {checkoutStatus === 'loading' 
                    ? 'Processing...' 
                    : checkoutStatus === 'success' 
                    ? 'Order Placed!' 
                    : 'Proceed to Checkout'}
                </span>
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
