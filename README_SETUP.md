# Book Store Workspace - Preview/Start Scripts

This repository contains:
- PHP backend app under bookstore/
- React frontend app under bookstorereact/

## PHP Backend (bookstore/)
Entry point: bookstore/index.php

Recommended: Self-contained Docker start (no system PHP required)
- A Dockerfile is provided at bookstore/Dockerfile using php:8-cli-alpine.
- The container serves the app using PHP's built-in server with router.php.
- The server listens on $PORT (defaults to 3001).

Build and run (from repository root):
- Build: docker build -t bookstore-backend ./Book-store-221706/bookstore
- Run: docker run -e PORT=3001 -p 3001:3001 bookstore-backend

If the preview system runs Dockerfiles automatically, it should detect bookstore/Dockerfile and run:
CMD: php -S 0.0.0.0:$PORT -t /app /app/router.php

Alternative (only if system PHP is available locally):
- Document root: bookstore/
- Router: bookstore/router.php
- Start command (from Book-store-221706/):
  php -S 0.0.0.0:3001 -t bookstore bookstore/router.php

Notes:
- This project expects a MySQL database called BookStore with tables defined in bookstore/database.sql
- Credentials in source code default to localhost:3306 with user root and empty password. Adjust for your environment as needed.

## React Frontend (bookstorereact/)
Scaffolded with Vite + React.

Scripts (run inside Book-store-221706/bookstorereact):
- npm run dev: Starts dev server on 0.0.0.0:3002
- npm run build: Builds production assets to dist/
- npm run preview: Serves built app on 0.0.0.0:3002

We intentionally use port 3002 for React to avoid conflicts with the PHP backend on 3001.

Exact commands the preview system should invoke:
- Backend (Docker-based): docker build -t bookstore-backend ./Book-store-221706/bookstore && docker run -e PORT=3001 -p 3001:3001 bookstore-backend
- Frontend (dev mode): cd Book-store-221706/bookstorereact && npm ci && npm run dev
  or (preview mode): cd Book-store-221706/bookstorereact && npm ci && npm run build && npm run preview
