import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
export default defineConfig(({ mode }) => {
  /** Vite configuration for the Book Store React frontend. */
  const env = loadEnv(mode, process.cwd(), '');

  // Map REACT_APP_* env vars to import.meta.env for client use
  const defineEnv: Record<string, string> = {};
  Object.keys(env).forEach((key) => {
    if (key.startsWith('REACT_APP_')) {
      defineEnv[`import.meta.env.${key}`] = JSON.stringify(env[key]);
    }
  });

  // Read VITE_PORT from env; default to 3000
  const vitePort = Number(env.VITE_PORT || 3000);

  return {
    plugins: [react()],
    define: {
      ...defineEnv,
    },
    server: {
      // Bind to all interfaces (0.0.0.0)
      host: true,
      port: vitePort,
      strictPort: true,
    },
    preview: {
      host: true,
      port: vitePort,
      strictPort: true,
    },
  };
});
