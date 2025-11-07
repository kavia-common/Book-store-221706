import React, { useState } from 'react';
import { Button } from '../components/UI.jsx';
import '../styles/php-theme.css';

// PUBLIC_INTERFACE
export default function Cart() {
  /** Cart page using the same visual style as the sidebar summary in PHP. */
  const [items, setItems] = useState([
    { id: 'B-004', title: 'Easy Vegetarian Slow Cooker Cookbook', image: '/assets/food.jpg', price: 75.9, qty: 1 }
  ]);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <blockquote>
      <table style={{ width: '40%', margin: '0 auto' }}>
        <thead>
          <tr><th>Cart</th></tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td>
                <img src={i.image} alt={i.title} style={{ width: '20%' }} /><br />
                {i.title}<br />
                RM{i.price}<br />
                Quantity: {i.qty}<br />
                Total Price: RM{(i.price * i.qty).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <td style={{ textAlign: 'right', backgroundColor: '#f2f2f2' }}>
              Total: <b>RM{total.toFixed(2)}</b>
              <center>
                <Button className="button" onClick={() => alert('Checkout (stub)')}>CHECKOUT</Button>
              </center>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <Button className="cbtn" onClick={() => setItems([])}>Empty Cart</Button>
      </div>
    </blockquote>
  );
}
