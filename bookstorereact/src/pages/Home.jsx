import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { useCart } from '../contexts/CartContext';
import { withImageFallback } from '../utils/imageFallback';

/**
 * Home page rebuilt to mirror PHP index.php layout:
 * - Left: table grid of books (within width:80%; float:left)
 * - Right: cart table (within width:20%; float:right)
 * - Uses .button and .cbtn for actions, preserves PHP class names and structure.
 */
export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { add, items, clear } = useCart();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api.listBooks();
        const list = Array.isArray(data) ? data : (data?.books || []);
        if (!cancelled) setBooks(list);
      } catch {
        if (!cancelled) setBooks([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const total = useMemo(
    () => items.reduce((s, it)=> s + (it.totalPrice ?? (it.price || 0) * (it.quantity || 0)), 0),
    [items]
  );

  return (
    <>
      {/* Left book listing table */}
      <table id="myTable" className="php-grid">
        <tbody>
          <tr>
            {loading ? (
              <td><img src="/assets/loading.svg" alt="Loading" width="48" height="48" /></td>
            ) : books.map((b) => (
              <td key={b.id} style={{ verticalAlign:'top', padding:'8px' }}>
                <table style={{ width:'100%' }}>
                  <tbody>
                    <tr>
                      <td>
                        <div style={{ width:'100%', aspectRatio:'3 / 4', background:'#f2f2f2', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                          {b.image ? <img src={b.image} alt={b.title} onError={withImageFallback()} style={{ width:'100%', height:'100%', objectFit:'contain' }}/> : <span>No Image</span>}
                        </div>
                      </td>
                    </tr>
                    <tr><td style={{padding:'5px'}}>Title: {b.title}</td></tr>
                    <tr><td style={{padding:'5px'}}>ISBN: {b.isbn}</td></tr>
                    <tr><td style={{padding:'5px'}}>Author: {b.author}</td></tr>
                    <tr><td style={{padding:'5px'}}>Type: {b.type}</td></tr>
                    <tr><td style={{padding:'5px'}}>RM{b.price}</td></tr>
                    <tr>
                      <td style={{padding:'5px'}}>
                        {/* Quantity + Add to cart (kept simple, default 1 like PHP initial) */}
                        Quantity: <input type="number" defaultValue={1} min={1} style={{width:'20%'}} onChange={(e)=>{ e.currentTarget.setAttribute('data-qty', e.currentTarget.value); }} />
                        <br/>
                        <button className="button" onClick={(e)=> {
                          const qtyInput = e.currentTarget.parentElement.querySelector('input[type=number]');
                          const q = parseInt(qtyInput?.getAttribute('data-qty') || qtyInput?.value || '1', 10);
                          add(b.id, isNaN(q) ? 1 : q);
                        }}>Add to Cart</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Right cart table */}
      <table className="php-sidebar">
        <thead>
          <tr>
            <th style={{textAlign:'left'}}>
              <span style={{fontWeight:'bold'}}>Cart</span>
              <form style={{float:'right'}} onSubmit={(e)=>{ e.preventDefault(); clear(); }}>
                <input className="cbtn" type="submit" value="Empty Cart" />
              </form>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((it)=>(
            <tr key={it.id}>
              <td>
                {it.image ? <img src={it.image} alt={it.title} width="20%" onError={withImageFallback()} /> : null}<br/>
                {it.title}<br/>RM{it.price}<br/>
                Quantity: {it.quantity}<br/>
                Total Price: RM{(it.totalPrice ?? (it.price * it.quantity)).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <td style={{textAlign:'right', backgroundColor:'#f2f2f2'}}>
              Total: <b>RM{total.toFixed(2)}</b>
              <center style={{ marginTop: 8 }}>
                <button className="button" onClick={(e)=>{ e.preventDefault(); /* mimic PHP checkout button - navigate to login for now */ window.location.href='/login'; }}>CHECKOUT</button>
              </center>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
