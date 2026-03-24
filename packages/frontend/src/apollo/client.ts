import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from '../firebase';

// HTTP link pointing at the GraphQL API endpoint.
// VITE_GRAPHQL_API_URL must be set in .env.local for local development
// and as a GitHub Actions secret (GRAPHQL_API_URL) for CI/CD.
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
});

// Attach the Firebase ID token to every request as a Bearer token.
const authLink = setContext(async (_request, { headers }) => {
  let token: string | undefined;
  try {
    token = (await auth.currentUser?.getIdToken()) ?? undefined;
  } catch {
    // If token retrieval fails (e.g. in tests), continue without a token.
    token = undefined;
  }

  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
