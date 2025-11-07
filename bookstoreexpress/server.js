const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * PUBLIC_INTERFACE
 * Creates and configures the Express application.
 * Exposes:
 *  - GET /health: Returns a simple { status: 'ok' } payload for health checks
 *  - GET /docs: Serves Swagger UI with the OpenAPI specification
 *  - GET /openapi.json: Serves the OpenAPI spec as JSON
 *  - GET /openapi.yaml: Serves the OpenAPI spec as YAML
 */
function createApp() {
  /** This is a public function. */
  const app = express();

  // Basic middleware
  app.use(cors());
  app.use(express.json());

  // Health endpoint
  // PUBLIC_INTERFACE
  app.get('/health', (req, res) => {
    /** Returns a simple ok status for readiness/liveness checks. */
    res.status(200).json({ status: 'ok' });
  });

  // Load OpenAPI spec from YAML, robustly handling errors/missing file
  const openapiYamlPath = path.join(__dirname, 'openapi.yaml');

  let openapiDocument = {};
  try {
    if (fs.existsSync(openapiYamlPath)) {
      const yamlContent = fs.readFileSync(openapiYamlPath, 'utf8');
      openapiDocument = yaml.load(yamlContent);
    } else {
      throw new Error('openapi.yaml not found');
    }
  } catch (err) {
    console.error('Failed to load openapi.yaml:', err.message);
    openapiDocument = {
      openapi: '3.0.3',
      info: {
        title: 'Book Store Backend API',
        version: '1.0.0',
        description: 'Fallback OpenAPI document if YAML file is missing or invalid.'
      },
      servers: [{ url: 'http://localhost:3001', description: 'Local development server' }],
      tags: [{ name: 'Health', description: 'Service liveness and readiness checks' }],
      paths: {
        '/health': {
          get: {
            tags: ['Health'],
            summary: 'Health check',
            description: 'Returns ok status.',
            operationId: 'getHealth',
            responses: {
              '200': {
                description: 'Successful health response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: { status: { type: 'string', example: 'ok' } }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  }

  // Serve raw OpenAPI as JSON and YAML
  // PUBLIC_INTERFACE
  app.get('/openapi.json', (req, res) => {
    /** Serves the OpenAPI spec in JSON format. */
    res.json(openapiDocument);
  });
  // PUBLIC_INTERFACE
  app.get('/openapi.yaml', (req, res) => {
    /** Serves the OpenAPI spec in YAML format. */
    try {
      const yamlStr = yaml.dump(openapiDocument);
      res.type('text/yaml').send(yamlStr);
    } catch (e) {
      res.status(500).json({ error: 'Failed to serialize OpenAPI YAML' });
    }
  });

  // Swagger UI
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument, {
    customSiteTitle: 'Book Store Backend API Docs'
  }));

  return app;
}

// Start server
const app = createApp();

// Read PORT from environment with default 3001, and bind to 0.0.0.0
const PORT = Number(process.env.PORT) || 3001;
const HOST = '0.0.0.0';

// Create the server with explicit host binding for container environments
const server = app.listen(PORT, HOST, () => {
  console.log(`Book-store-backend listening on http://${HOST}:${PORT}`);
  console.log(`Health check:  http://localhost:${PORT}/health`);
  console.log(`Swagger UI:    http://localhost:${PORT}/docs`);
});

// Graceful shutdown on SIGTERM
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

// Also handle SIGINT for local dev (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

module.exports = app;
