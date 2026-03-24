import { useQuery, gql } from '@apollo/client';
import { useAuth } from './hooks/useAuth.js';
import { auth } from './firebase/index.js';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

function HelloWorld() {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-sm animate-pulse">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full mx-4">
          <h2 className="text-red-700 font-semibold text-base mb-1">Something went wrong</h2>
          <p className="text-red-600 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 max-w-md w-full mx-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Hello World</h1>
        <p className="text-gray-600 text-sm">{data?.hello}</p>
      </div>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-sm animate-pulse">Loading…</p>
      </div>
    );
  }

  // Hello World epic: render query result for authenticated users
  // Non-authenticated users see a sign-in prompt
  if (!user) {
    return <SignInPage />;
  }

  return <HelloWorld />;
}

function SignInPage() {
  async function handleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Sign-in failed:', err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 max-w-sm w-full mx-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Task Manager</h1>
        <button
          onClick={handleSignIn}
          className="
            w-full flex items-center justify-center gap-2
            bg-brand-500 hover:bg-brand-600 active:bg-brand-700
            text-white font-medium text-sm
            px-4 py-2.5 rounded-lg
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
          "
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
