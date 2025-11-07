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
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', display:'inline-flex', alignItems:'center', gap:8 }}>
              <span aria-hidden="true" style={{
                display:'inline-block',
                width:36, height:24,
                backgroundImage:'url(/assets/home.png)',
                backgroundSize:'contain',
                backgroundRepeat:'no-repeat',
                backgroundPosition:'left center'
              }} />
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
