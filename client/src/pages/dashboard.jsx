import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
// import io from "socket.io-client";
import { QUERY_QUIZZES } from "../utils/queries.js";
import QuizList from "../components/QuizList.jsx";
import CreateQuizButton from "../components/CreateQuizButton";

// Assuming your server is running on the same host but different port
// const socket = io("http://localhost:3001");
const Dashboard = () => {
  // Use Apollo's useQuery hook to fetch quizzes initially
  const { data, loading, error} = useQuery(QUERY_QUIZZES);
  console.log(data);

  if (loading) return <p>Loading quizzes...</p>; // Display loading message while data is fetching


  return (
    <main>
      <h1>Welcome to the Quizard's Dashboard</h1>
      <p>
        Here you can create, view, and manage your quizzes. Prepare to challenge
        the minds of your participants!
      </p>
      <CreateQuizButton />
      <h2>Created Quizzes</h2>
      {/* Render quizzes fetched from GraphQL */}
      {data && data?.quizzes.length > 0 ? (
        <QuizList quizzes={data?.quizzes} />
      ) : (
        <p>No quizzes found.</p>
      )}
    </main>
  );
};

export default Dashboard;