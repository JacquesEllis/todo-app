import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { signOut } from 'firebase/auth';
import {
  TaskRow,
  TaskInput,
  EmptyState,
  LoadingSkeleton,
  ErrorBanner,
} from '@todo-app/ui';
import { auth } from '../firebase';
import {
  GET_TASKS,
  CREATE_TASK,
  MARK_COMPLETE,
  DELETE_TASK,
} from '../apollo/operations';

/**
 * TaskListPage
 *
 * Main page shown to authenticated users.
 * Connects Apollo data to @todo-app/ui components.
 * Copy sourced from UX spec:
 * https://github.com/JacquesEllis/ai-bot-profiles/blob/main/docs/ux/
 */
export default function TaskListPage() {
  const client = useApolloClient();

  const { data, loading, error } = useQuery(GET_TASKS);

  const [createTask]   = useMutation(CREATE_TASK,  { refetchQueries: [GET_TASKS] });
  const [markComplete] = useMutation(MARK_COMPLETE);
  const [deleteTask]   = useMutation(DELETE_TASK,  { refetchQueries: [GET_TASKS] });

  const handleSignOut = async () => {
    // Clear Apollo cache before signing out to prevent data leakage
    await client.clearStore();
    await signOut(auth);
  };

  if (loading) return <LoadingSkeleton />;
  if (error)   return <ErrorBanner message="Could not load tasks." />;

  const tasks     = data?.tasks ?? [];
  const active    = tasks.filter((t: { completed: boolean }) => !t.completed);
  const completed = tasks.filter((t: { completed: boolean }) => t.completed);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">My Tasks</h1>
          <button
            type="button"
            onClick={handleSignOut}
            className="
              text-sm text-gray-500 hover:text-gray-700
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
              rounded px-2 py-1
            "
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto p-4 flex flex-col gap-3">
        <TaskInput
          onAdd={(title: string) =>
            createTask({ variables: { input: { title } } })
          }
        />

        {tasks.length === 0 ? (
          <EmptyState variant="no-tasks" />
        ) : (
          [...active, ...completed].map((task: {
            id: string;
            title: string;
            completed: boolean;
            createdAt: string;
            completedAt: string | null;
          }) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggle={(id: string, isCompleted: boolean) =>
                markComplete({ variables: { id, completed: isCompleted } })
              }
              onDelete={(id: string) =>
                deleteTask({ variables: { id } })
              }
            />
          ))
        )}
      </main>
    </div>
  );
}
