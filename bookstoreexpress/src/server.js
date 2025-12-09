/**
 * Server bootstrap for the Express app.
 * - Loads environment variables
 * - Listens on PORT (default 3001) and HOST (default 0.0.0.0)
 * - Adds graceful shutdown and basic error handlers
 */
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

// PUBLIC_INTERFACE
function startServer() {
  /** Starts the HTTP server and returns the server instance. */
  const PORT = Number(process.env.PORT) || 3001;
  const HOST = process.env.HOST || '0.0.0.0';

  // Extra startup diagnostics
  const env = process.env.NODE_ENV || 'development';
  // eslint-disable-next-line no-console
  console.log(`[startup] Attempting to bind HTTP server on ${HOST}:${PORT} (NODE_ENV=${env}, pid=${process.pid})`);

  const server = app
    .listen(PORT, HOST, () => {
      const url = `http://${HOST}:${PORT}`;
      // eslint-disable-next-line no-console
      console.log(`[startup] Server listening on ${url} (pid=${process.pid})`);
      // eslint-disable-next-line no-console
      console.log(`[startup] Health: ${url}/health  |  Docs: ${url.replace(/\/+$/, '')}/docs`);
    })
    .on('error', (err) => {
      // Robust error handling for common listen errors
      if (err && (err.code === 'EADDRINUSE' || err.code === 'EACCES')) {
        const hints = {
          EADDRINUSE: [
            `Port ${PORT} is already in use on host ${HOST}.`,
            'Hint: Another instance may already be running.',
            'Actions:',
            `- Respect the existing process if managed by the platform (hot reload may pick changes).`,
            `- Or set a different PORT in the .env file or environment variables.`,
          ],
          EACCES: [
            `Insufficient privileges to bind to ${HOST}:${PORT}.`,
            'Actions:',
            '- Try a higher, non-privileged port (>=1024).',
            '- Ensure the user has permission to bind to this port.',
          ],
        }[err.code];

        // eslint-disable-next-line no-console
        console.error(`[startup] Listen error (${err.code}): ${err.message}`);
        if (hints) {
          // eslint-disable-next-line no-console
          console.error(hints.join('\n'));
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('[startup] Failed to start HTTP server:', err && err.message ? err.message : err);
      }
      process.exitCode = 1;
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

  // Startup global error logs
  process.on('unhandledRejection', (reason) => {
    // eslint-disable-next-line no-console
    console.error('Unhandled Promise Rejection:', reason);
  });

  process.on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.error('Uncaught Exception:', err);
  });

  return server;
}

const server = startServer();
module.exports = server;
