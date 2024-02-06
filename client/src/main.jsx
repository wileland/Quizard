import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from "./App.jsx";
import "./index.css";

// Initialize Apollo Client with the correct GraphQL server URI
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Updated URI to match your server
  cache: new InMemoryCache(),
});

// Create a root element to render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
);
