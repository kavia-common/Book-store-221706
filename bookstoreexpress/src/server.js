/**
 * Server bootstrap for the Express app.
 * - Loads environment variables
 * - Listens on PORT (default 3001) and HOST (default 0.0.0.0)
 * - Adds graceful shutdown and basic error handlers
 */

// Load environment variables as early as possible
try {
  // eslint-disable-next-line global-require
  require('dotenv').config();
} catch (e) {
  if (e && e.code === 'MODULE_NOT_FOUND') {
    console.error('dotenv module not found. Please ensure it is installed as a dependency.');
    throw e;
  } else {
    console.error('dotenv load error', e);
  }
}

const app = require('./app');

// PUBLIC_INTERFACE
function startServer() {
  /** Starts the HTTP server and returns the server instance. */
  const PORT = Number(process.env.PORT) || 3001;
  const HOST = '0.0.0.0'; // Explicitly bind to all interfaces

  const server = app
    .listen(PORT, HOST, () => {
      console.log(`[startup] Express server is listening on http://${HOST}:${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
    })
    .on('error', (err) => {
      console.error('Failed to start HTTP server:', err.message);
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

let serverInstance = null;
try {
  // Attempt to start the server and capture the instance
  serverInstance = startServer();
} catch (err) {
  // Minimal catch to ensure startup errors are logged clearly
  // Without crashing the process silently
  // eslint-disable-next-line no-console
  console.error('[startup] Unhandled error while starting server:', err);
  process.exitCode = 1;
}
module.exports = serverInstance;
