# Linting and Security Audit — How To

Express (bookstoreexpress)
- Install deps and run ESLint:
  npm ci --ignore-scripts
  npx eslint .

- Auto-fix:
  npx eslint . --fix

- Audit production deps:
  npm audit --omit=dev
  npm audit fix

React (bookstorereact)
- Install deps:
  npm ci
- Lint:
  npx eslint .
- Dev server (dev only):
  npm start
- Build:
  npm run build
- Audit (prod deps):
  npm audit --omit=dev

PHP (bookstore)
- Recommended tools (via Composer): 
  squizlabs/php_codesniffer, phpstan/phpstan
- Example (after adding composer.json):
  vendor/bin/phpcs --standard=phpcs.xml
  vendor/bin/phpstan analyse --level=max bookstore

Notes
- For production deploys, restrict CORS in Express and consider gating /docs behind NODE_ENV=development.
- In PHP app, prioritize migrating to prepared statements and password hashing immediately.
