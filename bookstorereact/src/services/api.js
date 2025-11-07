const API_BASE = process.env.REACT_APP_API_BASE_URL || "";

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Returns the configured API base URL (from env) or an empty string by default. */
  return API_BASE;
}

// PUBLIC_INTERFACE
export async function fetchBooks() {
  /**
   * Placeholder function to fetch books from the backend.
   * TODO: Replace with real request to `${API_BASE}/books` when backend endpoint is ready.
   */
  return Promise.resolve({ data: [] });
}

// PUBLIC_INTERFACE
export async function login(username, password) {
  /**
   * Placeholder function for user login.
   * TODO: POST to `${API_BASE}/login.php` with form data when available.
   */
  return Promise.resolve({ ok: true, username });
}

// PUBLIC_INTERFACE
export async function addToCart(bookId, qty = 1) {
  /**
   * Placeholder function for adding to cart.
   * TODO: POST to `${API_BASE}/cart.php` when endpoint exists.
   */
  return Promise.resolve({ ok: true, bookId, qty });
}
