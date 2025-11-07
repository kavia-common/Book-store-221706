import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Cart() {
  const { items, update, remove, clear, loading } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();

  const total = items.reduce((s, it) => s + (it.totalPrice ?? (it.price * it.quantity)), 0);

  return (
    <div className="card">
      <h2>Cart</h2>
      {loading ? <div>Loading cart...</div> : (
        items.length === 0 ? <div>Your cart is empty. <Link to="/">Go shop</Link></div> : (
          <>
            <ul className="list">
              {items.map((it)=>(
                <li key={it.id}>
                  <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                    <div style={{ width:64, height:64, background:'#eef3f8', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {it.image ? <img src={it.image} alt={it.title} style={{ maxWidth:'100%', maxHeight:'100%' }}/> : <span className="small">No Image</span>}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:'bold' }}>{it.title}</div>
                      <div className="small">RM{it.price} x {it.quantity}</div>
                    </div>
                    <input className="input" type="number" min="1" value={it.quantity} onChange={(e)=>update(it.id, parseInt(e.target.value || '1', 10))} style={{ width:88 }}/>
                    <button className="btn secondary" onClick={()=>remove(it.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="toolbar" style={{ marginTop: 12 }}>
              <div className="spacer"/>
              <div>Total: <span className="price">RM{total.toFixed(2)}</span></div>
            </div>
            <div className="toolbar" style={{ marginTop: 12 }}>
              <button className="btn secondary" onClick={clear}>Empty Cart</button>
              <div className="spacer"/>
              <button className="btn" onClick={()=> user ? nav('/checkout') : nav('/login', { state: { from: '/checkout' }})}>Proceed to Checkout</button>
            </div>
          </>
        )
      )}
    </div>
  );
}
