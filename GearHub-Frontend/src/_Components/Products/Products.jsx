import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "./ProductsApi";
import api from "../../utils/api";
import { FiHeart, FiShoppingCart, FiSearch, FiSliders, FiTag, FiCheckCircle, FiInfo } from "react-icons/fi";
import "./Products.css";

const CATEGORIES = [
  "All Categories",
  "Front Seats", "Seat Covers", "Dashboard Panels", "Steering Wheel",
  "HVAC System", "Headlights", "Side Mirrors", "Alloy Wheels", "Tires", "Roof Rack"
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [favorites, setFavorites] = useState({});
  const [cartStatus, setCartStatus] = useState({});

  useEffect(() => {
    const urlQuery = searchParams.get("search") || "";
    setSearchQuery(urlQuery);
    fetchData(urlQuery);
  }, [searchParams]);

  const fetchData = (query) => {
    setLoading(true);
    getProducts(query)
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchQuery });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === "All Categories") {
      setSearchParams({});
    } else {
      setSearchParams({ search: category });
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      setCartStatus((prev) => ({ ...prev, [productId]: "adding" }));
      await api.post('/cart/items', { productId, quantity: 1 });
      setCartStatus((prev) => ({ ...prev, [productId]: "success" }));
      setTimeout(() => setCartStatus((prev) => ({ ...prev, [productId]: null })), 1500);
    } catch (e) {
      setCartStatus((prev) => ({ ...prev, [productId]: "error" }));
      setTimeout(() => setCartStatus((prev) => ({ ...prev, [productId]: null })), 2000);
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const getImageForCategory = (category, name) => {
    const cat = (category || '').toLowerCase();
    const n = (name || '').toLowerCase();
    if (cat.includes('seat') || n.includes('seat')) return "https://images.unsplash.com/photo-1603513470760-49666dd9d560?auto=format&fit=crop&w=600&q=80";
    if (cat.includes('wheel') || cat.includes('tire') || n.includes('wheel')) return "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80";
    if (cat.includes('light') || n.includes('light')) return "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80";
    if (cat.includes('mirror') || n.includes('mirror')) return "https://images.unsplash.com/photo-1550346049-74d4df0ee8e6?auto=format&fit=crop&w=600&q=80";
    if (cat.includes('dashboard') || cat.includes('interior') || n.includes('interior')) return "https://images.unsplash.com/photo-1629897048514-3dd74142fbce?auto=format&fit=crop&w=600&q=80";
    return "https://images.unsplash.com/photo-1503376760359-f2e152d192f1?auto=format&fit=crop&w=600&q=80";
  };

  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <div className="products-page">
      <div className="products-page__inner">

        {/* Header row */}
        <div className="products-header">
          <div>
            <h1 className="products-page__title">Explore Auto Directory</h1>
            <p className="products-page__subtitle">
              {hasProducts ? `${products.length} parts found` : "Premium OEM and aftermarket components."}
            </p>
          </div>
          <form onSubmit={handleSearchSubmit} className="products-search-bar">
            <FiSearch className="search-bar-icon" />
            <input
              type="text"
              placeholder="Search directory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar-input"
            />
            <button type="submit" className="search-bar-btn">Search</button>
          </form>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="products-layout">

          {/* Sidebar */}
          <aside className="products-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-header">
                <FiSliders className="sidebar-icon" />
                <h2 className="sidebar-title">Filter Catalog</h2>
              </div>
              <h3 className="sidebar-section-label">
                <FiTag /> Categories
              </h3>
              <ul className="category-filter-list">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategorySelect(cat)}
                      className={`category-filter-btn ${selectedCategory === cat ? 'category-filter-btn--active' : ''}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products grid */}
          <main className="products-main">
            {loading ? (
              <div className="products-loading">
                <div className="spinner"></div>
                <p>Loading catalog items...</p>
              </div>
            ) : hasProducts ? (
              <div className="products-grid">
                {products.map((product, index) => {
                  const isFavorited = !!favorites[product.id];
                  const addStatus = cartStatus[product.id];

                  return (
                    <article key={product.id || index} className="products-card">
                      <div className="products-card__image-wrap">
                        <img
                          src={product.image || product.imageUrl || getImageForCategory(product.category, product.name)}
                          alt={product.name || "Product"}
                          loading="lazy"
                        />
                        <div className="image-overlay"></div>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(product.id)}
                          className={`products-card__favorite ${isFavorited ? 'products-card__favorite--active' : ''}`}
                          aria-label="Favourite"
                        >
                          <FiHeart />
                        </button>
                      </div>

                      <div className="products-card__body">
                        <div className="products-card__top">
                          <h3 className="products-card__name">{product.name || "Product Name"}</h3>
                          {product.category && (
                            <span className="products-card__category">{product.category}</span>
                          )}
                        </div>

                        <p className="products-card__brand">
                          {product.brand || "Brand"}
                          {product.model ? ` • ${product.model}` : ""}
                        </p>

                        <div className="products-card__meta">
                          <span>Part: {product.partNumber || product.id || "N/A"}</span>
                          <span className="products-card__stock">
                            <FiCheckCircle /> {product.stockQuantity ?? 10} in stock
                          </span>
                        </div>

                        <div className="products-card__footer">
                          <p className="products-card__price">
                            E£ {product.price ? Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
                          </p>
                          <button
                            type="button"
                            disabled={addStatus === "adding"}
                            className={`products-card__cart-btn ${
                              addStatus === "success" ? "cart-btn--success"
                              : addStatus === "error" ? "cart-btn--error"
                              : ""
                            }`}
                            onClick={() => handleAddToCart(product.id)}
                          >
                            <FiShoppingCart />
                            <span>
                              {addStatus === "adding" ? "Adding..."
                               : addStatus === "success" ? "Added!"
                               : addStatus === "error" ? "Error"
                               : "Add to Cart"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="products-empty">
                <FiInfo className="products-empty__icon" />
                <h3 className="products-empty__title">No Parts Found</h3>
                <p className="products-empty__text">
                  Try adjusting your search query or category filters.
                </p>
              </div>
            )}
          </main>
        </div>

      </div>
    </div>
  );
}
