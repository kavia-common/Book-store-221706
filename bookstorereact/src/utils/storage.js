const CART_KEY = 'bs_cart_v1'
const USER_KEY = 'bs_user_v1'

// PUBLIC_INTERFACE
export function getCartStorage() {
  /** Read cart state from localStorage. */
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// PUBLIC_INTERFACE
export function setCartStorage(cartState) {
  /** Persist cart state to localStorage. */
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartState))
  } catch {
    // ignore
  }
}

// PUBLIC_INTERFACE
export function getUserStorage() {
  /** Read user from localStorage. */
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// PUBLIC_INTERFACE
export function setUserStorage(user) {
  /** Persist user to localStorage. */
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    // ignore
  }
}

// PUBLIC_INTERFACE
export function clearUserStorage() {
  /** Remove user from localStorage. */
  try {
    localStorage.removeItem(USER_KEY)
  } catch {
    // ignore
  }
}
