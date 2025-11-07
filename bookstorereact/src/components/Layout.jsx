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
          <div className="brand">
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
              {/* Simple logo mark to mimic PHP header logo spacing */}
              <span style={{
                display:'inline-block',
                width:28, height:28, borderRadius:'50%',
                background:'rgba(255,255,255,0.2)',
                verticalAlign:'middle', marginRight:8
              }}/>
              <span>Book Store</span>
            </Link>
          </div>
          <nav className="nav">
            <Link to="/cart" className="small" style={{ color:'#fff' }}>Cart ({cartCount})</Link>
            {loading ? (
              <span className="small">Loading...</span>
            ) : user ? (
              <>
                <Link to="/profile" className="small" style={{ color:'#fff' }}>{user.username || 'Profile'}</Link>
                <button className="btn" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn" style={{ textDecoration:'none' }}>Login</Link>
                <Link to="/signup" className="btn secondary" style={{ textDecoration:'none' }}>Sign up</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
    </>
  );
}
