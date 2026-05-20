import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiPackage, FiDollarSign, FiTag, FiLayers, FiList, FiTrash2, FiPlusCircle, FiTrendingUp } from 'react-icons/fi';

const CATEGORIES = [
  { group: "🪑 Seats & Upholstery", items: ["Front Seats", "Rear Seats", "Seat Covers", "Foam & Cushioning", "Headrests"] },
  { group: "🎛️ Dashboard & Controls", items: ["Dashboard Panels", "Instrument Cluster", "Steering Wheel", "Gear Shift Knob", "Center Console"] },
  { group: "❄️ HVAC System", items: ["Air Conditioning Vents", "Blower Motor", "AC Controls", "Cabin Filter"] },
  { group: "🔌 Electrical Interior", items: ["Interior Lights", "Switches", "Wiring Harness", "Sensors"] },
  { group: "🚪 Doors & Interior Panels", items: ["Door Panels", "Door Handles", "Window Mechanism", "Lock System"] },
  { group: "🧳 Storage & Comfort", items: ["Glove Box", "Armrest", "Cup Holders", "Interior Trim"] },
  { group: "🛡️ Body Panels", items: ["Front Bumper", "Rear Bumper", "Hood / Bonnet", "Fenders", "Doors", "Roof Panels"] },
  { group: "💡 Lighting System", items: ["Headlights", "Taillights", "Fog Lights", "Turn Signals", "Daytime Running Lights (DRL)"] },
  { group: "🪞 Mirrors & Glass", items: ["Side Mirrors", "Rear View Mirror", "Windshield", "Side Windows", "Rear Glass"] },
  { group: "🛞 Wheels & Tires", items: ["Alloy Wheels", "Steel Wheels", "Tires", "Wheel Caps", "Lug Nuts"] },
  { group: "🔩 Exterior Accessories", items: ["Roof Rack", "Spoilers", "Mudguards", "Body Kits", "Tow Hook"] },
  { group: "⚙️ Exterior Mechanical Elements", items: ["Radiator Grill", "Engine Cover", "Underbody Shields"] }
];

export default function TraderPanel() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stockQuantity, setStockQuantity] = useState(10);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.get('/products/mine');
      setProducts(data);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', { 
        name, 
        price: parseFloat(price), 
        description, 
        stockQuantity: parseInt(stockQuantity), 
        category 
      });
      setName(''); 
      setPrice(''); 
      setDescription(''); 
      setCategory('');
      loadProducts();
    } catch (e) {
      alert(e.message || 'Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (e) {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto min-h-[85vh] animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <FiTrendingUp className="text-3xl text-blue-500" />
        <h2 className="text-3xl font-extrabold text-white">Trader Dashboard</h2>
      </div>
      
      {/* Add New Product Form Section */}
      <div className="glass-card p-6 md:p-8 rounded-3xl mb-12 shadow-lg border border-white/5 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-white/10">
          <FiPlusCircle className="text-xl text-blue-400" />
          <h3 className="text-xl font-bold text-white">Add New Product to Directory</h3>
        </div>

        <form onSubmit={handleAddProduct} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Name */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 flex items-center gap-1"><FiPackage /> Product Title</label>
              <input 
                placeholder="e.g. Leather Front Seat Cover" 
                value={name} 
                onChange={e=>setName(e.target.value)} 
                className="bg-white/5 border border-white/10 hover:border-white/20 focus:border-blue-500 text-white rounded-xl p-3 outline-none transition-all text-sm"
                required 
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 flex items-center gap-1"><FiDollarSign /> Price (E£)</label>
              <input 
                placeholder="0.00" 
                type="number" 
                step="0.01" 
                value={price} 
                onChange={e=>setPrice(e.target.value)} 
                className="bg-white/5 border border-white/10 hover:border-white/20 focus:border-blue-500 text-white rounded-xl p-3 outline-none transition-all text-sm" 
                required 
              />
            </div>

            {/* Stock */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 flex items-center gap-1"><FiLayers /> Stock Quantity</label>
              <input 
                type="number" 
                value={stockQuantity} 
                onChange={e=>setStockQuantity(e.target.value)} 
                className="bg-white/5 border border-white/10 hover:border-white/20 focus:border-blue-500 text-white rounded-xl p-3 outline-none transition-all text-sm" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 flex items-center gap-1"><FiTag /> Category</label>
              <select 
                value={category} 
                onChange={e=>setCategory(e.target.value)} 
                className="bg-white/5 border border-white/10 hover:border-white/20 focus:border-blue-500 text-white rounded-xl p-3 outline-none transition-all text-sm cursor-pointer" 
                required
              >
                <option value="" disabled className="bg-gray-900 text-white">Select Category</option>
                {CATEGORIES.map(group => (
                  <optgroup key={group.group} label={group.group} className="bg-gray-900 text-gray-400">
                    {group.items.map(cat => (
                      <option key={cat} value={cat} className="bg-gray-900 text-white">{cat}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 flex items-center gap-1"><FiList /> Description</label>
              <textarea 
                placeholder="Enter detailed parts description, condition, compatibility specs..." 
                value={description} 
                onChange={e=>setDescription(e.target.value)} 
                className="bg-white/5 border border-white/10 hover:border-white/20 focus:border-blue-500 text-white rounded-xl p-3 outline-none transition-all text-sm" 
                rows="2" 
                required
              ></textarea>
            </div>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-600/20 max-w-[200px]">
            Publish Product
          </button>
        </form>
      </div>

      {/* Published Products */}
      <h3 className="text-2xl font-bold text-white mb-6">My Published Listings</h3>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-400 text-sm">Loading your parts...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="glass-card p-5 rounded-2xl relative border border-white/5 transition-all hover:border-white/10 hover:-translate-y-1">
              <button 
                onClick={() => handleDelete(p.id)} 
                className="absolute top-4 right-4 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-all"
                title="Delete Listing"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
              <h4 className="font-bold text-white text-base pr-12 truncate">{p.name}</h4>
              <p className="text-xs text-blue-400 mt-0.5 font-semibold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 inline-block">
                {p.category}
              </p>
              <p className="font-extrabold text-white text-2xl mt-4 mb-2">
                E£ {p.price ? p.price.toLocaleString(undefined, {minimumFractionDigits: 2}) : "0.00"}
              </p>
              <div className="text-xs text-gray-400 pt-3 border-t border-white/5 flex justify-between">
                <span>Stock: {p.stockQuantity}</span>
                <span>ID: {p.id}</span>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-gray-500 col-span-3 text-center py-12 bg-white/5 border border-dashed border-white/10 rounded-2xl">
              You have not published any products yet. Use the form above to post your first parts catalog item.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
