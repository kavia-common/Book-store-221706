import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { getCartStorage, setCartStorage } from '../utils/storage.js'

const CartContext = createContext(null)

const initialState = {
  items: [] // {id, title, price, image, qty}
}

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': {
      return action.payload || initialState
    }
    case 'ADD': {
      const { item, qty = 1 } = action.payload
      const existing = state.items.find(i => i.id === item.id)
      const items = existing
        ? state.items.map(i => (i.id === item.id ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
        : [...state.items, { ...item, qty: Math.min(99, qty) }]
      return { ...state, items }
    }
    case 'REMOVE': {
      const id = action.payload
      return { ...state, items: state.items.filter(i => i.id !== id) }
    }
    case 'SET_QTY': {
      const { id, qty } = action.payload
      const q = Math.max(1, Math.min(99, qty || 1))
      return { ...state, items: state.items.map(i => (i.id === id ? { ...i, qty: q } : i)) }
    }
    case 'EMPTY': {
      return { ...state, items: [] }
    }
    default:
      return state
  }
}

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /** Provides cart state and actions; persists to localStorage. */
  const [state, dispatch] = useReducer(reducer, initialState)

  // Hydrate from storage on mount
  useEffect(() => {
    const stored = getCartStorage()
    if (stored) dispatch({ type: 'HYDRATE', payload: stored })
  }, [])

  // Persist on change
  useEffect(() => {
    setCartStorage(state)
  }, [state])

  const api = useMemo(() => {
    const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0)
    const subtotal = state.items.reduce((sum, i) => sum + i.qty * i.price, 0)
    return {
      state,
      totalItems,
      subtotal,
      add: (item, qty = 1) => dispatch({ type: 'ADD', payload: { item, qty } }),
      remove: (id) => dispatch({ type: 'REMOVE', payload: id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', payload: { id, qty } }),
      empty: () => dispatch({ type: 'EMPTY' })
    }
  }, [state])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Hook to access cart data and operations. */
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
