import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/index';

export default function SignInPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('[SignIn]', err);
      setError(err.message ?? 'Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Todo App</h1>
        <p className="text-gray-500 text-sm mb-8">Sign in to manage your tasks</p>

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="
            w-full flex items-center justify-center gap-3
            px-4 py-2.5 rounded-lg border border-gray-200
            bg-white hover:bg-gray-50 active:bg-gray-100
            text-gray-700 text-sm font-medium
            transition-colors shadow-sm
            focus:outline-none focus:ring-2 focus:ring-brand-500
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          aria-label="Sign in with Google"
        >
          {loading ? 'Signing in…' : 'Sign in with Google'}
        </button>

        {error && (
          <p className="mt-4 text-red-500 text-xs">{error}</p>
        )}
      </div>
    </div>
  );
}
