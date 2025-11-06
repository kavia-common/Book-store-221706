# Book Store Frontend (React 18 + Vite + Material UI)

This is a standalone frontend for a Book Store demo, built with React 18, Vite, and Material UI (MUI).
It uses only mock data and local state. No network requests or backend/PHP dependencies.

Features
- Pages and routes: /, /catalog, /login, /register, /profile, /cart, /checkout
- Shared Layout: AppBar with navigation, cart drawer, and footer
- Theme: MUI theme with primary #003366, secondary #ec7115, background #f2f2f2, paper #ffffff
- State:
  - Cart context: add/remove/change quantity, subtotal, persisted in localStorage
  - User context: login/register/profile edit (local only), persisted in localStorage
- Catalog: search/filter/sort with pagination using mock data (no API)
- Forms: client-side validation for login/register
- Checkout: Read-only summary; no payment processing

Tech stack
- React 18
- React Router v6
- Material UI (@mui/material, @mui/icons-material) with @emotion
- Vite

Requirements
- Node.js 18+ and npm (or pnpm/yarn)
- No environment variables are required for the frontend; any REACT_APP_* present are ignored.

Install and Run
- From repo root (preferred in CI/preview):
  ./start-frontend.sh

- Or run manually:
  cd Book-store-221706/bookstorereact
  npm install
  npm run dev

This starts the dev server on 0.0.0.0:3000

Build and Preview
  npm run build
  npm run preview

Routes
- /          Home (featured books)
- /catalog   Catalog (search/filter/sort/pagination, Add to Cart)
- /login     Login form (mock auth, local-only)
- /register  Register form (mock auth, local-only)
- /profile   Profile edit (local-only; requires login)
- /cart      Cart page with quantities and subtotal
- /checkout  Read-only summary (shipping/payment placeholders)

Notes
- No network calls are made; the app never fetches from PHP or any external API.
- All images are referenced from /assets/* paths. Make sure your hosting serves public assets accordingly (Vite dev does this by default).
- To reset state, clear localStorage keys:
  - bs_cart_v1
  - bs_user_v1
