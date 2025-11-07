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
  console.log(`[startup] Attempting to bind HTTP server on ${HOST}:${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);

  const server = app
    .listen(PORT, HOST, () => {
      console.log(`Server running at http://${HOST}:${PORT}`);
    })
    .on('error', (err) => {
      // Robust error handling for common listen errors
      if (err && (err.code === 'EADDRINUSE' || err.code === 'EACCES')) {
        const hints = {
          EADDRINUSE: [
            `Port ${PORT} is already in use on host ${HOST}.`,
            'Hint: Another instance may already be running.',
            'Actions:',
            `- If in development, kill the existing process using this port.`,
            `- Or set a different PORT in environment variables.`,
          ],
          EACCES: [
            `Insufficient privileges to bind to ${HOST}:${PORT}.`,
            'Actions:',
            '- Try a higher, non-privileged port (>=1024).',
            '- Ensure the user has permission to bind to this port.',
          ],
        }[err.code];

        console.error(`[startup] Listen error (${err.code}): ${err.message}`);
        if (hints) {
          console.error(hints.join('\n'));
        }
      } else {
        console.error('Failed to start HTTP server:', err && err.message ? err.message : err);
      }
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
