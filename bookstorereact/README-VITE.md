# Vite Dev Notes

- Run `npm run dev` or `npm start` to start Vite.
- Dev server binds to `0.0.0.0:3000` for container readiness and preview orchestration.
- Health endpoint available at:
  - Static: `/health.html`
  - SPA Route: `/health`
- HTML entry is at `index.html` (Vite convention).
- SPA routing is handled by React Router; ensure your hosting falls back to `index.html` for client-side routes in production.
