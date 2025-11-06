import React from 'react'

// PUBLIC_INTERFACE
export default function App() {
  /** Basic App component; includes a health-check section. */
  return (
    <div className="app">
      <header className="header">
        <h1>Book Store Frontend</h1>
        <p>Vite + React scaffold is working.</p>
      </header>

      <section className="content">
        <h2>Health Check</h2>
        <p>Status: OK</p>
        <p>
          Dev: npm run dev
          <br />
          Build: npm run build
          <br />
          Preview: npm run preview (port 3000)
        </p>
      </section>
    </div>
  )
}
