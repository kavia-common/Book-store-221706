# PHP Basic BookStore Website (For Study Purpose Only)
This BookStore Website is using PHP and Database(MySQL). In this website you can Register and Edit Profile.
And also all the book data will store at the database for easy to add, edit and delete.

## Home Page & Edit Profile Page:
![HomePage](/homepage.PNG)
![EditProfile](/editprofile.PNG)

## DataBase:
![Database](/db.PNG)

## How to run (Local/Preview)
Backend (PHP):
- Document root: Book-store-221706/bookstore
- Entry: index.php
- Router (built-in PHP server): router.php
- Preferred start (no Docker required): from repo root run
  ./start-backend.sh
  - Binds 0.0.0.0 on port ${PORT:-3001}
  - Serves docroot Book-store-221706/bookstore using router.php
- If your environment requires Docker:
  - Build: docker build -t bookstore-backend ./Book-store-221706/bookstore
  - Run: docker run -e PORT=3001 -p 3001:3001 bookstore-backend

Database:
- Import Book-store-221706/bookstore/database.sql into your MySQL server.
- Default credentials in code: host localhost:3306, user root, password empty (adjust as needed).

Frontend (React) - optional:
- Location: Book-store-221706/bookstorereact
- Preferred start (dev): from repo root run
  ./start-frontend.sh
  - Binds 0.0.0.0 on port 3002
- Scripts (if running manually inside Book-store-221706/bookstorereact):
  - npm start (port 3002)
  - npm run dev (port 3002)
  - npm run build
  - npm run preview (port 3002)

Notes:
- We intentionally use port 3001 for PHP backend and 3002 for React to avoid conflicts.
- Ensure your preview system/runner binds to 0.0.0.0 so ports are accessible.

For more details see README_SETUP.md.
