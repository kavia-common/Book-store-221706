import React, { useState } from "react";
import CartSummary from "../components/CartSummary";

// PUBLIC_INTERFACE
export default function CartPage() {
  /** Cart page showing a placeholder cart and a mock checkout. */
  const [items, setItems] = useState([
    { id: "B-001", title: "Lonely Planet Australia", price: 136, qty: 1 }
  ]);

  const checkout = () => {
    // TODO: Call PHP backend to process checkout.
    alert("Checkout clicked (placeholder).");
    setItems([]);
  };

  return (
    <section>
      <h1>Your Cart</h1>
      <p>TODO: Integrate with backend cart and checkout endpoints.</p>
      <CartSummary items={items} onCheckout={checkout} />
    </section>
  );
}
