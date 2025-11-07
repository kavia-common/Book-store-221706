import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const FALLBACK = [
  { BookID:'B-001', BookTitle:'Lonely Planet Australia (Travel Guide)', ISBN:'123-456-789-1', Price:136, Author:'Lonely Planet', Type:'Travel' },
  { BookID:'B-002', BookTitle:'Crew Resource Management, Second Edition', ISBN:'123-456-789-2', Price:599, Author:'Barbara Kanki', Type:'Technical' },
  { BookID:'B-003', BookTitle:'CCNA Routing and Switching 200-125 Official Cert Guide Library', ISBN:'123-456-789-3', Price:329, Author:'Cisco Press', Type:'Technology' },
  { BookID:'B-004', BookTitle:'Easy Vegetarian Slow Cooker Cookbook', ISBN:'123-456-789-4', Price:75.9, Author:'Rockridge Press', Type:'Food' },
];

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { add, items } = useCart();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.listBooks();
        const list = Array.isArray(data) ? data : (data?.books || []);
        if (!cancelled) setBooks(list.length ? list : FALLBACK);
      } catch {
        if (!cancelled) setBooks(FALLBACK);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const total = useMemo(
    () => items.reduce((s, it)=> s + (it.totalPrice ?? (it.price || it.Price || 0) * (it.quantity || 0)), 0),
    [items]
  );

  return (
    <div className="page-home">
      <section>
        {loading ? (
          <div className="card">Loading books...</div>
        ) : (
          <div className="product-grid grid">
            {books.map((b) => (
              <article className="card product" key={b.id || b.BookID}>
                <div style={{ height: 180, background: '#f2f5f8', borderRadius: 6, marginBottom: 8, display: 'flex', alignItems:'center', justifyContent:'center', color:'#668' }}>
                  {b.image ? <img src={b.image} alt={b.title || b.BookTitle} style={{ maxHeight: 160, maxWidth: '100%' }} /> : <span>No Image</span>}
                </div>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>{b.title || b.BookTitle}</div>
                <div className="small">ISBN: {b.isbn || b.ISBN}</div>
                <div className="small">Author: {b.author || b.Author}</div>
                <div className="small">Type: {b.type || b.Type}</div>
                <div style={{ marginTop: 8 }}>
                  <span className="badge-price">RM{(b.price ?? b.Price)}</span>
                </div>
                <div className="toolbar" style={{ marginTop: 10 }}>
                  <Link to={`/books/${encodeURIComponent(b.id || b.BookID)}`} className="btn ghost">View</Link>
                  <div className="spacer" />
                  <button className="btn" onClick={() => add(b.id || b.BookID, 1)} aria-label={`Add ${b.title || b.BookTitle} to cart`}>Add to Cart</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <aside className="aside-panel" aria-label="Cart summary">
        <h2 className="aside-title">Cart</h2>
        <div className="divider" />
        {items.length === 0 ? (
          <div className="small">Your cart is empty.</div>
        ) : (
          <ul className="list">
            {items.map((it)=>(
              <li key={it.id || `${it.bookId}-${it.title}`}>
                <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                  <div style={{ width:56, height:56, background:'#eef3f8', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {it.image ? <img src={it.image} alt={it.title} style={{ maxWidth:'100%', maxHeight:'100%' }} /> : <span className="small">No Image</span>}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600 }}>{it.title}</div>
                    <div className="small">Qty {it.quantity}</div>
                  </div>
                  <div className="price">RM{(it.totalPrice ?? (it.price * it.quantity)).toFixed(2)}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="divider" />
        <div style={{ display:'flex', justifyContent:'flex-end', gap:8, alignItems:'center' }}>
          <div className="small">Total:</div>
          <div className="price">RM{total.toFixed(2)}</div>
        </div>
        <div style={{ marginTop:12, display:'flex', gap:8 }}>
          <Link to="/cart" className="btn secondary" style={{ textDecoration:'none', flex:1, textAlign:'center' }}>View Cart</Link>
          <Link to="/login" className="btn" style={{ textDecoration:'none' }}>Checkout</Link>
        </div>
      </aside>
    </div>
  );
}
