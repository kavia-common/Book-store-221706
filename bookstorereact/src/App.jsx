import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getTheme } from './theme';
import Layout from './components/Layout.jsx';
import { Button } from './components/UI.jsx';

// Route components
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import Orders from './pages/Orders.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Checkout from './pages/Checkout.jsx';
import BookDetail from './pages/BookDetail.jsx';

// PUBLIC_INTERFACE
export default function App() {
  /** Root application wrapped in shared Layout to mirror PHP styling. */
  getTheme(); // theme consumed by css vars

  // In a future task this will be driven by auth state.
  const isLoggedIn = false;
  const navigate = useNavigate();

  const rightActions = isLoggedIn ? (
    <>
      <Button className="hi" onClick={() => navigate('/profile')}>Edit Profile</Button>
      <Button className="hi" onClick={() => alert('Logout (stub)')}>Logout</Button>
    </>
  ) : (
    <>
      <Button className="hi" onClick={() => navigate('/register')}>Register</Button>
      <Button className="hi" onClick={() => navigate('/login')}>Login</Button>
    </>
  );

  return (
    <Layout rightActions={rightActions}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:bookId" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
