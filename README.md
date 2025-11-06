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
- Start command (from workspace root):
  php -S 0.0.0.0:3001 -t bookstore bookstore/router.php

Database:
- Import Book-store-221706/bookstore/database.sql into your MySQL server.
- Default credentials in code: host localhost:3306, user root, password empty (adjust as needed).

Frontend (React) - optional:
- Location: Book-store-221706/bookstorereact
- Scripts:
  - npm run dev
  - npm run build
  - npm run preview (port 3002)

For more details see README_SETUP.md.
