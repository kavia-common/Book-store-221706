import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite configuration for Book-Store-Frontend (React). */
  plugins: [react()],
  server: {
    // Bind to all interfaces to be reachable by preview/CI
    host: '0.0.0.0',
    port: 3000,
    // Allow preview system hostname to connect (fixes "blocked host" error)
    allowedHosts: ['vscode-internal-23619-beta.beta01.cloud.kavia.ai']
  },
  preview: {
    host: '0.0.0.0',
    port: 3000
  }
})
