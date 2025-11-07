# Book-store-221706 PHP Container

This folder includes a Dockerfile and entrypoint for running the PHP bookstore app on Apache.

Build:
  docker build -t bookstore-php .

Run:
  docker run --rm -p 8080:80 bookstore-php

Then open:
  http://localhost:8080

Notes:
- The image enables mysqli and pdo_mysql extensions used by the PHP code.
- The entrypoint is a minimal Bash script with correct shebang and uses apache2-foreground.
