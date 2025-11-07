#!/bin/sh
# Minimal, POSIX-safe entrypoint for php:apache-based image.
# Requirements:
# - LF line endings
# - Executable bit set
# - No BOM at file start
# - Ends with a trailing newline
# - Avoid bashisms; this script must run with /bin/sh

# Fail fast; treat unset vars as errors
set -eu
# Best-effort pipefail enable where supported (no-op on plain sh)
( set -o pipefail ) 2>/dev/null || true

# Ensure document root exists
DOC_ROOT="${APACHE_DOCUMENT_ROOT:-/var/www/html}"
if [ ! -d "${DOC_ROOT}" ]; then
  echo "[entrypoint] Creating document root at: ${DOC_ROOT}"
  mkdir -p "${DOC_ROOT}"
fi

# Non-fatal permission adjustment (ignore errors if running rootless)
if command -v chown >/dev/null 2>&1; then
  chown -R www-data:www-data "${DOC_ROOT}" || true
fi

# Diagnostics to help with container startup issues
echo "[entrypoint] PATH: ${PATH}"
echo "[entrypoint] Apache document root: ${DOC_ROOT}"

# Validate apache2-foreground availability (provided by php:apache)
if ! command -v apache2-foreground >/dev/null 2>&1; then
  echo "[entrypoint] Error: apache2-foreground command not found in PATH." >&2
  exit 127
fi

# Lightweight self-check to catch unexpected EOF issues early
echo "[entrypoint] Entrypoint script loaded successfully."

# Exec Apache in foreground (PID 1 handoff)
exec apache2-foreground
