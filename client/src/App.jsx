import React from "react";
import { Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
  return (
    <div>
      <nav>
        {/* Links for nav */}
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
