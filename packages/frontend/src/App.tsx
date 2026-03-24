import { LoadingSkeleton } from '@todo-app/ui';
import { useAuth }        from './hooks/useAuth';
import SignInPage         from './pages/SignInPage';
import TaskListPage       from './pages/TaskListPage';

/**
 * Root component.
 * Renders a loading skeleton while the auth state is being determined,
 * then routes to either the sign-in page or the task list.
 */
export default function App(): JSX.Element {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSkeleton />;

  return user ? <TaskListPage /> : <SignInPage />;
}
