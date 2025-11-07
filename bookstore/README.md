# Book Store PHP Backend (Containerized)

This directory contains a minimal PHP application for the Book Store backend.  
To ensure the app can run in environments without a system-level PHP binary, a Dockerfile is provided that uses the official PHP image and runs the built-in PHP server.

## Quick Start (Docker)

Prerequisites:
- Docker 20.10+ or compatible runtime

Steps:
1) Build the image (from this `bookstore/` directory):
   docker build -t bookstore-php .

2) Run the container exposing port 3001:
   docker run --rm -p 3001:3001 --name bookstore-php bookstore-php

3) Open the backend in your browser:
   http://localhost:3001

The container uses:
- Base image: php:8.2-cli-alpine
- Command: php -S 0.0.0.0:3001 -t .

Port:
- 3001 (exposed in the Dockerfile)

## Notes on Database

This project expects a MySQL database named `bookstore` and uses local host/credentials in the PHP files (e.g., `connectDB.php` and mysqli usages).
In containerized or remote environments, you will likely need to:
- Update `connectDB.php` and any direct mysqli connections to use environment variables for host/user/pass/db/port, or
- Network the container to an external MySQL service and point the host accordingly.

No environment variables are hard-coded in the container; you can adapt the PHP files to read from environment vars if needed.

## Preview System Compatibility

- The Dockerfile allows platforms that auto-detect Dockerfiles to build and run the backend without requiring a system-level `php` binary.
- The PHP built-in server serves this folder as the document root (`-t .`) on port `3001`.

## Frontend

A separate React frontend scaffold lives in `../bookstorereact`. It is independent of this backend container and can be run separately.

## Troubleshooting

- Port already in use: Ensure nothing else is bound to 3001 or change the published host port: `-p 8080:3001`.
- MySQL connection refused: Verify database is reachable from inside the container and credentials are correct.
- Static assets: Images/css in `image/` and `style.css` are served by the built-in server automatically.

## License

For study/demo purposes only.
