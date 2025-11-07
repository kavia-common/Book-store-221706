import React, { useCallback, useState } from "react";
import BookList from "../components/BookList";

// PUBLIC_INTERFACE
export default function CatalogPage() {
  /** Catalog page rendering a placeholder list of books. */
  const [cart, setCart] = useState([]);
  const books = [
    { id: "B-001", title: "Lonely Planet Australia", author: "Lonely Planet", price: 136, image: "" },
    { id: "B-002", title: "Crew Resource Management", author: "Barbara Kanki", price: 599, image: "" },
    { id: "B-003", title: "CCNA Official Cert Guide", author: "Cisco Press", price: 329, image: "" },
    { id: "B-004", title: "Vegetarian Slow Cooker", author: "Rockridge Press", price: 75.9, image: "" }
  ];

  const handleAddToCart = useCallback((book) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === book.id);
      if (existing) {
        return prev.map((i) => (i.id === book.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: book.id, title: book.title, price: book.price, qty: 1 }];
    });
  }, []);

  // TODO: replace local cart with global state or context; wire to backend cart endpoints.
  return (
    <section>
      <h1>Catalog</h1>
      <p>Explore our curated selection of books. TODO: Replace with API-driven list.</p>
      <BookList books={books} onAddToCart={handleAddToCart} />
      <p style={{ marginTop: 12 }}>
        Items in cart (local state): {cart.reduce((s, i) => s + i.qty, 0)}
      </p>
    </section>
  );
}
