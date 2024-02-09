import React from "react";
import { Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Signup from "./pages/signup";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
  return (
    <div>
      <nav>
        {/* Links for nav */}
        <Link to="/">Home</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Signup">Signup</Link>
        <Link to="/Dashboard">Dashboard</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
