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

  return {
    plugins: [react()],
    define: {
      ...defineEnv,
    },
    server: {
      host: true,
      port: Number(env.REACT_APP_PORT || 5173),
    },
    preview: {
      host: true,
      port: Number(env.REACT_APP_PORT || 5173),
    },
  };
});
