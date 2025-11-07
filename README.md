# PHP Basic BookStore Website (For Study Purpose Only)
This BookStore Website is using PHP and Database(MySQL). In this website you can Register and Edit Profile.
And also all the book data will store at the database for easy to add, edit and delete.

## Home Page & Edit Profile Page:
![HomePage](/homepage.PNG)
![EditProfile](/editprofile.PNG)

## DataBase:
![Database](/db.PNG)

## How to run (Preview without PHP)
Some preview environments do not provide a host-level `php` binary, which may cause startup failures.  
To ensure the backend container can still start and provide a response, a lightweight Node/Express dev server is included under `bookstore/`:

- Start command: `node server.js` (via `npm start`)
- Binds to: `0.0.0.0:3001`
- Behavior:
  - If `php-cgi` is available, `.php` files will be executed dynamically.
  - If `php-cgi` is not available, `.php` files are served as static text/HTML so the preview remains usable.

This is a temporary development/preview fallback and not a production PHP runtime.

## Full PHP runtime (Containerized)
Under `bookstore/`, a Dockerfile and startup script exist to run the PHP built-in server when a PHP image is available.  
See `bookstore/README.md` for Docker instructions and details.

## Traditional deployment
Download [bookstore](https://github.com/weixiong15/PHP_Basic_BookStore_Website/tree/master/bookstore) folder and upload these file to your server or you can download an application called
[XAMPP](https://www.apachefriends.org/index.html) or other. After, you need to import [database.sql](https://github.com/weixiong15/PHP_Basic_BookStore_Website/blob/master/bookstore/database.sql) to your server/XAMPP 
first.
 
