# Use official PHP-Apache image
FROM php:8.2-apache

# Install required PHP extensions (mysqli and pdo_mysql are used by the app)
RUN set -eux; \
    docker-php-ext-install mysqli pdo pdo_mysql

# Configure Apache document root
ENV APACHE_DOCUMENT_ROOT=/var/www/html

# Copy application code
COPY bookstore/ ${APACHE_DOCUMENT_ROOT}/

# Copy and ensure the entrypoint is executable (LF endings recommended)
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Apache runs on port 80 by default
EXPOSE 80

# Use exec-form ENTRYPOINT for PID 1 signal handling
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
