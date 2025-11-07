# syntax=docker/dockerfile:1

# Use a small official PHP image with CLI and built-in web server support
FROM php:8.2-cli-alpine

# Metadata
LABEL maintainer="Book Store Demo"
LABEL org.opencontainers.image.title="Book Store PHP Backend"
LABEL org.opencontainers.image.description="PHP built-in server for the Book Store backend"
LABEL org.opencontainers.image.version="1.0.0"

# Set working directory to the bookstore app
WORKDIR /var/www/bookstore

# Copy the bookstore PHP app into the image
# Use .dockerignore to avoid copying unnecessary files
COPY . /var/www/bookstore

# Expose the port the PHP built-in server will listen on
EXPOSE 3001

# Healthcheck: basic TCP check on 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD nc -z 127.0.0.1 3001 || exit 1

# Default command: start PHP built-in server serving current directory
# Note: This only serves static/dynamic PHP files; MySQL connectivity requires an external DB.
CMD ["php", "-S", "0.0.0.0:3001", "-t", "."]
