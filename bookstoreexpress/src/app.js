const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

// Initialize express app
const app = express();

// 1) Register ultra-fast readiness endpoints before any other middleware.
// These must never throw and have no async/DB dependencies.
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Service is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Service root',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// 2) Wrap potentially-problematic middleware (CORS/Swagger) with defensive try/catch.
// This ensures readiness endpoints remain operational even if these fail.
try {
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
} catch (e) {
  // Log and continue without CORS rather than crashing
  // eslint-disable-next-line no-console
  console.error('[startup] CORS middleware failed to initialize:', e && e.message ? e.message : e);
}

// Trust proxy for correct protocol when behind reverse proxies
app.set('trust proxy', true);

// Serve Swagger UI with a defensive dynamic server URL
try {
  app.use('/docs', swaggerUi.serve, (req, res, next) => {
    try {
      // Prefer X-Forwarded-Proto/Host if provided by proxy
      const forwardedProto = (req.headers['x-forwarded-proto'] || '').toString().split(',')[0];
      const forwardedHost = (req.headers['x-forwarded-host'] || '').toString().split(',')[0];

      let protocol = (forwardedProto || (req.secure ? 'https' : req.protocol) || 'http').replace(/[^a-z]+/gi, '').toLowerCase();
      if (protocol !== 'http' && protocol !== 'https') protocol = 'http';

      const hostHeader = req.get('host') || 'localhost';
      let host = forwardedHost || hostHeader;
      // If host lacks a port and we know PORT env, append it when not default
      const hasPort = host.includes(':');
      const envPort = Number(process.env.PORT) || 3001;
      const needsPort = !hasPort && ((protocol === 'http' && envPort !== 80) || (protocol === 'https' && envPort !== 443));
      const fullHost = needsPort ? `${host}:${envPort}` : host;

      const dynamicSpec = {
        ...swaggerSpec,
        servers: [
          { url: `${protocol}://${fullHost}` },
        ],
      };

      return swaggerUi.setup(dynamicSpec)(req, res, next);
    } catch (e) {
      // Fall back to static spec if any error happens resolving host/port
      return swaggerUi.setup(swaggerSpec)(req, res, next);
    }
  });
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('[startup] Swagger UI failed to initialize:', e && e.message ? e.message : e);
}

// Parse JSON request body
try {
  app.use(express.json());
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('[startup] express.json() failed to initialize:', e && e.message ? e.message : e);
}

// Mount routes (includes / and /health), but keep defensive in case routes module errors.
try {
  app.use('/', routes);
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('[startup] Failed to mount routes:', e && e.message ? e.message : e);
}

// Error handling middleware
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err && err.stack ? err.stack : err);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

module.exports = app;
