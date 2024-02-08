import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { setContext } from "@apollo/client/link/context";
import "./App.css";

// Create an HTTP link that connects to the GraphQL server.
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Middleware to attach the authentication token to requests
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Instantiate Apollo Client with the created httpLink and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the httpLink
  cache: new InMemoryCache(),
});

function App() {
  // ApolloProvider should be the outermost component
  return (
    <ApolloProvider client={client}>
      {/* No need to use <Router> again if it's already used in index.js/main.jsx */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
