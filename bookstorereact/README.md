# Book Store Frontend

Minimal React 18 + Vite scaffold to support the preview system.

## Prerequisites
- Node.js v18+ recommended

## Quick Start
1) Install dependencies:
   npm install

2) Start the development server (binds to 0.0.0.0:3000):
   npm start

3) Build for production:
   npm run build

4) Preview the production build on 0.0.0.0:3000:
   npm run preview

Notes:
- The dev and preview servers are configured to bind to host 0.0.0.0 and port 3000 to align with the preview platform's readiness checks.
- If 3000 is occupied locally, change the port in `vite.config.js` and the scripts in `package.json` to match your environment.

## Verifying the App
When you run the app, you should see a header:

> "Book Store Frontend is running"

Below it, there is a status panel showing:
- Vite build mode (`VITE MODE`)
- `NODE_ENV`
- Optional app version

This confirms you are viewing the correct frontend.

## Notes
- This frontend is separate from the PHP backend under `bookstore/`.
- Do not commit `.env` files with secrets. You can define `VITE_*` variables for client-side access.
