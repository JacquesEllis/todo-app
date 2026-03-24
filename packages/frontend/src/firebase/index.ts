import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth }                         from 'firebase/auth';

/**
 * Firebase configuration is sourced entirely from environment variables.
 * In CI these are injected as GitHub Actions secrets.
 * Locally they live in packages/frontend/.env.local (git-ignored).
 */
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Prevent re-initialising the app during hot-module replacement
const app  = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
