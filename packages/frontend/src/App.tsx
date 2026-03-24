import { LoadingSkeleton } from '@todo-app/ui';
import { useAuth } from './hooks/useAuth';
import SignInPage    from './pages/SignInPage';
import TaskListPage from './pages/TaskListPage';

/**
 * App — top-level auth router.
 *
 * Renders:
 *   - <LoadingSkeleton /> while Firebase determines auth state
 *   - <SignInPage />     when the user is not signed in
 *   - <TaskListPage />   when the user is signed in
 */
export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSkeleton />;
  if (!user)   return <SignInPage />;
  return <TaskListPage />;
}
