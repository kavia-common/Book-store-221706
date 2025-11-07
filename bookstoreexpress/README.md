# Book-store-backend (Express)

Minimal Express server providing:
- GET /health — health check
- GET /docs — Swagger UI
- GET /openapi.json and /openapi.yaml — OpenAPI spec

Scripts:
- npm start — starts server with Node (defaults to port 3001; override with PORT env)
- npm run dev — starts with nodemon auto-reload

Dependencies:
- express, cors, swagger-ui-express, js-yaml
- dev: nodemon

Start:
1) cd Book-store-221706/bookstoreexpress
2) npm install
3) npm start
Then visit:
- http://localhost:3001/health
- http://localhost:3001/docs
