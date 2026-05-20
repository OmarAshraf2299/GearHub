import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

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

  if (loading) return <div className="p-8 text-center">Loading orders...</div>;

  const groupedOrders = isTraderOrAdmin 
    ? orders.reduce((acc, order) => {
        const key = order.customer ? `${order.customer.name} (${order.customer.email})` : 'Unknown User';
        if (!acc[key]) acc[key] = [];
        acc[key].push(order);
        return acc;
      }, {})
    : { 'My Orders': orders };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-6">{isTraderOrAdmin ? 'Active Orders by User' : 'My Orders'}</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedOrders).map(([groupTitle, userOrders]) => (
            <div key={groupTitle} className="mb-8">
              {isTraderOrAdmin && <h3 className="text-2xl font-bold mb-4 text-blue-800 border-b pb-2">{groupTitle}</h3>}
              <div className="space-y-6">
                {userOrders.map(order => (
                  <div key={order.id} className="border p-6 rounded bg-white shadow">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">Order #{order.id}</h3>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded font-bold text-white ${order.status === 'DELIVERED' ? 'bg-green-500' : order.status === 'ACCEPTED' ? 'bg-blue-500' : order.status === 'DENIED' ? 'bg-red-500' : 'bg-orange-500'}`}>
                          {order.status}
                        </span>
                        {isTraderOrAdmin && order.status !== 'DELIVERED' && (
                          <select 
                            onChange={(e) => updateStatus(order.id, e.target.value)} 
                            value={order.status}
                            className="border p-1 rounded"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="ACCEPTED">ACCEPTED</option>
                            <option value="DENIED">DENIED</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="DELIVERED">DELIVERED</option>
                          </select>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
                    <div className="border-t pt-4">
                      <h4 className="font-bold mb-2">Items:</h4>
                      <ul className="space-y-2">
                        {order.items.map(item => (
                          <li key={item.id} className="flex justify-between">
                            <span>{item.quantity}x {item.product?.name || 'Product'}</span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 pt-4 border-t text-right">
                      <p className="text-xl font-bold">Total: ${order.totalAmount?.toFixed(2) || '0.00'}</p>
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
