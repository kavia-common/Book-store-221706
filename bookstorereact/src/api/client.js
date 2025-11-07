/**
 * Standalone frontend mock API (no backend required).
 * Provides local in-memory data for books, auth, and cart.
 */

/**
 * Mock catalog: refreshed dataset (12 items), frontend-only.
 * Cover images now use HTTPS URLs from reputable sources (Open Library covers),
 * which serve CORS-safe direct image URLs.
 */
const BOOKS = [
  // Using Open Library cover API: https://covers.openlibrary.org/
  { id:'BK-001', title:'The Pragmatic Programmer', isbn:'978-0201616224', price:189.00, author:'Andrew Hunt, David Thomas', type:'Software Engineering', image:'https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg' },
  { id:'BK-002', title:'Clean Code', isbn:'978-0132350884', price:172.50, author:'Robert C. Martin', type:'Programming', image:'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg' },
  { id:'BK-003', title:"You Don\'t Know JS Yet", isbn:'978-1091210094', price:98.00, author:'Kyle Simpson', type:'JavaScript', image:'https://covers.openlibrary.org/b/isbn/9781091210094-L.jpg' },
  { id:'BK-004', title:'Designing Data-Intensive Applications', isbn:'978-1449373320', price:230.00, author:'Martin Kleppmann', type:'Data', image:'https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg' },
  { id:'BK-005', title:'Atomic Habits', isbn:'978-0735211292', price:88.90, author:'James Clear', type:'Self-help', image:'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg' },
  { id:'BK-006', title:'Refactoring (2nd Edition)', isbn:'978-0134757599', price:215.00, author:'Martin Fowler', type:'Software Engineering', image:'https://covers.openlibrary.org/b/isbn/9780134757599-L.jpg' },
  { id:'BK-007', title:'Deep Work', isbn:'978-1455586691', price:79.00, author:'Cal Newport', type:'Productivity', image:'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg' },
  { id:'BK-008', title:'Eloquent JavaScript', isbn:'978-1593279509', price:120.00, author:'Marijn Haverbeke', type:'JavaScript', image:'https://covers.openlibrary.org/b/isbn/9781593279509-L.jpg' },
  { id:'BK-009', title:'The Clean Coder', isbn:'978-0137081074', price:165.00, author:'Robert C. Martin', type:'Programming', image:'https://covers.openlibrary.org/b/isbn/9780137081074-L.jpg' },
  { id:'BK-010', title:'Domain-Driven Design', isbn:'978-0321125217', price:240.00, author:'Eric Evans', type:'Architecture', image:'https://covers.openlibrary.org/b/isbn/9780321125217-L.jpg' },
  { id:'BK-011', title:'Patterns of Enterprise Application Architecture', isbn:'978-0321127426', price:255.00, author:'Martin Fowler', type:'Architecture', image:'https://covers.openlibrary.org/b/isbn/9780321127426-L.jpg' },
  { id:'BK-012', title:'Continuous Delivery', isbn:'978-0321601919', price:210.00, author:'Jez Humble, David Farley', type:'DevOps', image:'https://covers.openlibrary.org/b/isbn/9780321601919-L.jpg' }
];

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
