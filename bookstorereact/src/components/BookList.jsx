import React from "react";
import BookCard from "./BookCard";
import styles from "./BookList.module.css";

// PUBLIC_INTERFACE
export default function BookList({ books = [], onAddToCart }) {
  /**
   * Renders a responsive grid of books.
   * Placeholder data can be passed from pages until API is wired.
   */
  return (
    <section className={styles.grid} aria-label="Book catalog">
      {books.map((b) => (
        <BookCard key={b.id || b.title} book={b} onAddToCart={onAddToCart} />
      ))}
    </section>
  );
}
