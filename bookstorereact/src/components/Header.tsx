import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { colors } from '../theme/colors';

// PUBLIC_INTERFACE
export function Header(): JSX.Element {
  /** A classic header bar using react-router-dom (Link/NavLink) for client-side navigation. */
  return (
    <header
      style={{
        width: '100%',
        backgroundColor: colors.primary,
        color: colors.accent,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
        }}
      >
        <Link to="/" style={{ color: colors.accent, fontWeight: 700, fontSize: 18 }}>
          Book Store
        </Link>
        <nav style={{ display: 'flex', gap: 16 }}>
          <NavItem to="/" label="Home" />
          <NavItem to="/catalog" label="Catalog" />
          <NavItem to="/cart" label="Cart" />
          <NavItem to="/orders" label="Orders" />
          <NavItem to="/login" label="Login" />
          <NavItem to="/register" label="Register" />
        </nav>
      </div>
    </header>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        color: isActive ? colors.secondary : colors.accent,
        fontWeight: isActive ? 700 : 500,
      })}
    >
      {label}
    </NavLink>
  );
}

export default Header;
