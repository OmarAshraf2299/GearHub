import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiTruck, FiShield, FiAward, FiClock } from 'react-icons/fi';
import './Homepage.css';

import popularSearch1 from '../../assets/brand-toyota-1716782448.webp';
import popularSearch2 from '../../assets/brand-nissan.webp';
import popularSearch3 from '../../assets/brand-hyundai.webp';
import popularSearch4 from '../../assets/brand-honda.webp';
import popularSearch5 from '../../assets/brand-ford.webp';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  };

  const handleBrandClick = (brandName) => {
    navigate(`/products?search=${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Engineered for <span className="gradient-text">Performance</span>
          </h1>
          <p className="hero-description">
            Discover a premium catalog of auto parts and accessories. Secure sourcing, competitive pricing, and swift nationwide shipping to keep you on the road.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="search-form-container">
            <div className="search-input-wrapper">
              <FiSearch className="search-input-icon" />
              <input
                type="text"
                placeholder="Search for parts, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button type="submit" className="search-submit-btn">
              Search Parts
            </button>
          </form>
        </div>

        {/* Popular Brand Buttons */}
        <div className="popular-brands-bar">
          <h3 className="popular-brands-title">Shop Parts by Top Brands</h3>
          <div className="brands-grid">
            <button onClick={() => handleBrandClick('Toyota')} className="brand-card">
              <img src={popularSearch1} alt="Toyota Parts" className="brand-logo" />
              <span className="brand-name">Toyota</span>
            </button>
            <button onClick={() => handleBrandClick('Nissan')} className="brand-card">
              <img src={popularSearch2} alt="Nissan Parts" className="brand-logo" />
              <span className="brand-name">Nissan</span>
            </button>
            <button onClick={() => handleBrandClick('Ford')} className="brand-card">
              <img src={popularSearch5} alt="Ford Parts" className="brand-logo" />
              <span className="brand-name">Ford</span>
            </button>
            <button onClick={() => handleBrandClick('Hyundai')} className="brand-card">
              <img src={popularSearch3} alt="Hyundai Parts" className="brand-logo" />
              <span className="brand-name">Hyundai</span>
            </button>
            <button onClick={() => handleBrandClick('Honda')} className="brand-card">
              <img src={popularSearch4} alt="Honda Parts" className="brand-logo" />
              <span className="brand-name">Honda</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <FiTruck className="feature-icon" />
            </div>
            <h4 className="feature-title">Fast Shipping</h4>
            <p className="feature-desc">Reliable, rapid shipping across the country directly to your doorstep.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <FiShield className="feature-icon" />
            </div>
            <h4 className="feature-title">Secure Checkouts</h4>
            <p className="feature-desc">Encrypted transactions ensuring your financial and personal data is safe.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <FiAward className="feature-icon" />
            </div>
            <h4 className="feature-title">OEM Quality</h4>
            <p className="feature-desc">All products are sourced from verified manufacturers to guarantee fits.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <FiClock className="feature-icon" />
            </div>
            <h4 className="feature-title">24/7 Support</h4>
            <p className="feature-desc">Get assistance with order issues or parts compatibility matching.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-card">
          <div className="glow-circle glow-circle-1"></div>
          <div className="glow-circle glow-circle-2"></div>
          <h2 className="about-title">Welcome to GearHub</h2>
          <h3 className="about-subtitle">Your Trusted Destination for Quality Auto Parts</h3>
          <div className="about-text-content">
            <p>
              At GearHub, we take pride in connecting car enthusiasts, mechanics, and daily drivers with premium automotive parts and accessories. Find exactly what you need by part name, category, or manufacturer.
            </p>
            <p>
              Whether you are tuning your suspension, replacing body panels, or upgrading your interior — drive with confidence knowing GearHub stands behind quality, speed, and exceptional service.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;