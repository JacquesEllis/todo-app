import { useAuth } from './hooks/useAuth';
import SignInPage    from './pages/SignInPage';
import HelloPage     from './pages/HelloPage';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm">Loading…</p>
      </div>
    );
  }

  // Hello World epic — no auth guard yet, show HelloPage to everyone
  return <HelloPage />;
}
