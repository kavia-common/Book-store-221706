import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Catalog from './pages/Books/Catalog';
import Cart from './pages/Cart/Cart';
import OrdersHistory from './pages/Orders/History';

// PUBLIC_INTERFACE
export default function App(): JSX.Element {
  /** Main app routing and layout. */
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrdersHistory />} />
        </Routes>
      </main>
    </div>
  );
}
