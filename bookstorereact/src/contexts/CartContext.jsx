import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from './AuthContext';

// PUBLIC_INTERFACE
export const CartContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * Provides shopping cart state backed by local mock API for standalone UI.
 */
export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]); // [{id, bookId, title, price, quantity, image}]
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await api.getCart();
      setItems(Array.isArray(data?.items) ? data.items : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load and whenever auth changes
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const add = async (bookId, quantity = 1) => {
    await api.addToCart(bookId, quantity);
    await refresh();
  };

  const update = async (itemId, quantity) => {
    await api.updateCartItem(itemId, quantity);
    await refresh();
  };

  const remove = async (itemId) => {
    await api.removeCartItem(itemId);
    await refresh();
  };

  const clear = async () => {
    await api.clearCart();
    await refresh();
  };

  const value = useMemo(() => ({ items, loading, refresh, add, update, remove, clear }), [items, loading]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Hook to access cart context. */
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
