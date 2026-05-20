import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiGithub, FiTwitter, FiInstagram, FiLinkedin,
  FiMail, FiPhone, FiMapPin, FiArrowRight,
  FiTruck, FiShield, FiAward
} from 'react-icons/fi';
import './Footer.css';
import logo from '../../assets/logo-parts.webp';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer-root">
      {/* Top trust badges strip */}
      <div className="footer-trust-strip">
        <div className="footer-trust-inner">
          <div className="footer-trust-item">
            <FiTruck className="trust-icon" />
            <div>
              <span className="trust-label">Free Nationwide Shipping</span>
              <span className="trust-sub">On orders over E£ 500</span>
            </div>
          </div>
          <div className="footer-trust-divider" />
          <div className="footer-trust-item">
            <FiShield className="trust-icon" />
            <div>
              <span className="trust-label">Secure Transactions</span>
              <span className="trust-sub">256-bit SSL encryption</span>
            </div>
          </div>
          <div className="footer-trust-divider" />
          <div className="footer-trust-item">
            <FiAward className="trust-icon" />
            <div>
              <span className="trust-label">OEM-Certified Parts</span>
              <span className="trust-sub">Sourced from verified suppliers</span>
            </div>
          </div>
          <div className="footer-trust-divider" />
          <div className="footer-trust-item">
            <FiMail className="trust-icon" />
            <div>
              <span className="trust-label">24/7 Customer Support</span>
              <span className="trust-sub">Always here to help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="footer-main">
        <div className="footer-main-inner">

          {/* Brand column */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <img src={logo} alt="GearHub Logo" className="footer-logo" />
              <div>
                <span className="footer-brand-name">Gear<span className="footer-brand-red">Hub</span></span>
                <span className="footer-brand-tagline">Auto Parts &amp; Accessories</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Egypt's premier online destination for quality automotive parts. Connecting drivers, mechanics, and enthusiasts with the components they need.
            </p>
            {/* Social links */}
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" className="social-btn" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" className="social-btn" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="#" className="social-btn" aria-label="GitHub"><FiGithub /></a>
            </div>
          </div>

          {/* Navigation column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link"><FiArrowRight className="footer-link-arrow" />Home</Link></li>
              <li><Link to="/products" className="footer-link"><FiArrowRight className="footer-link-arrow" />All Products</Link></li>
              <li><Link to="/cart" className="footer-link"><FiArrowRight className="footer-link-arrow" />Shopping Cart</Link></li>
              <li><Link to="/orders" className="footer-link"><FiArrowRight className="footer-link-arrow" />My Orders</Link></li>
              <li><Link to="/#about" className="footer-link"><FiArrowRight className="footer-link-arrow" />About Us</Link></li>
            </ul>
          </div>

          {/* Categories column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Top Categories</h4>
            <ul className="footer-links">
              <li><Link to="/products" className="footer-link"><FiArrowRight className="footer-link-arrow" />Interior</Link></li>
              <li><Link to="/products" className="footer-link"><FiArrowRight className="footer-link-arrow" />Exterior &amp; Body</Link></li>
              <li><Link to="/products" className="footer-link"><FiArrowRight className="footer-link-arrow" />Wheels &amp; Tires</Link></li>
              <li><Link to="/products" className="footer-link"><FiArrowRight className="footer-link-arrow" />Lighting</Link></li>
              <li><Link to="/products" className="footer-link"><FiArrowRight className="footer-link-arrow" />HVAC System</Link></li>
            </ul>
          </div>

          {/* Contact + Newsletter column */}
          <div className="footer-col">
            <h4 className="footer-col-title">Get in Touch</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <FiMapPin className="footer-contact-icon" />
                <span>Cairo, Egypt</span>
              </li>
              <li className="footer-contact-item">
                <FiPhone className="footer-contact-icon" />
                <span>+20 100 000 0000</span>
              </li>
              <li className="footer-contact-item">
                <FiMail className="footer-contact-icon" />
                <span>support@gearhub.eg</span>
              </li>
            </ul>

            <h4 className="footer-col-title" style={{ marginTop: '1.5rem' }}>Newsletter</h4>
            {subscribed ? (
              <div className="footer-subscribed">
                ✅ You're subscribed! Thanks for joining.
              </div>
            ) : (
              <form className="footer-newsletter" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-newsletter-input"
                  required
                />
                <button type="submit" className="footer-newsletter-btn">
                  <FiArrowRight />
                </button>
              </form>
            )}
            <p className="footer-newsletter-hint">Get deals and new arrivals directly.</p>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="footer-copy">© 2026 GearHub Auto Parts — All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
            <a href="#" className="footer-bottom-link">Shipping Policy</a>
            <a href="#" className="footer-bottom-link">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;