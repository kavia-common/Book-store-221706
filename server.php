<?php
/**
 * Lightweight PHP built-in server bootstrap for the Book Store app.
 * Binds to 0.0.0.0:3001 and serves files from the bookstore/ directory.
 * It also provides a simple router to allow static assets passthrough and
 * fallback to index.php for dynamic pages.
 *
 * Usage (the runtime/CI will execute this script to start the server):
 *   php -S 0.0.0.0:3001 server.php
 *
 * Note: Do not hardcode credentials or environment configs here. This is
 * only a serving layer.
 */

$docRoot = __DIR__ . '/bookstore';
$requested = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Serve static files directly if they exist
$path = realpath($docRoot . $requested);
if ($path !== false && is_file($path) && str_starts_with($path, realpath($docRoot))) {
    // Let the built-in server handle the file as-is (images, css, etc.)
    return false;
}

// Route special health endpoint if present (to mark container ready)
if ($requested === '/health' || $requested === '/health.php') {
    require $docRoot . '/health.php';
    return true;
}

// Default: include the requested PHP file if it exists; otherwise fallback to index.php
$target = $docRoot . $requested;
if (is_file($target) && substr($target, -4) === '.php') {
    require $target;
} else {
    require $docRoot . '/index.php';
}
