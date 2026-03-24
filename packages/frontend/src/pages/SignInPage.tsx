import { useState }                    from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth }                        from '../firebase';

/**
 * Full-page sign-in screen.
 * Uses Firebase Google popup auth — no direct Firestore access.
 */
export default function SignInPage(): JSX.Element {
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (): Promise<void> => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Auth state update is handled by useAuth — no manual redirect needed
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Sign-in failed. Please try again.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center gap-6 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-800">Task Manager</h1>
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
            bg-white border border-gray-300 rounded-lg px-4 py-3
            text-sm font-medium text-gray-700
            hover:bg-gray-50 transition-colors
            focus:outline-none focus:ring-2 focus:ring-brand-500
          "
        >
          {/* Google 'G' logo — inline SVG avoids an asset import */}
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209
                 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567
                 2.684-3.874 2.684-6.615z"
              fill="#4285F4"
            />
            <path
              d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.837.86-3.047.86-2.344
                 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
              fill="#34A853"
            />
            <path
              d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996
                 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              fill="#FBBC05"
            />
            <path
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9
                 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
