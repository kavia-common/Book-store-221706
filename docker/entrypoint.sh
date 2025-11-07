#!/usr/bin/env bash
# A minimal, robust entrypoint script for the PHP-Apache container.

set -euo pipefail

# Ensure document root exists
DOC_ROOT="${APACHE_DOCUMENT_ROOT:-/var/www/html}"
if [ ! -d "$DOC_ROOT" ]; then
  echo "Creating document root at $DOC_ROOT"
  mkdir -p "$DOC_ROOT"
fi

# Adjust permissions for Apache if needed (non-fatal)
chown -R www-data:www-data "$DOC_ROOT" || true

# Print a brief startup message
echo "Starting Apache HTTPD with document root: $DOC_ROOT"

# Exec the Apache foreground process
exec apache2-foreground
