import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import { useCart } from '../contexts/CartContext';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.getBook(id);
        if (!cancelled) setBook(data?.book || data);
      } catch {
        if (!cancelled) setBook(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <div className="card">Loading book...</div>;
  if (!book) return <div className="card">Book not found.</div>;

  return (
    <div className="card">
      <div style={{ display:'flex', gap:24, alignItems:'flex-start', flexWrap:'wrap' }}>
        <div style={{ width:280, aspectRatio:'3 / 4', background:'#eef3f8', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
          {book.image ? <img src={book.image} alt={book.title} style={{ width:'100%', height:'100%', objectFit:'contain' }} /> : <span>No Image</span>}
        </div>
        <div style={{ flex:1, minWidth:240 }}>
          <h2 style={{ margin:'8px 0' }}>{book.title || book.BookTitle}</h2>
          <div className="small">ISBN: {book.isbn || book.ISBN}</div>
          <div className="small">Author: {book.author || book.Author}</div>
          <div className="small">Type: {book.type || book.Type}</div>
          <div className="price" style={{ marginTop: 10, fontSize:18 }}>RM{book.price || book.Price}</div>
          <div className="toolbar" style={{ marginTop: 12 }}>
            <label className="label" htmlFor="qty">Quantity</label>
            <input id="qty" className="input" type="number" min="1" value={qty} onChange={(e)=>setQty(parseInt(e.target.value || '1',10))} style={{ width:100 }}/>
            <button className="btn" onClick={()=>add(book.id || book.BookID, qty)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
