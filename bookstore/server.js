'use strict';

/**
 * PUBLIC_INTERFACE
 * Lightweight dev server wrapper for preview environments.
 * - Binds to 0.0.0.0:3001
 * - Serves static assets from current directory
 * - Treats .php files as plain HTML fallback when no PHP runtime is available
 * - If php-cgi is available, will proxy .php requests to php-cgi for dynamic handling
 *
 * Note: This is intended for preview/dev only and is not a production PHP runtime.
 */

const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT) || 3001;
const DOCROOT = process.env.DOCROOT || path.resolve(__dirname);

// Check if php-cgi exists to optionally support dynamic PHP execution
function findPhpCgiBinary() {
  const candidates = ['php-cgi', '/usr/bin/php-cgi', '/usr/local/bin/php-cgi'];
  for (const bin of candidates) {
    try {
      // Synchronously check if binary exists and is executable
      fs.accessSync(bin, fs.constants.X_OK);
      return bin;
    } catch (_) {
      /* continue */
    }
  }
  return null;
}

const app = express();

// Basic health endpoint for preview readiness checks
// PUBLIC_INTERFACE
app.get('/healthz', (req, res) => {
  /** Responds with basic JSON to confirm server is up */
  res.json({ status: 'ok', docroot: DOCROOT, phpCgi: Boolean(findPhpCgiBinary()) });
});

// Serve static assets with sensible caching for images/css/js
app.use(express.static(DOCROOT, {
  etag: true,
  lastModified: true,
  index: false,
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.css', '.js', '.ico', '.webp'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    } else {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Optional: Handle .php via php-cgi if available; otherwise, serve as plain text/HTML
const phpCgiBin = findPhpCgiBinary();

app.use(async (req, res, next) => {
  const urlPath = decodeURIComponent(req.path.split('?')[0]);
  const filePath = path.join(DOCROOT, urlPath);

  // Only handle .php files here
  if (path.extname(filePath).toLowerCase() !== '.php') {
    return next();
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Not Found');
  }

  if (!phpCgiBin) {
    // Fallback: no PHP runtime; serve .php as text/html so preview shows something
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // Simple notice banner to indicate fallback mode
    const banner = '<!-- Served as static content: PHP not available in preview -->\n';
    return res.send(banner + fileContent);
  }

  // php-cgi execution path (best-effort)
  // SECURITY NOTE: This is for preview only. No input sanitization, do not use in production.
  try {
    const env = {
      ...process.env,
      GATEWAY_INTERFACE: 'CGI/1.1',
      REQUEST_METHOD: req.method,
      SCRIPT_FILENAME: filePath,
      SCRIPT_NAME: urlPath,
      QUERY_STRING: require('url').parse(req.url).query || '',
      SERVER_SOFTWARE: 'node-express-php-cgi',
      REMOTE_ADDR: req.ip || '',
      CONTENT_TYPE: req.headers['content-type'] || '',
      CONTENT_LENGTH: req.headers['content-length'] || '0',
      SERVER_PROTOCOL: 'HTTP/1.1',
      SERVER_PORT: String(PORT),
      SERVER_NAME: req.hostname || 'localhost',
      REDIRECT_STATUS: '200',
    };

    const php = spawn(phpCgiBin, [], { env });

    let body = Buffer.alloc(0);
    req.on('data', (chunk) => { body = Buffer.concat([body, chunk]); });
    req.on('end', () => {
      php.stdin.write(body);
      php.stdin.end();
    });

    let stdout = Buffer.alloc(0);
    let stderr = Buffer.alloc(0);

    php.stdout.on('data', (d) => { stdout = Buffer.concat([stdout, d]); });
    php.stderr.on('data', (d) => { stderr = Buffer.concat([stderr, d]); });

    php.on('close', (code) => {
      if (stderr.length) {
        console.warn('php-cgi stderr:', stderr.toString());
      }
      // Parse headers from CGI output
      const outStr = stdout.toString('binary');
      const headerEnd = outStr.indexOf('\r\n\r\n') >= 0 ? outStr.indexOf('\r\n\r\n') : outStr.indexOf('\n\n');

      if (headerEnd >= 0) {
        const headerText = outStr.substring(0, headerEnd);
        const bodyText = outStr.substring(headerEnd + (outStr.includes('\r\n\r\n') ? 4 : 2));

        // Apply headers
        headerText.split(/\r?\n/).forEach((line) => {
          const idx = line.indexOf(':');
          if (idx > 0) {
            const key = line.substring(0, idx).trim();
            const val = line.substring(idx + 1).trim();
            if (key.toLowerCase() === 'status') {
              const statusCode = parseInt(val, 10);
              if (!Number.isNaN(statusCode)) {
                res.status(statusCode);
              }
            } else {
              res.setHeader(key, val);
            }
          }
        });

        // Default content-type if not provided
        if (!res.getHeader('Content-Type')) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
        }
        return res.send(Buffer.from(bodyText, 'binary'));
      }

      // If no CGI headers, just return raw output
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(stdout);
    });
  } catch (err) {
    console.error('Error running php-cgi:', err);
    res.status(500).send('PHP execution error in preview');
  }
});

// Root handler: serve index.php if present; otherwise index.html; else a simple page
// PUBLIC_INTERFACE
app.get('/', (req, res) => {
  /**
   * Returns an index file if present to satisfy preview readiness.
   */
  const indexPhp = path.join(DOCROOT, 'index.php');
  const indexHtml = path.join(DOCROOT, 'index.html');

  if (fs.existsSync(indexPhp)) {
    // Delegate to php handling by rewriting request
    req.url = '/index.php';
    return app._router.handle(req, res, () => res.end());
  }
  if (fs.existsSync(indexHtml)) {
    return res.sendFile(indexHtml);
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Bookstore backend (preview)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: Arial, sans-serif; background:#f6f8fb; color:#0e1116; margin:0; padding:2rem;}
    .card { max-width:720px; margin:0 auto; background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:1.25rem;}
    h1 { color:#003366; margin:0 0 .5rem 0;}
    code { background:#f1f5f9; padding:0 .25rem; border-radius:4px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Bookstore backend (preview)</h1>
    <p>Express static server is running on <code>${HOST}:${PORT}</code>.</p>
    <p>PHP dynamic execution: <strong>${phpCgiBin ? 'enabled via php-cgi' : 'not available (serving .php as static)'}</strong>.</p>
    <p>Place your files in <code>${DOCROOT}</code>. If <code>index.php</code> or <code>index.html</code> exists, it will be served at <code>/</code>.</p>
  </div>
</body>
</html>`);
});

// Fallback: try to serve any file path directly (including index.php if user navigates to it)
app.use((req, res, next) => {
  const urlPath = decodeURIComponent(req.path.split('?')[0]);
  const filePath = path.join(DOCROOT, urlPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }
  next();
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Preview dev server listening at http://${HOST}:${PORT} (docroot: ${DOCROOT})`);
  console.log(`PHP-CGI ${phpCgiBin ? 'detected' : 'not detected'}; ${phpCgiBin ? 'dynamic PHP enabled' : 'serving .php as static HTML'}`);
});
