<?php
/**
 * Simple healthcheck endpoint for container readiness.
 * Returns HTTP 200 and a small JSON payload.
 */
header('Content-Type: application/json');
http_response_code(200);
echo json_encode([
    'status' => 'ok',
    'service' => 'bookstore-php',
    'time' => gmdate('c')
]);
