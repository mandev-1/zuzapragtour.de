import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Admin SPA — a SINGLE page with no client-side routes (all view switching is
// internal state), so it needs no SPA-fallback `/* → /index.html` redirect.
// That's deliberate: any such redirect (in netlify.toml or a _redirects file)
// is also applied by `netlify dev`, where it rewrites Vite's own module
// requests (/src/main.tsx, /@vite/client) to HTML → blank page. Keeping NONE
// anywhere is what makes `netlify dev` serve the app cleanly on :8888.
//
// For local dev with auth/persistence, run:
//   ADMIN_PASSWORD=test SESSION_SECRET=dev-secret npx netlify dev   → :8888
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist', sourcemap: false },
  server: { port: 5174 },
});
