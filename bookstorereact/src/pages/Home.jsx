import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const FALLBACK = [
  { id:'BK-001', title:'The Pragmatic Programmer', isbn:'978-0201616224', price:189.00, author:'Andrew Hunt, David Thomas', type:'Software Engineering', image:'/assets/covers/the-pragmatic-programmer.svg' },
  { id:'BK-002', title:'Clean Code', isbn:'978-0132350884', price:172.50, author:'Robert C. Martin', type:'Programming', image:'/assets/covers/clean-code.svg' },
  { id:'BK-003', title:"You Don't Know JS Yet", isbn:'978-1091210094', price:98.00, author:'Kyle Simpson', type:'JavaScript', image:'/assets/covers/you-dont-know-js.svg' },
  { id:'BK-004', title:'Designing Data-Intensive Applications', isbn:'978-1449373320', price:230.00, author:'Martin Kleppmann', type:'Data', image:'/assets/covers/designing-data-intensive-applications.svg' },
  { id:'BK-005', title:'Atomic Habits', isbn:'978-0735211292', price:88.90, author:'James Clear', type:'Self-help', image:'/assets/covers/atomic-habits.svg' },
  { id:'BK-006', title:'Refactoring (2nd Edition)', isbn:'978-0134757599', price:215.00, author:'Martin Fowler', type:'Software Engineering', image:'/assets/covers/refactoring.svg' },
  { id:'BK-007', title:'Deep Work', isbn:'978-1455586691', price:79.00, author:'Cal Newport', type:'Productivity', image:'/assets/covers/deep-work.svg' },
  { id:'BK-008', title:'Eloquent JavaScript', isbn:'978-1593279509', price:120.00, author:'Marijn Haverbeke', type:'JavaScript', image:'/assets/covers/eloquent-javascript.svg' }
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
                <div style={{ width: '100%', aspectRatio: '3 / 4', background: '#f2f5f8', borderRadius: 6, marginBottom: 8, display: 'flex', alignItems:'center', justifyContent:'center', color:'#668', overflow:'hidden' }}>
                  {b.image ? <img src={b.image} alt={b.title || b.BookTitle} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span>No Image</span>}
                </div>
                <div style={{ fontWeight: 600, marginBottom: 6, lineHeight: '20px' }}>{b.title || b.BookTitle}</div>
                <div className="small">ISBN: {b.isbn || b.ISBN}</div>
                <div className="small">Author: {b.author || b.Author}</div>
                <div className="small">Type: {b.type || b.Type}</div>
                <div style={{ marginTop: 8 }}>
                  <span className="badge-price">RM{(b.price ?? b.Price).toFixed ? (b.price ?? b.Price).toFixed(2) : (b.price ?? b.Price)}</span>
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
