import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

// PUBLIC_INTERFACE
export default function Header() {
  /** App header with navigation across core routes. */
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">📚</span>
          <span className={styles.title}>Book Store</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : styles.link}>Home</NavLink>
          <NavLink to="/catalog" className={({ isActive }) => isActive ? styles.active : styles.link}>Catalog</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? styles.active : styles.link}>Cart</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? styles.active : styles.link}>Profile</NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : styles.link}>Login</NavLink>
        </nav>
      </div>
    </header>
  );
}
