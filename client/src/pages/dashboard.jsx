import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_QUIZZES } from "../utils/queries";
import QuizList from "../components/QuizList";
import CreateQuizButton from "../components/CreateQuizButton.jsx";

const Dashboard = () => {
  return (
    <main>
      <h1>Welcome to the Quizard's Dashboard</h1>
      <p>
        Here you can create, view, and manage your quizzes. Prepare to challenge
        the minds of your participants!
      </p>
      <CreateQuizButton />
      {/*data && data.quizzes && <QuizList quizzes={data.quizzes} />*/}
    </main>
  );
};

export default Dashboard;

