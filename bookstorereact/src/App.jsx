import React from 'react';

/**
 * PUBLIC_INTERFACE
 * App: Minimal application shell to verify the frontend is running.
 * Props:
 * - envMode: Vite's build mode string
 * - nodeEnv: Derived node environment label
 * - viteVersion: Optional custom version field
 * Returns:
 * - A simple UI with a prominent header and a status panel showing environment info.
 */
export default function App({ envMode, nodeEnv, viteVersion }) {
  return (
    <div className="app">
      <header className="app-header" role="banner" aria-label="Book Store Frontend Header">
        <h1>Book Store Frontend is running</h1>
        <p className="subtitle">React + Vite scaffold</p>
      </header>

      <main className="app-main" role="main">
        <section aria-labelledby="status-heading" className="status-card">
          <h2 id="status-heading">Build/Runtime Status</h2>
          <ul>
            <li>
              <strong>Vite MODE:</strong> <code>{String(envMode)}</code>
            </li>
            <li>
              <strong>NODE_ENV:</strong> <code>{String(nodeEnv)}</code>
            </li>
            <li>
              <strong>App Version:</strong> <code>{String(viteVersion)}</code>
            </li>
          </ul>
          <p>
            If you can see this, the frontend preview is working. You can now start adding components and routes.
          </p>
        </section>
      </main>

      <footer className="app-footer" role="contentinfo">
        <small>© {new Date().getFullYear()} Book Store Frontend</small>
      </footer>
    </div>
  );
}
