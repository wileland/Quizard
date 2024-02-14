import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_QUIZZES } from "../utils/queries.js";
import QuizList from "../components/QuizList.jsx";
import CreateQuizButton from "../components/CreateQuizButton";

const Dashboard = () => {
  const { data, loading, error } = useQuery(QUERY_QUIZZES);

  if (loading) return <p className="text-gray-600">Loading quizzes...</p>;

  return (
    <main className="container mx-auto mt-8 bg-yellow-100 p-8 rounded-md shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-sky-800">Welcome to the Quizard's Dashboard</h1>
      <p className="text-gray-700 mb-4">
        Here you can create, view, and manage your quizzes. Prepare to challenge
        the minds of your participants!
      </p>
      <CreateQuizButton buttonStyles="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600" />
      <h2 className="text-2xl font-bold mt-6 mb-4 text-teal-500">Created Quizzes</h2>
      {data && data?.quizzes.length > 0 ? (
        <QuizList quizzes={data?.quizzes} />
      ) : (
        <p className="text-gray-600">No quizzes found.</p>
      )}
    </main>
  );
};

export default Dashboard;
