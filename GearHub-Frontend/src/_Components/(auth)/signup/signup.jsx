import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { registerUser } from '../../../utils/authService';
import { FiUser, FiMail, FiLock, FiUserPlus, FiAlertCircle } from 'react-icons/fi';
import './signup.css';

const passwordSchema = z.string().refine((val) => (
  /[a-z]/.test(val) && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)
), { message: "Password must include uppercase, lowercase, number, and special character" });

function Signup() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('customer');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      setErrorMsg(result.error?.errors?.[0]?.message || "Invalid password");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      await registerUser(username, email, password, userType.toUpperCase());
      navigate('/login');
    } catch (error) {
      setErrorMsg(error.message === "Failed to fetch"
        ? "Cannot connect to server. Please try again later."
        : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="glow-circle glow-circle-1"></div>
        <div className="glow-circle glow-circle-2"></div>

        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join GearHub and get access to the top parts catalog</p>

        {errorMsg && (
          <div className="error-banner">
            <FiAlertCircle className="error-icon" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="form-field">
            <label htmlFor="username" className="auth-label">
              <FiUser /> Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              className="auth-input"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email" className="auth-label">
              <FiMail /> Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              className="auth-input"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password" className="auth-label">
              <FiLock /> Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Min. 8 characters"
              className="auth-input"
              required
              minLength="8"
            />
          </div>

          <div className="form-field">
            <span className="auth-label">
              <FiUser /> Account Type
            </span>
            <div className="account-type-group">
              <button type="button" onClick={() => setUserType('customer')}
                className={`type-btn ${userType === 'customer' ? 'type-btn--active' : ''}`}>
                Customer
              </button>
              <button type="button" onClick={() => setUserType('trader')}
                className={`type-btn ${userType === 'trader' ? 'type-btn--active' : ''}`}>
                Trader
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            <FiUserPlus />
            <span>{loading ? 'Creating Account...' : 'Sign Up'}</span>
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
