import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri:
    import.meta.env.VITE_GRAPHQL_API_URL ||
    'https://us-central1-ai-bot-experiment.cloudfunctions.net/api/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
