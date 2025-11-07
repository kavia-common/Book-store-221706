# Book-store-backend (Express)

Minimal Express backend used by the Book Store project.

How to run
- Install dependencies: npm install
- Start server: npm start
- The server binds to HOST:PORT with defaults HOST=0.0.0.0 and PORT=3001
- Health checks:
  - GET / returns JSON health
  - GET /health returns JSON health
- Swagger UI is available at /docs

Environment
- Copy .env.example to .env to override PORT, HOST, and NODE_ENV.

Notes
- The server includes robust error handling and graceful shutdown.
- Swagger server URL is derived safely and will work behind proxies.
