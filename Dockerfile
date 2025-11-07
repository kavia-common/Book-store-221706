# Use official PHP-Apache image
FROM php:8.2-apache

# Use POSIX /bin/sh for RUN to avoid bash-specific parsing issues
SHELL ["/bin/sh", "-c"]

# Install required PHP extensions (mysqli and pdo_mysql are used by the app)
# Avoid trailing backslashes; single-line ensures no unexpected EOF
RUN set -eu; docker-php-ext-install mysqli pdo pdo_mysql

# Configure Apache document root
ENV APACHE_DOCUMENT_ROOT=/var/www/html

# Copy application code
COPY bookstore/ ${APACHE_DOCUMENT_ROOT}/

# Copy entrypoint and ensure it's executable; also normalize line endings best-effort
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Apache runs on port 80 by default
EXPOSE 80

# Use exec-form ENTRYPOINT for PID 1 signal handling
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
