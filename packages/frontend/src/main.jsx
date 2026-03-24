import '@todo-app/ui/src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { client }         from './apollo/client';
import App                from './App';
import ReactDOM           from 'react-dom/client';
import React              from 'react';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error(
    '[main] Could not find #root element. Check index.html.'
  );
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
