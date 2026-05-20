import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

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

  const loadProducts = async () => {
    try {
      const data = await api.get('/products/mine');
      setProducts(data);
    } catch(e) {
      console.error(e);
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
      setName(''); setPrice(''); setDescription(''); setCategory('');
      loadProducts();
    } catch (e) {
      alert(e.message || 'Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Delete product?')) return;
    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (e) {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-6">Trader Dashboard</h2>
      
      <div className="bg-gray-100 p-6 rounded mb-8 shadow">
        <h3 className="text-xl font-bold mb-4">Add New Product</h3>
        <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input placeholder="Product Name" value={name} onChange={e=>setName(e.target.value)} className="border p-2 flex-grow" required />
            <input placeholder="Price" type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} className="border p-2 w-32 rounded" required />
            <select value={category} onChange={e=>setCategory(e.target.value)} className="border p-2 w-48 rounded bg-white" required>
              <option value="" disabled>Select Category</option>
              {CATEGORIES.map(group => (
                <optgroup key={group.group} label={group.group}>
                  {group.items.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </optgroup>
              ))}
            </select>
            <input title="Stock Quantity" type="number" value={stockQuantity} onChange={e=>setStockQuantity(e.target.value)} className="border p-2 w-32 rounded" required />
          </div>
          <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="border p-2 w-full" rows="3" required></textarea>
          <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-700 w-48 rounded">Publish Product</button>
        </form>
      </div>

      <h3 className="text-2xl font-bold mb-4">My Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
            <div key={p.id} className="border p-4 bg-white rounded shadow relative">
                <button onClick={() => handleDelete(p.id)} className="absolute top-2 right-2 text-red-500 font-bold px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-xs">Delete</button>
                <h3 className="font-bold text-lg pr-12 truncate">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{p.category}</p>
                <p className="font-bold text-xl mb-2">${p.price.toFixed(2)}</p>
                <p className="text-sm">Stock: {p.stockQuantity}</p>
            </div>
        ))}
        {products.length === 0 && <p className="text-gray-500 col-span-3">You have not published any products.</p>}
      </div>
    </div>
  );
}


