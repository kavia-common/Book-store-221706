import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite config for the Book Store React frontend. */
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  },
  preview: {
    port: 3000
  }
});
