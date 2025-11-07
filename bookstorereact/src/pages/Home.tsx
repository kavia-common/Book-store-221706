import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Home(): JSX.Element {
  /** Health check landing page with links to placeholder routes. */
  return (
    <section>
      <h1>Health: OK</h1>
      <p>If you can see this page, the React frontend is running.</p>
      <ul>
        <li><Link to="/login">Go to Login</Link></li>
        <li><Link to="/register">Go to Register</Link></li>
        <li><Link to="/catalog">Go to Catalog</Link></li>
        <li><Link to="/cart">Go to Cart</Link></li>
        <li><Link to="/orders">Go to Orders</Link></li>
      </ul>
    </section>
  );
}
