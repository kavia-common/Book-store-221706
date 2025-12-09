# Static Analysis Report — Book Store Project

Date: 2025-12-09

Scope:
- Book-store-221706/bookstore (PHP monolith)
- Book-store-221706/bookstoreexpress (Express backend)
- Book-store-221706/bookstorereact (React frontend)

Summary of Findings
- Critical/High risks identified in PHP code (password storage, SQL injection).
- Express backend has one high severity transitive vulnerability and several moderate/low issues.
- React frontend minimal issues; ensure CI linting/audit.

Detailed Findings

1) PHP Monolith (bookstore)
- Critical: Plaintext password storage in Users.Password.
  • Fix: Use password_hash() on write and password_verify() on login; migrate existing users.
- High: SQL injection risk across multiple files due to string concatenation builds.
  • Files: index.php, checkout.php, register.php, edituser.php.
  • Fix: Migrate to prepared statements with bound parameters (PDO or mysqli consistently).
- Moderate: Session fixation risk.
  • Fix: session_regenerate_id(true) upon successful login; set secure cookie flags.
- Moderate/High: Missing CSRF tokens on POST forms (login, register, edit profile, checkout).
  • Fix: Add per-session CSRF tokens and verify on POST.
- Moderate: XSS potential due to unescaped outputs.
  • Fix: Use htmlspecialchars($val, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') for output.
- Moderate: Input validation logic bugs (e.g., inverted filter_var email checks).
  • Fix: Correct conditional logic and centralize validation.
- High: DB credentials hardcoded in connectDB.php and use of root with empty password.
  • Fix: Move credentials to environment, create least-privileged DB user with strong password.

Recommended next steps (PHP)
- Establish a DB access layer using PDO with prepared statements.
- Implement password hashing, session hardening, CSRF protection.
- Add Composer with phpstan/phpcs; run phpcs using existing phpcs.xml.

2) Express Backend (bookstoreexpress)
- ESLint:
  • Errors: quotes rule violations in src/server.js lines ~39–40.
  • Warnings: Unused eslint-disable directives for no-console in app/server.
  • Fix: Apply `npx eslint . --fix` and remove unnecessary disables.

- Security smells:
  • CORS origin: '*' (open). Restrict in production via allowlist (env-driven).
  • Swagger UI exposed at /docs even in production. Gate behind NODE_ENV or auth.

- Dependency vulnerabilities (npm audit):
  • High: validator (URL validation bypass).
  • Moderate: js-yaml (prototype pollution).
  • Low/Moderate: brace-expansion (ReDoS).
  • Fix: `npm audit fix`. If unresolved, manually upgrade offending packages.

- Deprecated transitive packages:
  • inflight, glob v7, lodash.isequal, lodash.get.
  • Fix: Upgrade dependencies to versions that remove these transitive deps; refactor to native APIs where directly used.

3) React Frontend (bookstorereact)
- Linting/Audit:
  • Ensure lockfile present and run ESLint; minimal code suggests clean lint.
  • DevServer allowedHosts: 'all' is for dev only; not used in production builds.

- Vulnerabilities:
  • None reported for production deps in attempted run (context-limited).
  • Keep dev deps current.

CI/Process Recommendations
- Add Composer and tools for PHP: phpstan, squizlabs/php_codesniffer.
- Create GitHub Actions/CI to run:
  • PHP: phpcs with phpcs.xml; phpstan level 5+.
  • Node (Express, React): npm ci, npx eslint ., npm audit --omit=dev.
- Introduce environment-based config for CORS and Swagger docs exposure.
- Consider SAST (e.g., Semgrep) with security rules for PHP/JS.

Appendix: Commands
- Express: npm audit fix
- Express lint fix: npx eslint . --fix
- React: npm install; npx eslint .
- PHP: add composer.json, require tools, then vendor/bin/phpcs --standard=phpcs.xml
