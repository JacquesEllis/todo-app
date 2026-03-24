import { useQuery, useMutation }  from '@apollo/client';
import {
  TaskRow,
  TaskInput,
  FilterTabs,
  EmptyState,
  LoadingSkeleton,
  ErrorBanner,
} from '@todo-app/ui';
import {
  GET_TASKS,
  CREATE_TASK,
  MARK_COMPLETE,
  DELETE_TASK,
} from '../apollo/operations';
import { auth }    from '../firebase';
import { signOut } from 'firebase/auth';
import { client }  from '../apollo/client';

/** Shape returned by the GraphQL `tasks` query */
interface Task {
  id:          string;
  title:       string;
  completed:   boolean;
  createdAt:   string;
  completedAt: string | null;
}

/** Shape of the GET_TASKS query result */
interface GetTasksData {
  tasks: Task[];
}

export default function TaskListPage(): JSX.Element {
  const { data, loading, error } = useQuery<GetTasksData>(GET_TASKS);

  const [createTask]   = useMutation(CREATE_TASK,  { refetchQueries: [GET_TASKS] });
  const [markComplete] = useMutation(MARK_COMPLETE);
  const [deleteTask]   = useMutation(DELETE_TASK,  { refetchQueries: [GET_TASKS] });

  const handleSignOut = async (): Promise<void> => {
    // Clear the Apollo cache before signing out so no stale task data persists
    // between sessions (especially important if multiple accounts are used).
    await client.clearStore().catch(() => undefined);
    await signOut(auth);
  };

  if (loading) return <LoadingSkeleton />;
  if (error)   return <ErrorBanner message="Could not load tasks." />;

  const tasks     = data?.tasks ?? [];
  const active    = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) =>  t.completed);

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">My Tasks</h1>
        <button
          type="button"
          onClick={handleSignOut}
          className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded"
        >
          Sign out
        </button>
      </div>

      <TaskInput
        onAdd={(title: string) =>
          createTask({ variables: { input: { title } } })
        }
      />

      <FilterTabs />

      {tasks.length === 0 ? (
        <EmptyState variant="no-tasks" />
      ) : (
        [...active, ...completed].map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onToggle={(id: string, completedState: boolean) =>
              markComplete({ variables: { id, completed: completedState } })
            }
            onDelete={(id: string) => deleteTask({ variables: { id } })}
          />
        ))
      )}
    </div>
  );
}
