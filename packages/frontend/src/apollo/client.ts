import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth }       from '../firebase';

/**
 * HTTP link pointing at the GraphQL endpoint.
 * VITE_GRAPHQL_API_URL is set via GitHub Actions secrets / .env.local.
 */
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
});

/**
 * Auth link — attaches the Firebase ID token as a Bearer token on every
 * outbound request.  Returns the headers unchanged if no user is signed in
 * (the server will reject the request with 401, which is correct behaviour).
 */
const authLink = setContext(async (_request, { headers }: { headers?: Record<string, string> }) => {
  const token = await auth.currentUser?.getIdToken();
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const client = new ApolloClient({
  // Chain: auth → http
  link:  ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
