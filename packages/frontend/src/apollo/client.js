import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getAuth } from 'firebase/auth';
import { setContext } from '@apollo/client/link/context';

// Vite exposes env vars prefixed with VITE_ via import.meta.env
// The GitHub Actions secret GRAPHQL_API_URL must be injected as VITE_GRAPHQL_API_URL
// at build time (see .github/workflows/deploy.yml)
const GRAPHQL_URI =
  import.meta.env.VITE_GRAPHQL_API_URL ||
  'https://us-central1-ai-bot-experiment.cloudfunctions.net/api/graphql';

const httpLink = new HttpLink({ uri: GRAPHQL_URI });

// Attach Firebase ID token to every request
const authLink = setContext(async (_, { headers }) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const token = user ? await user.getIdToken() : null;
    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    };
  } catch {
    return { headers };
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
