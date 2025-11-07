# syntax=docker/dockerfile:1

# Use a small official PHP image with CLI and built-in web server support
FROM php:8.2-cli-alpine

# Metadata
LABEL maintainer="Book Store Demo"
LABEL org.opencontainers.image.title="Book Store PHP Backend"
LABEL org.opencontainers.image.description="PHP built-in server for the Book Store backend"
LABEL org.opencontainers.image.version="1.0.1"

# Set working directory to the bookstore app
WORKDIR /app

# Copy the bookstore PHP app into the image
# Use .dockerignore to avoid copying unnecessary files
COPY . /app

# Copy and prepare the startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose the port the PHP built-in server will listen on
EXPOSE 3001

# Remove healthcheck to avoid false negatives in ephemeral preview environments
# (Health checks may block container readiness when port mapping is delayed)
# No HEALTHCHECK

# Default command: use robust startup script that ensures docroot and index.php exist
CMD ["/app/start.sh"]
