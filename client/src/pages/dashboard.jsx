import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import io from "socket.io-client";
import { QUERY_QUIZZES } from "../utils/queries.js";
import QuizList from "../components/QuizList.jsx";
import CreateQuizButton from "../components/CreateQuizButton";

// Assuming your server is running on the same host but different port
const socket = io("http://localhost:3001");
const Dashboard = () => {
  // Use Apollo's useQuery hook to fetch quizzes initially
  const { data, loading, error, refetch } = useQuery(QUERY_QUIZZES);
  console.log(data);
  useEffect(() => {
    console.log(data);
    // Listen for real-time quiz updates
    socket.on("quizSaved", (quizData) => {
      console.log(`this is the Quizdata: ${quizData}`);
      if (quizData.success) {
        // update the list with the newly added quiz
        // Re-fetch quizzes to include the new one

        refetch();
      }
    });

    return () => socket.off("quizSaved");
  }, [refetch]);
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
      {data && data.quizzes.length > 0 ? (
        <QuizList quizzes={data.quizzes} />
      ) : (
        <p>No quizzes found.</p>
      )}
    </main>
  );
};

export default Dashboard;
