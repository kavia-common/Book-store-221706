import React from "react";
import styles from "./BookCard.module.css";

// PUBLIC_INTERFACE
export default function BookCard({ book, onAddToCart }) {
  /**
   * Renders a single book card.
   * book: { id, title, author, price, image }
   */
  const { title, author, price, image } = book;
  return (
    <article className={styles.card}>
      <div className={styles.thumb} role="img" aria-label={title}>
        {image ? <img src={image} alt={title} /> : <div className={styles.placeholder} />}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.meta}>{author}</p>
        <div className={styles.row}>
          <span className={styles.price}>${price?.toFixed?.(2) ?? "0.00"}</span>
          <button className={styles.btn} onClick={() => onAddToCart?.(book)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
