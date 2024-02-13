import React from "react";
import { Link } from "react-router-dom";

const CreateQuizButton = () => {
  return (
    <Link to="/QuizForm">
      <button>Create New Quiz</button>
    </Link>
  );
};

export default CreateQuizButton;

