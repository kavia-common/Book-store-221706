const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

// Initialize express app
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Trust proxy for correct protocol when behind reverse proxies
app.set('trust proxy', true);

// Serve Swagger UI with a defensive dynamic server URL
app.use('/docs', swaggerUi.serve, (req, res, next) => {
  try {
    // Prefer X-Forwarded-Proto/Host if provided by proxy
    const forwardedProto = (req.headers['x-forwarded-proto'] || '').toString().split(',')[0];
    const forwardedHost = (req.headers['x-forwarded-host'] || '').toString().split(',')[0];

    let protocol = (forwardedProto || (req.secure ? 'https' : req.protocol) || 'http').replace(/[^a-z]+/gi, '').toLowerCase();
    if (protocol !== 'http' && protocol !== 'https') protocol = 'http';

    let host = forwardedHost || req.get('host') || 'localhost';
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

// Parse JSON request body
app.use(express.json());

// Mount routes (includes / and /health)
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

module.exports = app;
