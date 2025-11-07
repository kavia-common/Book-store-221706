import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { getTheme } from './theme';

// Route components (placeholders)
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

// PUBLIC_INTERFACE
export default function App() {
  /** Root application layout with header, sidebar nav, and content routes. */
  const { colors } = getTheme();

  return (
    <div className="app-shell" style={{ background: colors.background }}>
      <header className="app-header" role="banner">
        <div className="brand" aria-label="App Brand">
          <span className="dot" aria-hidden="true"></span>
          <span>Book Store</span>
        </div>
        <div className="badge">React Scaffold</div>
      </header>

      <nav className="sidebar" aria-label="Primary">
        <NavItem to="/" label="Home" end />
        <NavItem to="/catalog" label="Catalog" />
        <NavItem to="/cart" label="Cart" />
        <NavItem to="/profile" label="Profile" />
        <NavItem to="/orders" label="Orders" />
      </nav>

      <main className="content" role="main">
        <div className="card">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function NavItem({ to, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => isActive ? 'active' : undefined}
      aria-label={label}
    >
      {label}
    </NavLink>
  );
}
