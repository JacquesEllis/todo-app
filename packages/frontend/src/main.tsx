import '@todo-app/ui/src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import { client }         from './apollo/client';
import App                from './App';
import ReactDOM           from 'react-dom/client';
import React              from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
