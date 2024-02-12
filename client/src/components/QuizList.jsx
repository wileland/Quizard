import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_QUIZZES } from "../utils/queries";
import QuizItem from "./QuizItem";
const QuizList = () => {
  const { loading, data, error } = useQuery(QUERY_QUIZZES);

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>Error loading quizzes: {error.message}</p>;

  return (
    <div>
      {data &&
        data.quizzes &&
        data.quizzes.map((quiz) => <QuizItem key={quiz._id} quiz={quiz} />)}
    </div>
  );
};

export default QuizList;

