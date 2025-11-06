<?php
/**
 * Simple router for PHP's built-in server.
 * Serves static files directly and routes everything else to index.php.
 */
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// If the request points to an existing file (static asset), serve it directly.
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Default to index.php to handle dynamic routes.
require_once __DIR__ . '/index.php';
