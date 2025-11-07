import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite configuration for Book Store frontend.
   * - Uses React plugin
   * - No hardcoded port; respects environment or defaults.
   */
  plugins: [react()],
  server: {
    // Let platform define the port; Vite defaults to 5173 if not specified.
    strictPort: false
  }
});
