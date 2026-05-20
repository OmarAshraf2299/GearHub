import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { registerUser } from '../../../utils/authService'
import './signup.css'

const passwordSchema = z.string().refine((val) => {
  // at least 1 lowercase, 1 uppercase, 1 digit, 1 special char
  return (
    /[a-z]/.test(val) &&
    /[A-Z]/.test(val) &&
    /[0-9]/.test(val) &&
    /[^A-Za-z0-9]/.test(val)
  );
}, { message: "Password must include lowercase, uppercase, number, and special character" });

function Signup() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('customer');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // const repassword = e.target.repassword.value;

    // if (password !== repassword) {
    //   setErrorMsg("password and repassword do not match!");
    //   return;
    // }

    // Validate the password using Zod schema
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      setErrorMsg(result.error?.errors?.[0]?.message || "Invalid password");
      return;
    }

    try {
      // Create user with the selected role
      await registerUser(username, email, password, userType.toUpperCase());
      
      setErrorMsg('');
      // Redirect to login after successful signup
      navigate('/login');
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setErrorMsg("Cannot connect to server. Please try again later.");
      } else {
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <div className="login-page flex flex-col items-center min-h-[75vh]">
      <h2 className="text-3xl font-bold mb-5 text-black">Create an Account</h2>
      
      {errorMsg && <p className="text-red-500 font-bold mb-4 bg-red-100 p-2 rounded w-80 text-center">{errorMsg}</p>}

      <form className="form-login flex flex-col gap-4 w-80" onSubmit={handleSignup}>
        
        {/* <div className="flex gap-4">
          <div className="first-name flex flex-col gap-2 w-1/2">
            <label htmlFor="firstName" className="label-input text-white font-semibold text-sm">First Name</label>
            <input 
              id="firstName"
              type="text" 
              placeholder="First Name" 
              className="input-box border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-800" 
              required 
            />
          </div>
          <div className="last-name flex flex-col gap-1 w-1/2">
            <label htmlFor="lastName" className="label-input text-white font-semibold text-sm">Last Name</label>
            <input 
              id="lastName"
              type="text" 
              placeholder="Last Name" 
              className="input-box border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-800" 
              required 
            />
          </div>
        </div> */}

        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="label-input text-black font-semibold text-sm">Username</label>
          <input 
            id="username"
            name="username"
            type="text" 
            placeholder="Username" 
            className="input-box border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-800" 
            required 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="label-input text-black font-semibold text-sm">Email</label>
          <input 
            id="email"
            name="email"
            type="email" 
            placeholder="Email Address" 
            className="input-box border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-800" 
            required 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="label-input text-black font-semibold text-sm">Password</label>
          <input 
            id="password"
            name="password"
            type="password" 
            placeholder="Password" 
            className="input-box border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-800" 
            required 
            minLength="8"
          />
        </div>

        {/* <div className="flex flex-col gap-1">
          <label htmlFor="repassword" className="label-input text-white font-semibold text-sm">Re-enter Password</label>
          <input 
            id="repassword"
            name="repassword"
            type="password" 
            placeholder="Confirm Password" 
            className="input-box border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-800" 
            required 
          />
          {errorMsg && <span className="errortext text-red-500 text-sm font-bold mt-1 shadow-sm">{errorMsg}</span>}
        </div> */}

        <div className="radio-btn flex flex-col gap-5 mt-2">
          <span className="label-input text-black font-semibold text-sm">Account Type</span>
          <div className="radio-group flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-black">
              <input 
                type="checkbox" 
                name="userType_customer" 
                value="customer"
                checked={userType === 'customer'}
                onChange={() => setUserType('customer')}
                className="w-4 h-4 cursor-pointer  accent-blue-400"
              />
              Customer
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-black">
              <input 
                type="checkbox" 
                name="userType_trader" 
                value="trader"
                checked={userType === 'trader'}
                onChange={() => setUserType('trader')}
                className="w-4 h-4 cursor-pointer accent-blue-400"
              />
              Trader
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className="login-btn">
          Sign Up
        </button>
      </form>

      <p className="foot-signup mt-6 text-sm text-black font-medium ">
        Already have an account? <Link to="/login" className="underline font-bold text-violet-500 hover:text-violet-300">Login</Link>
      </p>
    </div>
  )
}

export default Signup









