import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.listBooks();
        if (!cancelled) setBooks(Array.isArray(data) ? data : (data?.books || []));
      } catch {
        if (!cancelled) setBooks([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="card">Loading books...</div>;

  return (
    <div className="grid">
      {books.map((b) => (
        <div className="card" key={b.id || b.BookID}>
          <div style={{ height: 140, background: '#eef3f8', borderRadius: 8, marginBottom: 8, display: 'flex', alignItems:'center', justifyContent:'center', color:'#668' }}>
            {b.image ? <img src={b.image} alt={b.title} style={{ maxHeight: 120, maxWidth: '100%' }} /> : <span>No Image</span>}
          </div>
          <div style={{ fontWeight: 'bold', marginBottom: 6 }}>{b.title || b.BookTitle}</div>
          <div className="small">ISBN: {b.isbn || b.ISBN}</div>
          <div className="small">Author: {b.author || b.Author}</div>
          <div className="small">Type: {b.type || b.Type}</div>
          <div className="price" style={{ marginTop: 8 }}>RM{b.price || b.Price}</div>
          <div className="toolbar" style={{ marginTop: 10 }}>
            <Link to={`/books/${encodeURIComponent(b.id || b.BookID)}`} className="btn ghost">Details</Link>
            <div className="spacer" />
            <button className="btn" onClick={() => add(b.id || b.BookID, 1)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
