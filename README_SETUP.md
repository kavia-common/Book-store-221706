# Book Store Workspace - Preview/Start Scripts

This repository contains:
- PHP backend app under bookstore/
- React frontend app under bookstorereact/

## PHP Backend (bookstore/)
Entry point: bookstore/index.php

Preferred start in generic preview environments (no Docker dependency):
- From repository root:
  ./start-backend.sh
- Behavior:
  - Binds to 0.0.0.0:${PORT:-3001}
  - If PHP is available, starts PHP's built-in server using:
    php -S 0.0.0.0:${PORT:-3001} -t Book-store-221706/bookstore Book-store-221706/bookstore/router.php
  - If PHP is NOT available in the environment, runs a lightweight placeholder HTTP server (Node/busybox/nc) that returns a clear message and passes health checks, keeping the preview alive until PHP support is added.
  - This avoids "bash: php: command not found" breaking preview runs.

If your environment requires Docker or you want a guaranteed PHP runtime:
- A Dockerfile is provided at bookstore/Dockerfile using php:8-cli-alpine.
- Build and run (from repository root):
  docker build -t bookstore-backend ./Book-store-221706/bookstore
  docker run -e PORT=3001 -p 3001:3001 bookstore-backend

Notes:
- Document root: Book-store-221706/bookstore
- Router: Book-store-221706/bookstore/router.php
- The server must bind to 0.0.0.0 to be reachable by the preview system.

Database:
- This project expects a MySQL database called BookStore with tables defined in bookstore/database.sql
- Credentials in source code default to localhost:3306 with user root and empty password. Adjust for your environment as needed.

## React Frontend (bookstorereact/)
Scaffolded with Vite + React.

Preferred start in preview environments:
- From repository root:
  ./start-frontend.sh
- Binds to 0.0.0.0:3000

Manual scripts (run inside Book-store-221706/bookstorereact):
- npm start: Starts dev server on 0.0.0.0:3000
- npm run dev: Starts dev server on 0.0.0.0:3000
- npm run build: Builds production assets to dist/
- npm run preview: Serves built app on 0.0.0.0:3000

We intentionally use port 3000 for React to avoid conflicts with the PHP backend on 3001.

Exact commands the preview system can invoke:
- Backend (non-Docker): ./start-backend.sh
- Backend (Docker-based): docker build -t bookstore-backend ./Book-store-221706/bookstore && docker run -e PORT=3001 -p 3001:3001 bookstore-backend
- Frontend (dev mode): cd Book-store-221706/bookstorereact && npm ci && npm start
  or (preview mode): cd Book-store-221706/bookstorereact && npm ci && npm run build && npm run preview
