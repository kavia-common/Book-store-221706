#!/usr/bin/env bash
# A minimal, robust entrypoint script for the PHP-Apache container.
# Notes:
# - Must be LF line endings and executable permissions.
# - Avoid stray quotes or heredocs.

set -euo pipefail

# Ensure document root exists
DOC_ROOT="${APACHE_DOCUMENT_ROOT:-/var/www/html}"
if [ ! -d "$DOC_ROOT" ]; then
  echo "Creating document root at ${DOC_ROOT}"
  mkdir -p "${DOC_ROOT}"
fi

# Adjust permissions for Apache if needed (non-fatal)
if command -v chown >/dev/null 2>&1; then
  chown -R www-data:www-data "${DOC_ROOT}" || true
fi

# Print a brief startup message
echo "Starting Apache HTTPD with document root: ${DOC_ROOT}"

# Sanity check: required apache command exists
if ! command -v apache2-foreground >/dev/null 2>&1; then
  echo "Error: apache2-foreground command not found in PATH." >&2
  exit 127
fi

# Exec the Apache foreground process
exec apache2-foreground
