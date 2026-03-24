import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

/**
 * SignInPage
 *
 * Displayed when the user is not authenticated.
 * Copy is sourced from the UX spec:
 * https://github.com/JacquesEllis/ai-bot-profiles/blob/main/docs/ux/
 */
export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Auth state change is handled by useAuth in App.tsx — no redirect needed here.
    } catch (err) {
      // Show a user-friendly error message on failure (e.g. popup closed, network error)
      setError('Sign-in failed. Please try again.');
      // Log for debugging in development
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console -- intentional dev-only logging
        console.error('Sign-in error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
        <p className="text-sm text-gray-500 text-center">
          Sign in to manage your tasks
        </p>

        {error && (
          <p role="alert" className="text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSignIn}
          className="
            w-full flex items-center justify-center gap-3
            px-4 py-2.5 rounded-lg border border-gray-300
            text-sm font-medium text-gray-700
            hover:bg-gray-50 transition-colors
            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
          "
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 48 48"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.7 2.3 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13 17.8 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.5-4.1 7.1-10.2 7.1-17.1z"
            />
            <path
              fill="#FBBC05"
              d="M10.6 28.6A14.7 14.7 0 0 1 9.5 24c0-1.6.3-3.1.7-4.5l-7.9-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.7 10.7l7.9-6.1z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2 1.4-4.7 2.2-7.6 2.2-6.2 0-11.5-4.2-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
