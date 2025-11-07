/**
 * Simple fetch wrapper that injects base URL and sends credentials (cookies)
 * Base URL is read from REACT_APP_API_BASE_URL with fallback to http://localhost:3001
 */
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// PUBLIC_INTERFACE
export async function apiFetch(path, options = {}) {
  /** Perform a fetch request against the backend API, sending credentials. */
  const url = `${API_BASE}${path}`;
  const opts = {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  };
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status}: ${text || res.statusText}`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return res.text();
}

// PUBLIC_INTERFACE
export const api = {
  /** Books listing */
  async listBooks() {
    return apiFetch('/api/books', { method: 'GET' });
  },
  /** Single book */
  async getBook(id) {
    return apiFetch(`/api/books/${encodeURIComponent(id)}`, { method: 'GET' });
  },
  /** Auth endpoints */
  async login(payload) {
    return apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
  },
  async register(payload) {
    return apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) });
  },
  async logout() {
    return apiFetch('/api/auth/logout', { method: 'POST' });
  },
  async me() {
    return apiFetch('/api/auth/me', { method: 'GET' });
  },
  /** Cart endpoints */
  async getCart() {
    return apiFetch('/api/cart', { method: 'GET' });
  },
  async addToCart(bookId, quantity = 1) {
    return apiFetch('/api/cart', { method: 'POST', body: JSON.stringify({ bookId, quantity }) });
  },
  async updateCartItem(itemId, quantity) {
    return apiFetch(`/api/cart/${encodeURIComponent(itemId)}`, { method: 'PUT', body: JSON.stringify({ quantity }) });
  },
  async removeCartItem(itemId) {
    return apiFetch(`/api/cart/${encodeURIComponent(itemId)}`, { method: 'DELETE' });
  },
  async clearCart() {
    return apiFetch('/api/cart', { method: 'DELETE' });
  },
  /** Checkout / Orders */
  async checkout(payload) {
    return apiFetch('/api/checkout', { method: 'POST', body: JSON.stringify(payload) });
  },
  async getOrder(orderId) {
    return apiFetch(`/api/orders/${encodeURIComponent(orderId)}`, { method: 'GET' });
  },
  /** Profile */
  async updateProfile(payload) {
    return apiFetch('/api/profile', { method: 'PUT', body: JSON.stringify(payload) });
  }
};
