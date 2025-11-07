/**
 * Express server entrypoint.
 * - Binds to HOST (default 0.0.0.0) and PORT (default 3001)
 * - Loads .env (if present) without hardcoding configuration in code
 * - Adds robust startup logging
 * - Handles unhandled promise rejections and uncaught exceptions
 */
const path = require('path');
try {
  // Load environment variables from .env if available; no error if missing
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
} catch (_) {
  // no-op
}

const app = require('./app');

// Prefer provided env vars; default to 3001 per requirement
const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      {
        event: 'server_start',
        message: `Server listening`,
        url: `http://${HOST}:${PORT}`,
        host: HOST,
        port: PORT,
        nodeEnv: process.env.NODE_ENV || 'development',
        cors: 'enabled',
        timestamp: new Date().toISOString(),
      },
      null,
      0
    )
  );
});

// Handle unhandled rejections globally to avoid silent crashes
process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line no-console
  console.error('[unhandledRejection]', reason);
});

// Handle uncaught exceptions with log then allow process manager to decide
process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.error('[uncaughtException]', err);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;
