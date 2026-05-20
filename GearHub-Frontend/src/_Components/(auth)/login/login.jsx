import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../utils/authService'
import './login.css'

function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.emailOrUsername.value;
    const password = e.target.password.value;

    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      setErrorMsg('');
      navigate('/');
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setErrorMsg("Cannot connect to server. Please try again later.");
      } else {
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <div className="login-page flex flex-col items-center  min-h-[75vh]">
      <h2 className="text-3xl font-bold mb-6 text-black">Login</h2>
      
      {errorMsg && <p className="text-red-500 font-bold mb-4 bg-red-100 p-2 rounded w-80 text-center">{errorMsg}</p>}

      <form className="form-login flex flex-col gap-4 w-80 " onSubmit={handleLogin}>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="emailOrUsername" className="label-input text-black font-semibold text-sm">Email or Username</label>
          <input 
            id="emailOrUsername"
            name="emailOrUsername"
            type="text" 
            placeholder="Email or Username" 
            className="input-box border rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-800" 
            required 
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className=" label-input text-black font-semibold text-sm">Password</label>
          <input 
            id="password"
            name="password"
            type="password" 
            placeholder="Password" 
            className="input-box border  rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-800" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="login-btn">
          Login
        </button>
      </form>

      <p className="mt-6 text-sm text-black font-medium">
        Don't have an account? <Link to="/signup" className="underline font-bold text-violet-500 hover:text-shadow-violet-100">Create account</Link>
      </p>
    </div>
  )
}

export default Login