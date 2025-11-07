# Book-Store-Frontend (React + Vite)

This is a minimal React frontend scaffold for a Book Store UI powered by Vite. It includes:
- A header, sidebar navigation, and main content area
- Client-side routing for Home, Catalog, Cart, Profile, Orders
- A shared theme (colors, layout)
- Placeholder pages for each route

Important:
- The PHP app in ../bookstore is reference-only. Do not modify it from this frontend.
- There is no data layer yet. This code is purely UI scaffolding to verify the frontend runs independently.

Environment variables:
These may be set by your environment if needed (not required for this scaffold to run):
REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, REACT_APP_NODE_ENV, REACT_APP_NEXT_TELEMETRY_DISABLED, REACT_APP_ENABLE_SOURCE_MAPS, REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL, REACT_APP_HEALTHCHECK_PATH, REACT_APP_FEATURE_FLAGS, REACT_APP_EXPERIMENTS_ENABLED

Quick start:
1. npm install
2. npm start (alias to vite dev server on port 3000)
3. Open http://localhost:3000

Build:
- npm run build
- npm run preview (serve the built assets on port 3000)

Theme:
- primary: #003366
- secondary: #ec7115
- background: #f2f2f2
- accent: #fff
