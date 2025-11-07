import React from "react";
import styles from "./Footer.module.css";

// PUBLIC_INTERFACE
export default function Footer() {
  /** App footer with simple copyright notice. */
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span>© {year} Book Store</span>
      </div>
    </footer>
  );
}
