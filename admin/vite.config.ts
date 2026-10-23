import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Admin SPA with client-side URL routes (src/lib/route.ts). Vite's dev server
// falls back to index.html for unknown paths by itself. Netlify only rewrites
// the app's own route prefixes (admin/netlify.toml), never a catch-all `/*`:
// `netlify dev` would apply that to Vite's module requests too → blank page.
//
// For local dev with auth/persistence, run:
//   ADMIN_PASSWORD=test SESSION_SECRET=dev-secret npx netlify dev   → :8888
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist', sourcemap: false },
  server: { port: 5174 },
});
