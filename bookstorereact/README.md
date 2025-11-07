# Book-Store-Frontend (React only)

This is a standalone React frontend that renders the Book Store UI exactly like the provided screenshots. It does not require any backend. All data (books, auth, cart) is provided via a local in-memory mock API.

How to run (port 3000):
- npm install
- npm start
Then open http://localhost:3000

Routes:
- /        Home page with product grid and right sidebar/cart panel
- /login   Login form panel matching the screenshot

Notes:
- No Express/backend is used. Any previous references have been removed.
- Images for book covers are included under public/assets.
- CSS tokens load first, followed by global styles to ensure design fidelity.
