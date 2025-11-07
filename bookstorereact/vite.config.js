import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite config for the Book Store React frontend. */
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    open: false,
    // Allow the VS Code web host to access the dev server
    allowedHosts: ['vscode-internal-29901-beta.beta01.cloud.kavia.ai']
  },
  preview: {
    host: true,
    port: 3000,
    strictPort: true,
    // Allow the VS Code web host to access the preview server
    allowedHosts: ['vscode-internal-29901-beta.beta01.cloud.kavia.ai']
  }
});
