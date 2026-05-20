import { useEffect, useState } from "react";
import { getProducts } from "./ProductsApi";
import api from "../../utils/api";
import "./Products.css";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts("")
            .then((data) => {
                console.log("API Response:", data);
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setProducts([]);
            });
    }, []);

    const handleAddToCart = async (productId) => {
        try {
            await api.post('/cart/items', { productId, quantity: 1 });
            // Removed alert as requested
        } catch (e) {
            console.error(e.message || 'Failed to add to cart. Are you logged in?');
        }
    };

    const getImageForCategory = (category, name) => {
        const cat = (category || '').toLowerCase();
        const n = (name || '').toLowerCase();
        
        if (cat.includes('seat') || n.includes('seat')) return "https://images.unsplash.com/photo-1603513470760-49666dd9d560?auto=format&fit=crop&w=600&q=80";
        if (cat.includes('bumper') || n.includes('bumper')) return "https://images.unsplash.com/photo-1594043912165-27a3c31ff7ec?auto=format&fit=crop&w=600&q=80";
        if (cat.includes('engine') || n.includes('engine') || cat.includes('HVAC')) return "https://images.unsplash.com/photo-1625902047385-d6d7ac616147?auto=format&fit=crop&w=600&q=80";
        if (cat.includes('wheel') || cat.includes('tire') || n.includes('wheel')) return "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80";
        if (cat.includes('light') || n.includes('light')) return "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80";
        if (cat.includes('mirror') || n.includes('mirror')) return "https://images.unsplash.com/photo-1550346049-74d4df0ee8e6?auto=format&fit=crop&w=600&q=80";
        if (cat.includes('dashboard') || cat.includes('interior') || n.includes('interior')) return "https://images.unsplash.com/photo-1629897048514-3dd74142fbce?auto=format&fit=crop&w=600&q=80";
        
        return "https://images.unsplash.com/photo-1503376760359-f2e152d192f1?auto=format&fit=crop&w=600&q=80"; // Default auto parts
    }

    const hasProducts = Array.isArray(products) && products.length > 0;

    return (
        <div className="products-page">
            <div className="products-page__inner">
                <header className="products-page__header">
                    <h1 className="products-page__title">All Products</h1>
                    <p className="products-page__subtitle">
                        {hasProducts
                            ? `${products.length} item${products.length === 1 ? "" : "s"} available`
                            : "Browse our catalog of parts and accessories"}
                    </p>
                </header>

                <div className={`products-grid${!hasProducts ? " products-grid--empty" : ""}`}>
                    {hasProducts ? (
                        products.map((product, index) => (
                            <article key={product.id || index} className="products-card">
                                <div className="products-card__image-wrap">
                                    <img
                                        src={
                                            product.image ||
                                            product.imageUrl ||
                                            getImageForCategory(product.category, product.name)
                                        }
                                        alt={product.name || "Product"}
                                    />

                                    <button
                                        type="button"
                                        aria-label="Add to favorites"
                                        className="products-card__favorite"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            width={18}
                                            height={18}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="products-card__body">
                                    <div className="products-card__top">
                                        <h3 className="products-card__name">
                                            {product.name || "Product Name"}
                                        </h3>

                                        {product.category && (
                                            <span className="products-card__category">
                                                {product.category}
                                            </span>
                                        )}
                                    </div>

                                    <p className="products-card__brand">
                                        {product.brand || "Brand"}
                                        {product.model ? `, ${product.model}` : ""}
                                    </p>

                                    <div className="products-card__meta">
                                        <span>
                                            Part No: {product.partNumber || product.id || "N/A"}
                                        </span>
                                        <span className="products-card__stock">
                                            {product.stockQuantity ?? 10} in stock
                                        </span>
                                    </div>

                                    <div className="products-card__footer">
                                        <button type="button" className="products-card__cart-btn" onClick={() => handleAddToCart(product.id)}>
                                            Add Cart
                                        </button>

                                        <p className="products-card__price">
                                            E£
                                            {product.price
                                                ? Number(product.price).toFixed(2)
                                                : "0.00"}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="products-empty">
                            <p className="products-empty__title">No products found</p>
                            <p className="products-empty__text">
                                Check back later or adjust your search filters.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

