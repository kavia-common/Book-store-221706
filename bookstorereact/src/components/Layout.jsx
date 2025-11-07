import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/php-theme.css';

// PUBLIC_INTERFACE
export default function Layout({ children, rightActions }) {
  /**
   * Layout component rendering header, left nav, and content area,
   * visually aligned with the PHP reference (logo, buttons, colors).
   */
  return (
    <div className="layout">
      <header className="layout__header header" role="banner">
        <div className="header__inner">
          <a className="header__logo" href="/">
            <img src="/assets/logo.png" alt="Logo" height="40" />
          </a>
          <div className="header__actions">
            {rightActions}
          </div>
        </div>
      </header>

      <nav className="layout__sidebar nav-rail" aria-label="Primary">
        <NavItem to="/" label="Home" end />
        <NavItem to="/catalog" label="Catalog" />
        <NavItem to="/cart" label="Cart" />
        <NavItem to="/profile" label="Profile" />
        <NavItem to="/orders" label="Orders" />
      </nav>

      <main className="layout__content" role="main">
        <div className="card">
          {children}
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
      className={({ isActive }) => (isActive ? 'active' : undefined)}
      aria-label={label}
    >
      {label}
    </NavLink>
  );
}
