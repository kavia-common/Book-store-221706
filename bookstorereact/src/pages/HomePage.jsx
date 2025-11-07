import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function HomePage() {
  /** Landing page with quick links and TODOs for PHP backend integration. */
  return (
    <section>
      <h1>Welcome to the Book Store</h1>
      <p>
        Browse our collection of books and add your favorites to the cart.
      </p>
      <p>
        TODO: Integrate featured books endpoint from PHP backend.
      </p>
      <p>
        Get started: <Link to="/catalog">Go to Catalog</Link>
      </p>
    </section>
  );
}
