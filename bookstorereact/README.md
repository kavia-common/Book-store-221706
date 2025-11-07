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
- Backend removed: The Express backend container and any proxy/API base URL usage have been removed. Do not set REACT_APP_API_BASE or proxy; they are not used.
- Images for book covers are included under public/assets.
- CSS tokens load first, followed by global styles to ensure design fidelity.
