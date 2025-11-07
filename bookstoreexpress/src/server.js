/**
 * Server bootstrap for the Express app.
 * - Loads environment variables
 * - Listens on PORT (default 3001) and HOST (default 0.0.0.0)
 * - Adds graceful shutdown and basic error handlers
 */

// Safely load environment variables from .env if available without crashing
try {
  // eslint-disable-next-line global-require
  require('dotenv').config();
} catch (e) {
  // If dotenv is not installed or .env is absent, continue with defaults
  console.warn('[startup] dotenv not loaded, proceeding with environment defaults.');
}

const app = require('./app');

// PUBLIC_INTERFACE
function startServer() {
  /** Starts the HTTP server and returns the server instance. */
  const PORT = Number(process.env.PORT) || 3001;
  const HOST = process.env.HOST || '0.0.0.0';

  const server = app
    .listen(PORT, HOST, () => {
      console.log(`Server running at http://${HOST}:${PORT}`);
    })
    .on('error', (err) => {
      console.error('Failed to start HTTP server:', err.message);
      // Common cases: EADDRINUSE, EACCES
      process.exitCode = 1;
    });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Promise Rejection:', reason);
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });

  return server;
}

const server = startServer();
module.exports = server;
