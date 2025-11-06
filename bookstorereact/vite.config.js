import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite configuration for Book-Store-Frontend (React). */
  plugins: [react()],
  server: {
    host: true
  },
  preview: {
    host: true,
    port: 3002
  }
})
