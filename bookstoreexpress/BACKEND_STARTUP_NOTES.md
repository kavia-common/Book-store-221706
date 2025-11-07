# Book-store-backend Startup Notes

This backend is located at `Book-store-221706/bookstoreexpress`.

Dependencies (already listed in package.json):
- express
- cors
- swagger-ui-express
- js-yaml
- dev: nodemon

Scripts:
- npm start — runs `node server.js`
- npm run dev — runs with nodemon for auto-reload

Server binding:
- Listens on `process.env.PORT || 3001`
- Binds host `0.0.0.0` (suitable for Docker/container/cloud)
- CommonJS requires are used (no `"type": "module"` in package.json)

How to install and start:
1) cd Book-store-221706/bookstoreexpress
2) npm install
3) npm start

Endpoints:
- GET /health — http://localhost:3001/health
- GET /docs — http://localhost:3001/docs
- GET /openapi.json — http://localhost:3001/openapi.json
- GET /openapi.yaml — http://localhost:3001/openapi.yaml
