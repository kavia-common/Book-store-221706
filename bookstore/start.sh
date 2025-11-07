#!/usr/bin/env sh
set -euo pipefail

# Determine document root:
# Prefer ./public if present, otherwise use current directory.
DOCROOT="."
if [ -d "./public" ]; then
  DOCROOT="./public"
fi

# Ensure PHP binary exists
if ! command -v php >/dev/null 2>&1; then
  echo "Error: php binary not found in PATH." >&2
  exit 1
fi

# Ensure an index.php exists in the chosen document root to respond on GET /
INDEX_PHP="${DOCROOT}/index.php"
if [ ! -f "$INDEX_PHP" ]; then
  mkdir -p "$DOCROOT"
  cat > "$INDEX_PHP" <<'PHP'
<?php
// PUBLIC_INTERFACE
/**
 * Minimal bootstrap index to confirm container readiness.
 * Responds with a simple HTML page to satisfy health/readiness checks.
 */
header('Content-Type: text/html; charset=UTF-8');
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bookstore PHP backend</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    body { font-family: Arial, sans-serif; background: #f6f8fb; color: #0e1116; margin: 0; padding: 2rem; }
    .card { max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 1.25rem; }
    h1 { margin-top: 0; color: #003366; }
    code { background: #f1f5f9; padding: 0.125rem 0.25rem; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Bookstore PHP backend is running</h1>
    <p>This minimal page is served by the PHP built-in server on <code>0.0.0.0:3001</code>.</p>
    <p>If you are seeing this, the container is ready to accept HTTP connections.</p>
  </div>
</body>
</html>
PHP
fi

echo "Starting PHP built-in server on 0.0.0.0:3001 with document root: ${DOCROOT}"
exec php -S 0.0.0.0:3001 -t "${DOCROOT}"
