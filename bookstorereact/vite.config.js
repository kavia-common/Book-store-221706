import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
// Export Vite configuration for the React app.
// - Uses @vitejs/plugin-react for React Fast Refresh and JSX.
// - Server binds to all interfaces for preview compatibility.
// - Preview port is controlled via package.json (3001).
export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  preview: {
    host: true
  }
});
