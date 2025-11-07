# Book Store Frontend

Minimal React 18 + Vite scaffold to support the preview system.

## Prerequisites
- Node.js v18+ recommended

## Available Scripts

- `npm install` – install dependencies
- `npm run start` – start the dev server (alias for `vite`)
- `npm run dev` – start the dev server
- `npm run build` – build for production
- `npm run preview` – preview the production build locally

The dev server chooses the port dynamically (defaults to 3000 if free). The preview script runs on port 3000 with `--strictPort` to work well with the platform's port mapping. If the environment exports `PORT`, the dev server will respect it.

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
