import { defineConfig } from 'vite';
import react            from '@vitejs/plugin-react';
import { resolve }      from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@todo-app/shared': resolve(__dirname, '../shared/src'),
      '@todo-app/ui':     resolve(__dirname, '../ui/src'),
    },
  },
  // Vite only exposes env vars prefixed with VITE_ to client bundles.
  // The GitHub Actions workflow must set VITE_GRAPHQL_API_URL and
  // VITE_FIREBASE_* at build time from the corresponding secrets.
});
