/**
 * Standalone frontend mock API (no backend required).
 * Provides local in-memory data for books, auth, and cart.
 */

// Use the exact PHP dataset (images and ordering) via local JSON
import BOOKS from '../data/books.json';

let CURRENT_USER = null;
let CART = []; // {id, bookId, title, price, quantity, image}

function delay(ms=120){ return new Promise(r=>setTimeout(r, ms)); }
function ensureItemId(){ return Math.random().toString(36).slice(2,10); }
function findBook(id){ return BOOKS.find(b=>b.id===id); }

// PUBLIC_INTERFACE
export const api = {
  /** Books listing */
  async listBooks() {
    await delay();
    return BOOKS;
  },
  /** Single book */
  async getBook(id) {
    await delay();
    const b = findBook(id);
    if(!b) throw new Error('Book not found');
    return { book: b };
  },
  /** Auth endpoints (mock) */
  async login(payload) {
    await delay();
    const { username } = payload || {};
    CURRENT_USER = { id: 'u1', username: username || 'user' };
    return { user: CURRENT_USER };
  },
  async register(payload) {
    await delay();
    const { username='newuser' } = payload || {};
    CURRENT_USER = { id: 'u2', username };
    return { user: CURRENT_USER };
  },
  async logout() {
    await delay();
    CURRENT_USER = null;
    return { ok: true };
  },
  async me() {
    await delay();
    return { user: CURRENT_USER };
  },
  /** Cart endpoints (mock) */
  async getCart() {
    await delay();
    return { items: CART.slice() };
  },
  async addToCart(bookId, quantity = 1) {
    await delay();
    const book = findBook(bookId);
    if(!book) throw new Error('Book not found');
    const existing = CART.find(it=>it.bookId===bookId);
    if (existing) {
      existing.quantity += quantity;
      existing.totalPrice = existing.quantity * existing.price;
    } else {
      CART.push({
        id: ensureItemId(),
        bookId,
        title: book.title,
        price: book.price,
        quantity,
        image: book.image,
        totalPrice: quantity * book.price
      });
    }
    return { items: CART.slice() };
  },
  async updateCartItem(itemId, quantity) {
    await delay();
    const it = CART.find(i=>i.id===itemId);
    if(!it) throw new Error('Item not found');
    it.quantity = Math.max(1, Number(quantity||1));
    it.totalPrice = it.quantity * it.price;
    return { item: it };
  },
  async removeCartItem(itemId) {
    await delay();
    CART = CART.filter(i=>i.id!==itemId);
    return { ok: true };
  },
  async clearCart() {
    await delay();
    CART = [];
    return { ok: true };
  },
  /** Checkout / Orders (noop) */
  async checkout(payload) {
    await delay();
    return { ok: true, orderId: 'order_' + Date.now() };
  },
  async getOrder(orderId) {
    await delay();
    return { orderId, status:'PAID' };
  },
  /** Profile (noop) */
  async updateProfile(payload) {
    await delay();
    if (!CURRENT_USER) throw new Error('Not logged in');
    return { ok: true, user: { ...CURRENT_USER, ...payload } };
  }
};
