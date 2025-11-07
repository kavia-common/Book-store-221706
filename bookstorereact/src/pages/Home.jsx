import React, { useEffect, useMemo, useState } from 'react';
import booksData from '../data/books.json';
import { useCart } from '../contexts/CartContext';
import { withImageFallback } from '../utils/imageFallback';

/**
 * Home page rebuilt to mirror PHP index.php layout with pixel-parity:
 * - Cards match PHP table cells: fixed width, consistent gutters, 3:4 media.
 * - Typography scale for title/author/price aligns with PHP CSS.
 * - Price/Add-to-cart section baseline-aligned.
 * - Hover/focus styles tuned via CSS classes (no behavioral changes).
 *
 * Data:
 * - Uses local JSON (src/data/books.json) exported from PHP dataset to match titles, categories, prices, images, and order.
 * - No backend/API calls.
 */
export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { add, items, clear } = useCart();

  useEffect(() => {
    // Load from local JSON (no network). Keep order exactly as defined.
    setBooks(Array.isArray(booksData) ? booksData : []);
    setLoading(false);
  }, []);

  const total = useMemo(
    () => items.reduce((s, it)=> s + (it.totalPrice ?? (it.price || 0) * (it.quantity || 0)), 0),
    [items]
  );

  return (
    <>
      {/* Left book listing table (matches PHP width/float) */}
      <table id="myTable" className="php-grid">
        <tbody>
          <tr>
            {loading ? (
              <td className="php-cardcell">
                <div className="php-card php-card--loading">
                  <img src="/assets/loading.svg" alt="Loading" width="48" height="48" />
                </div>
              </td>
            ) : books.map((b) => (
              <td key={b.id} className="php-cardcell">
                <article className="php-card" aria-label={`Book card for ${b.title}`}>
                  <div className="php-media">
                    {b.image ? (
                      <img
                        src={b.image}
                        alt={b.title}
                        onError={withImageFallback()}
                      />
                    ) : <span className="small">No Image</span>}
                  </div>

                  <div className="php-meta">
                    <div className="php-row"><span className="php-label">Title:</span> <span className="php-value php-title">{b.title}</span></div>
                    <div className="php-row"><span className="php-label">ISBN:</span> <span className="php-value">{b.isbn}</span></div>
                    <div className="php-row"><span className="php-label">Author:</span> <span className="php-value">{b.author}</span></div>
                    <div className="php-row"><span className="php-label">Type:</span> <span className="php-value">{b.type}</span></div>
                  </div>

                  <div className="php-cta">
                    <div className="php-price-badge">RM{b.price}</div>
                    <div className="php-qty">
                      Quantity:{' '}
                      <input
                        className="php-qty-input"
                        type="number"
                        defaultValue={1}
                        min={1}
                        onChange={(e)=>{ e.currentTarget.setAttribute('data-qty', e.currentTarget.value); }}
                      />
                    </div>
                    <button
                      className="button php-add"
                      onClick={(e)=> {
                        const qtyInput = e.currentTarget.parentElement.querySelector('input[type=number]');
                        const q = parseInt(qtyInput?.getAttribute('data-qty') || qtyInput?.value || '1', 10);
                        add(b.id, isNaN(q) ? 1 : q);
                      }}
                      aria-label={`Add ${b.title} to cart`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Right cart table (styling matched to PHP) */}
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
            <td className="php-sidebar-total">
              Total: <b>RM{total.toFixed(2)}</b>
              <center style={{ marginTop: 8 }}>
                <button className="button" onClick={(e)=>{ e.preventDefault(); window.location.href='/login'; }}>CHECKOUT</button>
              </center>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
