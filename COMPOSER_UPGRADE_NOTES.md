# Composer Dependency Update — Book-store-221706

This repository did not include a composer.json previously. A minimal Composer configuration has been added to allow managing PHP/platform requirements and future libraries.

Current PHP codebase does not use any third-party Composer libraries; it relies on built-in extensions (PDO, PDO MySQL, mysqli). The Dockerfile already installs the necessary PHP extensions.

What was added
- composer.json with:
  - PHP platform requirement: ^8.2 (matches Dockerfile base php:8.2-apache)
  - Required extensions: ext-pdo, ext-pdo_mysql, ext-mysqli
  - PSR-4 autoload namespace reserved: BookStore\\ -> bookstore/src/ (directory can be created later for classes)
  - Scripts to optimize autoload after install/update

What you need to do locally or in CI
1) Ensure Composer is installed:
   - curl -sS https://getcomposer.org/installer | php
   - mv composer.phar /usr/local/bin/composer

2) From the container root (Book-store-221706), install dependencies and create/update lockfile:
   - composer install            # creates vendor/ and composer.lock
   - composer update             # updates to latest compatible versions and refreshes composer.lock

3) Validate autoload:
   - If you introduce namespaced PHP classes under bookstore/src/, they will autoload via vendor/autoload.php.
   - Include autoload in entry points only when you add Composer packages or custom classes:
     <?php require __DIR__ . '/../vendor/autoload.php'; ?>

Notes
- No application code changes were made as the app currently does not consume Composer libraries.
- Docker image already has required PHP extensions enabled via docker-php-ext-install.
- If you change PHP version in Dockerfile, update composer.json "php" constraint accordingly.

Troubleshooting
- If Composer fails due to missing PHP CLI, install php-cli (on Debian/Ubuntu: apt-get update && apt-get install -y php-cli).
- In CI, cache the Composer cache directory (~/.composer or /tmp/cache) for faster installs.
