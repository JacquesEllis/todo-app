import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@todo-app/ui': resolve(__dirname, '../ui/src'),
      },
    },
    define: {
      // Expose only the env vars we explicitly allow
    },
  };
});
