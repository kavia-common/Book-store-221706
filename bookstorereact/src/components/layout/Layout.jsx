import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";

// PUBLIC_INTERFACE
export default function Layout({ children }) {
  /** Shared layout wrapper that renders the header, main content, and footer. */
  return (
    <div className={styles.appShell}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
