import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../../utils/authService';
import { FiHome, FiShoppingBag, FiShoppingCart, FiInbox, FiSettings, FiLogOut, FiUser } from 'react-icons/fi';
import './Navbar.css';
import logo from '../../assets/logo-parts.webp';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  const isLoggedIn = !!token;

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <header className="navbar-container">
      {/* Main Nav Bar */}
      <div className="navbar-glass">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <div className="logo-wrapper">
            <img src={logo} alt="GearHub Logo" className="logo-img" />
          </div>
          <div className="brand-text">
            <span className="brand-main">Gear<span className="brand-highlight">Hub</span></span>
            <span className="brand-sub">Auto Parts &amp; Accessories</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <Link to="/" className="nav-link">
            <FiHome className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/products" className="nav-link">
            <FiShoppingBag className="nav-icon" />
            <span>All Products</span>
          </Link>

          {isLoggedIn ? (
            <>
              {(user.role === 'TRADER' || user.role === 'ADMIN') && (
                <Link to="/trader" className="nav-link nav-link--dashboard">
                  <FiSettings className="nav-icon" />
                  <span>{user.role === 'ADMIN' ? 'Admin Panel' : 'Trader Panel'}</span>
                </Link>
              )}
              <Link to="/orders" className="nav-link">
                <FiInbox className="nav-icon" />
                <span>Orders</span>
              </Link>
              {user.role !== 'TRADER' && (
                <Link to="/cart" className="nav-link">
                  <FiShoppingCart className="nav-icon" />
                  <span>Cart</span>
                </Link>
              )}

              {/* User Profile */}
              <div className="user-profile-nav">
                <div className="avatar-circle">
                  {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-info">
                  <span className="user-name">{user.username || 'User'}</span>
                  <span className="user-role-badge">{user.role}</span>
                </div>
                <button onClick={handleLogout} title="Logout" className="logout-btn">
                  <FiLogOut />
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="login-nav-btn">
              <FiUser className="nav-icon" />
              <span>Login / Register</span>
            </Link>
          )}
        </nav>
      </div>

      {/* Sub-categories bar — hidden on auth pages */}
      {!isAuthPage && (
        <div className="sub-navbar">
          <div className="sub-navbar-inner">
            <Link to="/products" className="sub-nav-link">Interior</Link>
            <Link to="/products" className="sub-nav-link">Exterior</Link>
            <Link to="/products" className="sub-nav-link">Body Panels</Link>
            <Link to="/products" className="sub-nav-link">Wheels &amp; Tires</Link>
            <Link to="/products" className="sub-nav-link">Lighting</Link>
            <Link to="/products" className="sub-nav-link">HVAC</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
