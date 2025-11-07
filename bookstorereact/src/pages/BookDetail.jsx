import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import { useCart } from '../contexts/CartContext';
import { withImageFallback } from '../utils/imageFallback';

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
        setBook(data?.book || data);
      } catch {
        setBook(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <div className="container"><center>Loading book...</center></div>;
  if (!book) return <div className="container"><center>Book not found.</center></div>;

  return (
    <div className="container">
      <h1>{book.title}</h1>
      <div style={{ display:'flex', gap:16, alignItems:'flex-start', flexWrap:'wrap' }}>
        <div style={{ width:300, aspectRatio:'3 / 4', background:'#eee', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
          {book.image ? <img src={book.image} alt={book.title} onError={withImageFallback()} style={{ width:'100%', height:'100%', objectFit:'contain' }} /> : <span>No Image</span>}
        </div>
        <div style={{ flex:1, minWidth:280 }}>
          <div>ISBN: {book.isbn}</div>
          <div>Author: {book.author}</div>
          <div>Type: {book.type}</div>
          <div className="php-price" style={{ marginTop:8 }}>RM{book.price}</div>
          <div style={{ marginTop:8 }}>
            Quantity: <input type="number" min={1} value={qty} onChange={(e)=>setQty(parseInt(e.target.value||'1',10))} style={{ width:'20%' }} />
          </div>
          <div style={{ marginTop:8 }}>
            <button className="button" onClick={()=>add(book.id, qty)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
