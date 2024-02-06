import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Import your App component

// Set up Apollo Client with your GraphQL server endpoint
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Ensure this URI is correct for your GraphQL server
  cache: new InMemoryCache(), // Set up a new cache
});

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Render your app wrapped with ApolloProvider and Router
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
