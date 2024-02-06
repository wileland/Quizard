import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { useQuery } from "@apollo/client"; // Import the useQuery hook
import { gql } from "@apollo/client"; // Import the gql template literal
import { GET_USERS } from "./queries/userQueries"; // Import your user query

function App() {
  // Use the useQuery hook to fetch data
  const { loading, error, data } = useQuery(GET_USERS);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home data={data} />} // Pass the fetched user data to Home component
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

