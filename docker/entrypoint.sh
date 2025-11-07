#!/bin/sh
# Minimal, POSIX-safe entrypoint for php:apache-based image.
# Note: This script uses /bin/sh (POSIX), not bash, to ensure portability in official PHP images.
# Requirements:
# - LF line endings (no CRLF)
# - Executable bit set
# - No BOM at file start
# - Ends with a trailing newline

# Fail fast (treat unset vars as error, exit on error)
set -eu

# If the script has CRLF line endings, normalize them in-memory before proceeding.
# We avoid rewriting this file; instead, we ensure commands below are safe.
# Detect CR in this file and re-exec a normalized version via a subshell.
if grep -q "$(printf '\r')" "$0" 2>/dev/null; then
  # shellcheck disable=SC2002
  tr -d '\r' < "$0" > /tmp/entrypoint_normalized.sh
  chmod +x /tmp/entrypoint_normalized.sh
  exec /tmp/entrypoint_normalized.sh "$@"
fi

# Resolve document root
DOC_ROOT="${APACHE_DOCUMENT_ROOT:-/var/www/html}"
if [ ! -d "$DOC_ROOT" ]; then
  echo "Creating document root at $DOC_ROOT"
  mkdir -p "$DOC_ROOT"
fi

# Non-fatal permission adjustment
if command -v chown >/dev/null 2>&1; then
  chown -R www-data:www-data "$DOC_ROOT" || true
fi

echo "[entrypoint] Starting Apache HTTPD with document root: $DOC_ROOT"

# Validate apache2-foreground availability (provided by php:apache image)
if ! command -v apache2-foreground >/dev/null 2>&1; then
  echo "[entrypoint] Error: apache2-foreground command not found in PATH." >&2
  exit 127
fi

# Hand off to Apache (PID 1)
exec apache2-foreground

