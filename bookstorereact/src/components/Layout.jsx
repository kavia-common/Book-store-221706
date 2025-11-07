import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import '../styles/php-theme.css';

// PUBLIC_INTERFACE
export default function Layout({ children, rightActions }) {
  /**
   * Layout component rendering header, left nav, and content area,
   * visually aligned with the PHP reference (logo, buttons, colors).
   * Also renders a breadcrumb trail consistent with PHP UI.
   */
  const location = useLocation();
  const crumbs = buildBreadcrumbs(location.pathname);

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
        <NavItem to="/checkout" label="Checkout" />
        <NavItem to="/profile" label="Profile" />
        <NavItem to="/orders" label="Orders" />
        <NavItem to="/login" label="Login" />
        <NavItem to="/register" label="Register" />
      </nav>

      <main className="layout__content" role="main">
        <div className="card">
          {crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
              {crumbs.map((c, idx) =>
                idx < crumbs.length - 1 ? (
                  <span key={c.href}>
                    <Link to={c.href}>{c.label}</Link> {'>'} {' '}
                  </span>
                ) : (
                  <span key={c.href} aria-current="page">{c.label}</span>
                )
              )}
            </nav>
          )}
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

// PUBLIC_INTERFACE
export function buildBreadcrumbs(pathname) {
  /** Builds breadcrumb items from a pathname. */
  if (!pathname || pathname === '/') return [];
  const parts = pathname.split('/').filter(Boolean);
  const items = [];
  let acc = '';
  for (let i = 0; i < parts.length; i++) {
    acc += '/' + parts[i];
    const part = parts[i];
    const label = decodeURIComponent(part)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, s => s.toUpperCase());
    items.push({ href: acc, label });
  }
  return [{ href: '/', label: 'Home' }, ...items];
}
