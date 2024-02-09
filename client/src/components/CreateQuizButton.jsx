import React from 'react';
import { useHistory } from 'react-router-dom';

const CreateQuizButton = () => {
  let history = useHistory();

  const handleCreateQuiz = () => {
    history.push('./QuizForm.jsx'); 
  };

  return (
    <button onClick={handleCreateQuiz}>
      Create New Quiz
    </button>
  );
};

export default CreateQuizButton;
