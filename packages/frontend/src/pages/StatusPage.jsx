import { useQuery } from '@apollo/client';
import { HELLO_QUERY } from '../apollo/operations';

export default function StatusPage() {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gray-50"
        role="status"
        aria-label="Loading"
      >
        <div className="text-center space-y-4">
          <div
            className="inline-block w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
          <p className="text-gray-500 text-sm">Checking status…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gray-50"
        role="alert"
      >
        <div className="text-center space-y-3 max-w-sm mx-auto px-4">
          <div className="text-4xl" aria-hidden="true">⚠️</div>
          <h1 className="text-xl font-semibold text-gray-800">
            Could not reach the server
          </h1>
          <p className="text-sm text-gray-500">
            {error.message || 'An unexpected error occurred. Please try again later.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-3 max-w-sm mx-auto px-4">
        <div className="text-4xl" aria-hidden="true">✅</div>
        <h1
          className="text-2xl font-bold text-gray-900"
          data-testid="hello-message"
        >
          {data?.hello}
        </h1>
        <p className="text-sm text-gray-500">API is online</p>
      </div>
    </div>
  );
}
