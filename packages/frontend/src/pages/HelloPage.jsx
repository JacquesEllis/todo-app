import { useQuery, gql } from '@apollo/client';

const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

export default function HelloPage() {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Hello World</h1>

        {loading && (
          <p className="text-gray-400 text-sm animate-pulse">Fetching from API…</p>
        )}

        {error && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-medium">API error</p>
            <p className="text-red-400 text-xs mt-1 break-all">{error.message}</p>
          </div>
        )}

        {data?.hello && (
          <p className="text-brand-600 text-lg font-medium">{data.hello}</p>
        )}

        <p className="mt-6 text-xs text-gray-400">
          API:{' '}
          <span className="font-mono">
            {import.meta.env.VITE_GRAPHQL_API_URL
              ? import.meta.env.VITE_GRAPHQL_API_URL
              : 'fallback (env var not set)'}
          </span>
        </p>
      </div>
    </div>
  );
}
