import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_QUIZZES } from "../utils/queries";
import QuizList from "../components/QuizList";
import CreateQuizButton from "../components/CreateQuizButton.jsx";
import authService from "../utils/auth";
const Dashboard = () => {
  const { data } = useQuery(QUERY_QUIZZES);
  const userProfile = authService.getProfile();
  return (
    <main>
      <h1>Welcome to the Quizard's Dashboard</h1>
      <p>
        Here you can create, view, and manage your quizzes. Prepare to challenge
        the minds of your participants!
      </p>
      <CreateQuizButton />
      <p>Created Quizzes below</p>

      <QuizList quizzes={data?.quizzes || []} hostId={userProfile._id} />
    </main>
  );
};

export default Dashboard;
