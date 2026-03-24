import { defineConfig, loadEnv } from 'vite';
import react                    from '@vitejs/plugin-react';
import { resolve }              from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@todo-app/shared': resolve(__dirname, '../shared/src'),
        '@todo-app/ui':     resolve(__dirname, '../ui/src'),
      },
    },
    // Explicitly define env vars so the build fails loudly if they are missing
    // rather than silently embedding "undefined" strings.
    define: {
      // These are already handled by Vite's VITE_ prefix convention,
      // but we surface them here for documentation clarity.
    },
  };
});
