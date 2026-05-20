import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiBox, FiCalendar, FiUser, FiArrowRight, FiCheckCircle, FiClock, FiAlertTriangle, FiCheck } from 'react-icons/fi';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isTraderOrAdmin = user.role === 'TRADER' || user.role === 'ADMIN';

  const fetchOrders = async () => {
    try {
      const data = await api.get('/orders');
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/orders/${id}/status`, { status: newStatus });
      fetchOrders();
    } catch (e) {
      alert('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-400">Loading orders...</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'ACCEPTED':
      case 'PROCESSING':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      case 'DENIED':
        return 'bg-red-500/10 text-red-400 border border-red-500/30';
      case 'PENDING':
      default:
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
    }
  };

  const groupedOrders = isTraderOrAdmin 
    ? orders.reduce((acc, order) => {
        const key = order.customer ? `${order.customer.name || 'User'} (${order.customer.email})` : 'Unknown User';
        if (!acc[key]) acc[key] = [];
        acc[key].push(order);
        return acc;
      }, {})
    : { 'My Orders': orders };

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto min-h-[85vh] animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <FiBox className="text-3xl text-blue-500" />
        <h2 className="text-3xl font-extrabold text-white">
          {isTraderOrAdmin ? 'Customer Purchase Orders' : 'My Purchase Orders'}
        </h2>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card text-center p-16 rounded-3xl max-w-xl mx-auto">
          <FiBox className="text-6xl text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">No Orders Placed</h3>
          <p className="text-gray-400 max-w-sm mx-auto">
            You don't have any purchase records inside your history directory yet.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedOrders).map(([groupTitle, userOrders]) => (
            <div key={groupTitle} className="order-group">
              {isTraderOrAdmin && (
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
                  <FiUser className="text-blue-400 text-xl" />
                  <h3 className="text-xl font-bold text-white">{groupTitle}</h3>
                </div>
              )}

              <div className="space-y-6">
                {userOrders.map((order) => (
                  <div key={order.id} className="glass-card p-6 rounded-2xl border border-white/5 shadow-lg transition-all hover:border-white/10">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                      <div>
                        <h4 className="font-extrabold text-white text-lg">Order #{order.id}</h4>
                        <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1">
                          <FiCalendar /> {new Date(order.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>

                      {/* Status select/pills */}
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>

                        {isTraderOrAdmin && order.status !== 'DELIVERED' && (
                          <div className="relative">
                            <select 
                              onChange={(e) => updateStatus(order.id, e.target.value)} 
                              value={order.status}
                              className="bg-white/5 border border-white/10 hover:border-white/20 text-white text-xs font-semibold py-1 px-3 rounded-lg outline-none cursor-pointer transition-colors"
                            >
                              <option value="PENDING" className="bg-gray-900 text-white">PENDING</option>
                              <option value="ACCEPTED" className="bg-gray-900 text-white">ACCEPTED</option>
                              <option value="DENIED" className="bg-gray-900 text-white">DENIED</option>
                              <option value="PROCESSING" className="bg-gray-900 text-white">PROCESSING</option>
                              <option value="DELIVERED" className="bg-gray-900 text-white">DELIVERED</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                      <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Line Items</h5>
                      <ul className="space-y-3">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-600/20 text-blue-400 text-xs font-bold px-2 py-0.5 rounded">
                                {item.quantity}x
                              </span>
                              <span className="text-white text-sm font-semibold">{item.product?.name || 'Product'}</span>
                            </div>
                            <span className="text-white text-sm font-bold">
                              E£ {((item.price || 0) * item.quantity).toLocaleString(undefined, {minimumFractionDigits: 2})}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <span className="text-sm text-gray-400">Total Purchase</span>
                      <span className="text-2xl font-extrabold text-blue-400">
                        E£ {(order.totalAmount || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
