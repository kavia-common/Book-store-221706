# Book-Store-Frontend

This document summarizes how to run the standalone React frontend for the Book Store.

Location
- Frontend root: Book-store-221706/bookstorereact

Run (dev)
  cd Book-store-221706/bookstorereact
  npm install
  npm run dev

Features
- React 18, Vite, React Router 6, Material UI v6
- Mock-only: No network requests to any PHP/API
- Routes: /, /catalog, /login, /register, /profile, /cart, /checkout
- Cart/User contexts with localStorage persistence
- Theme colors: primary #003366, secondary #ec7115, background #f2f2f2, paper #ffffff

Build
  npm run build
  npm run preview
