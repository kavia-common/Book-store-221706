import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { getTheme } from './theme';
import Layout from './components/Layout.jsx';
import { Button } from './components/UI.jsx';

// Route components
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import Orders from './pages/Orders.jsx';

// PUBLIC_INTERFACE
export default function App() {
  /** Root application wrapped in shared Layout to mirror PHP styling. */
  getTheme(); // theme consumed by css vars

  // In a future task this will be driven by auth state.
  const isLoggedIn = false;

  const rightActions = isLoggedIn ? (
    <>
      <Button className="hi" onClick={() => alert('Edit Profile (stub)')}>Edit Profile</Button>
      <Button className="hi" onClick={() => alert('Logout (stub)')}>Logout</Button>
    </>
  ) : (
    <>
      <Button className="hi" onClick={() => alert('Register (stub)')}>Register</Button>
      <Button className="hi" onClick={() => alert('Login (stub)')}>Login</Button>
    </>
  );

  return (
    <Layout rightActions={rightActions}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
