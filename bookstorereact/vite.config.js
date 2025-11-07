import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
// Export Vite configuration for the React app.
// - Uses @vitejs/plugin-react for React Fast Refresh and JSX.
// - Server port is not hardcoded in the config; runtime scripts can set it.
// - Preview script uses port 3000 via package.json to cooperate with platform mapping.
export default defineConfig({
  plugins: [react()],
  server: {
    // Use environment PORT if provided; otherwise default. Avoid hardcoding 3001.
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    strictPort: false,
    host: true
  },
  preview: {
    // Preview will be started via npm run preview which sets strictPort true in package.json
    host: true
  }
});
