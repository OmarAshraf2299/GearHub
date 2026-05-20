import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../utils/authService'
import './Navbar.css'
import logo from '../../assets/logo-parts.webp'

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!token;

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <>
    <div className='navbar '>
      <ul className='logo-list flex items-center gap-2'>
        <li>
          <Link to="/"><img src={logo} alt='logo' className='logo' /></Link>
        </li>
        <li className='logo-text '>
          <span >Gear <span className='logo-red '>Hub </span></span>
          <span className='logo-subtext'>Auto Parts and Accessories</span>
        </li>
      </ul>

      <ul className='nav-links items-center'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">All Products</Link></li>
        {isLoggedIn ? (
          <>
            {user.role === 'TRADER' && <li><Link to="/trader">Trader Panel</Link></li>}
            {user.role === 'ADMIN' && <li><Link to="/trader">Admin Panel</Link></li>}
            <li><Link to="/orders">Orders</Link></li>
            {user.role !== 'TRADER' && <li><Link to="/cart">Cart</Link></li>}
            <li>
              <button onClick={handleLogout} className="text-black hover:text-gray-700">Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
    <div className='companies'>

    <div className='companies-navbar '>
        <ul className='companies-list'>

    <li>
    <Link to="/products">Interior</Link>
    </li>
    <li>
    <Link to="/products">Exterior</Link>
    </li>
    <li>
    <Link to="/products">Body Panels</Link>
    </li>
    <li>
    <Link to="/products">Wheels & Tires</Link>
    </li>
    <li>
    <Link to="/products">Lighting</Link>
    </li>
    <li>
    <Link to="/products">HVAC</Link>
    </li>

        </ul>

    </div>

</div>
    
    
    
    
    </>
    
    
  )
}

export default Navbar 













