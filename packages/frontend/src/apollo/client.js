import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from '../firebase/index';

const GRAPHQL_API_URL =
  import.meta.env.VITE_GRAPHQL_API_URL ||
  'https://us-central1-ai-bot-experiment.cloudfunctions.net/api/graphql';

if (!import.meta.env.VITE_GRAPHQL_API_URL) {
  console.warn(
    '[Apollo] VITE_GRAPHQL_API_URL is not set — falling back to hardcoded production URL.',
    'Set VITE_GRAPHQL_API_URL in .env.local or GitHub Actions secrets.'
  );
}

const httpLink = createHttpLink({
  uri: GRAPHQL_API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const user = auth.currentUser;
    const token = user ? await user.getIdToken() : null;
    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    };
  } catch (err) {
    console.error('[Apollo] Failed to get ID token:', err);
    return { headers };
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export function clearApolloCache() {
  return client.clearStore();
}
