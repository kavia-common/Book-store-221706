<?php
/**
 * PUBLIC_INTERFACE
 * Minimal health endpoint for preview/CI health checks.
 * Returns HTTP 200 with a small JSON body.
 */
header('Content-Type: application/json; charset=UTF-8');
http_response_code(200);
echo json_encode([
  'ok' => true,
  'service' => 'bookstore-php-backend',
  'status' => 'healthy',
  'timestamp' => gmdate('c'),
]);
