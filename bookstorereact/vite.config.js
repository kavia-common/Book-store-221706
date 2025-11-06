import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite configuration for Book-Store-Frontend (React).
   * Note: To support Kavia Cloud preview environments, we bind to 0.0.0.0 and
   * explicitly allow the reported host via server.allowedHosts.
   * This change does not affect production builds.
   */
  plugins: [react()],
  server: {
    // Bind to all interfaces to be reachable by preview/CI
    // Setting host to true or '0.0.0.0' exposes the server externally.
    host: '0.0.0.0',
    port: 3000,
    // Allow the preview domain to connect without being blocked by Vite's host check
    allowedHosts: ['vscode-internal-24350-beta.beta01.cloud.kavia.ai']
  },
  preview: {
    host: '0.0.0.0',
    port: 3000
  }
})
