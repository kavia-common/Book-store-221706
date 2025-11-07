#!/bin/sh
# Minimal, safe entrypoint for php:apache-based image.
# Requirements:
# - LF line endings
# - Executable bit set
# - No BOM at file start
# - Ends with a trailing newline

set -e

# Ensure document root exists
DOC_ROOT="${APACHE_DOCUMENT_ROOT:-/var/www/html}"
if [ ! -d "$DOC_ROOT" ]; then
  echo "Creating document root at ${DOC_ROOT}"
  mkdir -p "${DOC_ROOT}"
fi

# Non-fatal permission adjustment
if command -v chown >/dev/null 2>&1; then
  chown -R www-data:www-data "${DOC_ROOT}" || true
fi

# Confirm startup
echo "[entrypoint] Starting Apache HTTPD with document root: ${DOC_ROOT}"

# Validate apache2-foreground availability (provided by php:apache)
if ! command -v apache2-foreground >/dev/null 2>&1; then
  echo "[entrypoint] Error: apache2-foreground command not found in PATH." >&2
  exit 127
fi

# Exec Apache in foreground (PID 1 handoff)
exec apache2-foreground
