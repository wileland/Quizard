import React from "react";
import QuizItem from "./QuizItem.jsx";

const QuizList = ({ quizzes, hostId }) => {
  console.log(quizzes);
  return (
    <div>
      {quizzes.map((quiz) => (
        <QuizItem key={quiz._id} quiz={quiz} hostId={hostId} />
      ))}
    </div>
  );
};

export default QuizList;
