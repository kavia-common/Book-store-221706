import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Layout({ children }) {
  const { user, logout, loading } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((s, it) => s + (it.quantity || 0), 0);

  return (
    <>
      <header className="header">
        <div className="row">
          <div className="brand"><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Book Store</Link></div>
          <nav className="nav">
            <Link to="/cart" className="small" style={{ color:'#fff' }}>Cart ({cartCount})</Link>
            {loading ? (
              <span className="small">Loading...</span>
            ) : user ? (
              <>
                <Link to="/profile" className="small" style={{ color:'#fff' }}>{user.username || 'Profile'}</Link>
                <button className="btn secondary" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="small" style={{ color:'#fff' }}>Login</Link>
                <Link to="/register" className="small" style={{ color:'#fff' }}>Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
    </>
  );
}
