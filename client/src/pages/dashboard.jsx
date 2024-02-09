import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_QUIZZES } from "../utils/queries";
import QuizList from "../components/QuizList";
import CreateQuizButton from "../components/CreateQuizButton.jsx";

const Dashboard = () => {
  const { loading, error, data } = useQuery(QUERY_QUIZZES);

  // Display loading status while quizzes are being fetched
  if (loading) return <p>Gathering magical quizzes...</p>;
  // Display error message if there's an issue fetching quizzes
  if (error) return <p>An arcane error occurred: {error.message}</p>;

  return (
    <main>
      <h1>Welcome to the Quizard's Dashboard</h1>
      <p>Here you can create, view, and manage your quizzes. Prepare to challenge the minds of your participants!</p>
      <CreateQuizButton />
      {data && data.quizzes && <QuizList quizzes={data.quizzes} />}
    </main>
  );
};

export default Dashboard;
