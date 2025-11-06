#!/usr/bin/env bash
# PUBLIC_INTERFACE
# start-frontend.sh - Starts the React frontend using Vite on 0.0.0.0:3000
set -eu
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${SCRIPT_DIR}/bookstorereact"

# Use npm if available; otherwise attempt pnpm/yarn. Default to npm.
PKG="npm"
if command -v npm >/dev/null 2>&1; then
  PKG="npm"
elif command -v pnpm >/dev/null 2>&1; then
  PKG="pnpm"
elif command -v yarn >/dev/null 2>&1; then
  PKG="yarn"
fi

echo "[start-frontend] Installing dependencies with ${PKG}..."
if [ "${PKG}" = "npm" ]; then
  npm ci || npm install
  exec npm start
elif [ "${PKG}" = "pnpm" ]; then
  pnpm install --frozen-lockfile=false || pnpm install
  exec pnpm run start
else
  yarn install --frozen-lockfile || yarn install
  exec yarn start
fi
