import React from 'react';
import { Button } from '../components/UI.jsx';
import '../styles/php-theme.css';

// PUBLIC_INTERFACE
export default function Checkout() {
  /** Checkout summary page approximating PHP checkout.php tables */
  const items = [
    { id: 'B-001', title: 'Lonely Planet Australia (Travel Guide)', image: '/assets/travel.jpg', price: 136, qty: 1, total: 136 },
    { id: 'B-004', title: 'Easy Vegetarian Slow Cooker Cookbook', image: '/assets/food.jpg', price: 75.9, qty: 2, total: 151.8 },
  ];
  const total = items.reduce((s, i) => s + i.total, 0);

  return (
    <blockquote>
      <div className="container">
        <h2 style={{ color: '#000', marginTop: 0 }}>Order Summary</h2>
        <table style={{ width: '100%' }}>
          <thead>
            <tr><th>Item</th><th>Details</th></tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id}>
                <td style={{ borderTop: '2px solid #ccc' }}>
                  <img src={i.image} alt={i.title} width="20%" />
                </td>
                <td style={{ borderTop: '2px solid #ccc' }}>
                  {i.title}<br />
                  RM{i.price}<br />
                  Quantity: {i.qty}<br />
                  Total Price: RM{i.total.toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td style={{ backgroundColor: '#ccc' }}></td>
              <td style={{ textAlign: 'right', backgroundColor: '#ccc' }}>
                Total Price: <b>RM{total.toFixed(2)}</b>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button className="cbtn" onClick={() => history.back()}>Continue Shopping</Button>
          <Button className="button" onClick={() => alert('Order Placed (stub)')}>Place Order</Button>
        </div>
      </div>
    </blockquote>
  );
}
