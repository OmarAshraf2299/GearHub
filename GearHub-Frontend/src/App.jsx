import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './_Components/Navbar/Navbar'
import HomePage from './_Components/HomePage/Home'
import Footer from './_Components/Footer/Footer'
import Login from './_Components/(auth)/login/login.jsx'
import Signup from './_Components/(auth)/signup/signup.jsx'
import Products from './_Components/Products/Products'
import TraderPanel from './_Components/Trader/TraderPanel.jsx'
import Orders from './_Components/Orders/Orders.jsx'
import Cart from './_Components/Cart/Cart.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/trader" element={<TraderPanel />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App