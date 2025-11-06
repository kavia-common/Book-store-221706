import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite configuration for Book-Store-Frontend (React). */
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3002
  },
  preview: {
    host: '0.0.0.0',
    port: 3002
  }
})
