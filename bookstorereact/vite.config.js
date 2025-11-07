import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
// Export Vite configuration for the React app.
// - Uses @vitejs/plugin-react for React Fast Refresh and JSX.
// - Server binds to all interfaces for preview compatibility.
// - Preview/server port explicitly set to 3000 to align with platform expectations.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,    // 0.0.0.0
    port: 3000
  },
  preview: {
    host: true,    // 0.0.0.0
    port: 3000
  }
});
