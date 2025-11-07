# Book-store-221706 Workspace

This repository contains:
- A legacy PHP bookstore app (folder: `bookstore`), and
- A standalone React frontend (folder: `bookstorereact`)

Important change:
- The Express backend container (book-store-backend) has been removed from this workspace. The `bookstoreexpress` folder and related container configuration were deleted. The React app runs fully standalone using an in-memory mock API and does not require any backend service, proxy, or API base URL.

How to run the React frontend:
1) cd Book-store-221706/bookstorereact
2) npm install
3) npm start
Then open http://localhost:3000

Notes:
- The React app has no dependency on a backend. Any previous variables like REACT_APP_API_BASE or proxies are not used.
- The legacy PHP app (folder `bookstore`) remains unchanged and can be run separately via the provided Dockerfile if needed, but it is not connected to the React app.
