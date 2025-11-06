# Book Store Workspace

This repository contains:
- A legacy PHP backend app under bookstore/ (not required for the React frontend)
- A standalone React frontend app under bookstorereact/

Standalone React Frontend
- See Book-store-221706/bookstorereact/README.md for detailed instructions.
- Quick start:
  ./start-frontend.sh
  (or: cd Book-store-221706/bookstorereact && npm install && npm run dev)

Legacy PHP Backend (optional; not needed for frontend)
- Exists only for study/reference.
- Preferred start:
  ./start-backend.sh
- Health endpoint: http://localhost:${PORT:-3001}/healthz

Notes:
- The React frontend is fully mock-driven; it does not connect to PHP or any backend.
- Ports: 3000 (frontend), 3001 (backend).
