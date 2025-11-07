import React from "react";
import styles from "./CartSummary.module.css";

// PUBLIC_INTERFACE
export default function CartSummary({ items = [], onCheckout }) {
  /**
   * Displays a summary of cart items with total amount.
   * items: [{ id, title, price, qty }]
   */
  const total = items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 0), 0);

  return (
    <aside className={styles.panel} aria-label="Cart summary">
      <h3 className={styles.title}>Cart</h3>
      <ul className={styles.list}>
        {items.length === 0 && <li className={styles.empty}>Your cart is empty.</li>}
        {items.map((it, idx) => (
          <li key={it.id || idx} className={styles.item}>
            <span>{it.title}</span>
            <span>x{it.qty}</span>
            <span>${(it.price * it.qty).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className={styles.totalRow}>
        <span>Total</span>
        <strong>${total.toFixed(2)}</strong>
      </div>
      <button className={styles.checkoutBtn} onClick={onCheckout} disabled={items.length === 0}>
        Checkout
      </button>
    </aside>
  );
}
