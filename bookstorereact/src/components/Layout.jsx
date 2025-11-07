import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

/**
 * Layout replicates the PHP header markup and classes for pixel-accurate styling.
 * Uses:
 *  - header > blockquote containing logo and right-aligned actions with .hf and .hi classes
 *  - main content is rendered directly after header (PHP uses blockquote wrappers)
 */
export default function Layout({ children }) {
  const { user, logout, loading } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((s, it) => s + (it.quantity || 0), 0);
  const location = useLocation();

  return (
    <>
      <header>
        <blockquote>
          <Link to="/"><img src="/assets/logo.png" alt="Logo" /></Link>
          {/* Right actions like PHP header .hf .hi */}
          <form className="hf" onSubmit={(e)=>e.preventDefault()}>
            <Link to="/cart" className="hi" style={{ textDecoration:'none' }}>Cart ({cartCount})</Link>
          </form>
          {loading ? (
            <form className="hf" onSubmit={(e)=>e.preventDefault()}>
              <button className="hi" disabled>Loading...</button>
            </form>
          ) : user ? (
            <>
              <form className="hf" onSubmit={(e)=>{ e.preventDefault(); logout(); }}>
                <button className="hi" type="submit">Logout</button>
              </form>
              <form className="hf" onSubmit={(e)=>e.preventDefault()}>
                <button className="hi" type="button">{user.username || 'Profile'}</button>
              </form>
            </>
          ) : (
            <>
              <form className="hf" onSubmit={(e)=>e.preventDefault()}>
                <Link to="/signup" className="hi" style={{ textDecoration:'none' }}>Register</Link>
              </form>
              <form className="hf" onSubmit={(e)=>e.preventDefault()}>
                <Link to="/login" className="hi" style={{ textDecoration:'none' }} state={{ from: location.pathname }}>Login</Link>
              </form>
            </>
          )}
        </blockquote>
      </header>
      {/* Mimic PHP structure: wrap main content in blockquote for consistent spacing */}
      <blockquote>
        {children}
      </blockquote>
    </>
  );
}
