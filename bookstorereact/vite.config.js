import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite configuration for Book Store frontend.
   * - Uses React plugin
   * - Binds to 0.0.0.0 on port 3000 for dev server readiness.
   */
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true
  }
});
