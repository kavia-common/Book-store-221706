import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/UI.jsx';
import '../styles/php-theme.css';

const seedBooks = [
  { BookID: 'B-001', BookTitle: 'Lonely Planet Australia (Travel Guide)', ISBN: '123-456-789-1', Price: 136, Author: 'Lonely Planet', Type: 'Travel', Image: '/assets/travel.jpg' },
  { BookID: 'B-002', BookTitle: 'Crew Resource Management, Second Edition', ISBN: '123-456-789-2', Price: 599, Author: 'Barbara Kanki', Type: 'Technical', Image: '/assets/technical.jpg' },
  { BookID: 'B-003', BookTitle: 'CCNA Routing and Switching 200-125 Official Cert Guide Library', ISBN: '123-456-789-3', Price: 329, Author: 'Cisco Press', Type: 'Technology', Image: '/assets/technology.jpg' },
  { BookID: 'B-004', BookTitle: 'Easy Vegetarian Slow Cooker Cookbook', ISBN: '123-456-789-4', Price: 75.9, Author: 'Rockridge Press', Type: 'Food', Image: '/assets/food.jpg' }
];

// PUBLIC_INTERFACE
export default function Catalog() {
  /** Catalog grid and cart summary, visually mirroring PHP index.php layout. */
  const books = useMemo(() => seedBooks, []);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  function addToCart(book, qty) {
    const q = Math.max(1, parseInt(qty || '1', 10));
    setCart(prev => {
      const existing = prev.find(i => i.BookID === book.BookID);
      if (existing) {
        return prev.map(i => i.BookID === book.BookID ? { ...i, Quantity: i.Quantity + q, TotalPrice: (i.Quantity + q) * i.Price } : i);
      }
      return [...prev, { BookID: book.BookID, BookTitle: book.BookTitle, Image: book.Image, Price: book.Price, Quantity: q, TotalPrice: q * book.Price }];
    });
  }
  function emptyCart() {
    setCart([]);
  }
  const total = cart.reduce((s, i) => s + i.TotalPrice, 0);

  return (
    <blockquote>
      <div style={{ display: 'flex', gap: 16 }}>
        {/* Left: Books grid */}
        <table id="myTable" style={{ width: '80%', float: 'left' }}>
          <tbody>
            <tr>
              {books.map(b => (
                <td key={b.BookID} style={{ verticalAlign: 'top' }}>
                  <table style={{ width: '100%' }}>
                    <tbody>
                      <tr>
                        <td>
                          <Link to={`/catalog/${b.BookID}`}>
                            <img src={b.Image} alt={b.BookTitle} style={{ width: '80%' }} />
                          </Link>
                        </td>
                      </tr>
                      <tr><td style={{ padding: 5 }}>Title: <Link to={`/catalog/${b.BookID}`}>{b.BookTitle}</Link></td></tr>
                      <tr><td style={{ padding: 5 }}>ISBN: {b.ISBN}</td></tr>
                      <tr><td style={{ padding: 5 }}>Author: {b.Author}</td></tr>
                      <tr><td style={{ padding: 5 }}>Type: {b.Type}</td></tr>
                      <tr><td style={{ padding: 5 }}>RM{b.Price}</td></tr>
                      <tr>
                        <td style={{ padding: 5 }}>
                          <QuantityForm onSubmit={(q) => addToCart(b, q)} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Right: Cart summary */}
        <table style={{ width: '20%', float: 'right' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <i aria-hidden className="fa fa-shopping-cart" />
                  Cart
                </span>
                <span style={{ float: 'right' }}>
                  <Button className="cbtn" onClick={emptyCart}>Empty Cart</Button>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.BookID}>
                <td>
                  <img src={item.Image} alt={item.BookTitle} style={{ width: '20%' }} /><br />
                  {item.BookTitle}<br />
                  RM{item.Price}<br />
                  Quantity: {item.Quantity}<br />
                  Total Price: RM{item.TotalPrice.toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td style={{ textAlign: 'right', backgroundColor: '#f2f2f2' }}>
                Total: <b>RM{total.toFixed(2)}</b>
                <center style={{ marginTop: 8 }}>
                  <Button className="button" onClick={() => navigate('/checkout')}>CHECKOUT</Button>
                </center>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </blockquote>
  );
}

function QuantityForm({ onSubmit }) {
  const [qty, setQty] = useState(1);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(qty);
      }}
    >
      Quantity:{' '}
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        style={{ width: '20%' }}
        min={1}
      />
      <br />
      <Button type="submit" className="button" style={{ marginTop: 8 }}>
        Add to Cart
      </Button>
    </form>
  );
}
