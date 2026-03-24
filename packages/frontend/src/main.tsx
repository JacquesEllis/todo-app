import React          from 'react';
import ReactDOM       from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client }     from './apollo/client';
import App            from './App';
import '@todo-app/ui/src/styles/globals.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Root element #root not found in index.html. ' +
    'Check that index.html contains <div id="root"></div>.'
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
