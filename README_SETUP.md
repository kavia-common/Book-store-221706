# Book Store Workspace - Preview/Start Scripts

This repository contains:
- PHP backend app under bookstore/
- React frontend app under bookstorereact/

## PHP Backend (bookstore/)
Entry point: bookstore/index.php

Serve locally using PHP built-in server:
- Document root: bookstore/
- Router: bookstore/router.php

Start command (from workspace root):
php -S 0.0.0.0:3001 -t bookstore bookstore/router.php

Notes:
- This project expects a MySQL database called BookStore with tables defined in bookstore/database.sql
- Credentials in source code default to localhost:3306 with user root and empty password. Adjust for your environment as needed.

## React Frontend (bookstorereact/)
Scaffolded with Vite + React.

Scripts (run inside bookstorereact):
- npm run dev: Start dev server (default Vite port 5173)
- npm run build: Build production assets to dist/
- npm run preview: Preview built app on port 3002

We intentionally configure preview to use port 3002 to avoid conflicts with the PHP backend that uses 3001.

No environment variables are required by default.
