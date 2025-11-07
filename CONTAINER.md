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
- The entrypoint is a minimal POSIX sh script (#!/usr/bin/env sh) that execs apache2-foreground for proper PID 1 signal handling.

Troubleshooting (syntax error: unexpected end of file):
- Ensure entrypoint.sh uses LF line endings (no CRLF). If editing on Windows, convert to LF.
- Verify there is no BOM at the start of the file and the file ends with a trailing newline.
- Confirm the file is executable: chmod +x docker/entrypoint.sh (Dockerfile already does this).
- The script uses only POSIX-sh compatible syntax (no bashisms) since it runs under /bin/sh.
- If you still see errors, rebuild without cache: docker build --no-cache -t bookstore-php .
