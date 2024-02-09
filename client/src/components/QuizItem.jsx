import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_QUIZ, ACTIVATE_QUIZ } from '../utils/mutations';
import { QUERY_QUIZZES } from '../utils/queries';

const QuizItem = ({ quiz }) => {
  const [removeQuiz] = useMutation(REMOVE_QUIZ, {
    variables: { _id: quiz._id },
    refetchQueries: [{ query: QUERY_QUIZZES }],
  });

  const [activateQuiz] = useMutation(ACTIVATE_QUIZ, {
    variables: { id: quiz._id },
    // Optimistic update can be used here to reflect the changes immediately,
    // then confirm with the result from the server.
  });

  const handleRemoveQuiz = async () => {
    try {
      await removeQuiz();
    } catch (e) {
      console.error('Error removing a quiz:', e);
    }
  };

  const handleActivateQuiz = async () => {
    try {
      await activateQuiz();
      // Optionally handle UI update or show a notification
    } catch (e) {
      console.error('Error activating a quiz:', e);
    }
  };

  return (
    <div className="quiz-item">
      <h3>{quiz.title}</h3>
      <button onClick={handleActivateQuiz}>Activate</button>
      <button onClick={handleRemoveQuiz}>Delete</button>
    </div>
  );
};

export default QuizItem;

