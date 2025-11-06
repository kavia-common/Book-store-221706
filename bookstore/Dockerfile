# Lightweight PHP 8 built-in web server for bookstore backend
FROM php:8.2-cli-alpine

# Set working directory to /app
WORKDIR /app

# Copy application code
COPY . /app

# Expose PORT (default 3001). Platforms often inject $PORT dynamically.
ENV PORT=3001

# Healthcheck to ensure server responsiveness
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT}/ || exit 1

# Serve from document root "/app" with router "router.php"
# Using built-in PHP server; this image supplies the php binary.
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT} -t /app /app/router.php"]
