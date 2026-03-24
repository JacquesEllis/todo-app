/// <reference types="vite/client" />

/**
 * Type declarations for Vite environment variables used in packages/frontend.
 * Values are injected at build time from GitHub Actions secrets / .env.local.
 * Never hardcode actual secret values here.
 */
interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY:            string;
  readonly VITE_FIREBASE_AUTH_DOMAIN:        string;
  readonly VITE_FIREBASE_PROJECT_ID:         string;
  readonly VITE_FIREBASE_STORAGE_BUCKET:     string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID:             string;
  readonly VITE_GRAPHQL_API_URL:             string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
