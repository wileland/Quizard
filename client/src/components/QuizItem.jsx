// QuizItem.jsx
import React from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_QUIZ, ACTIVATE_QUIZ, START_GAME } from "../utils/mutations";
import { QUERY_QUIZZES } from "../utils/queries";

const QuizItem = ({ quiz }) => {
  const [removeQuiz, { loading: removingQuiz }] = useMutation(REMOVE_QUIZ, {
    variables: { quizId: quiz._id },
    refetchQueries: [{ query: QUERY_QUIZZES }],
  });

  const [activateQuiz, { loading: activatingQuiz }] = useMutation(
    ACTIVATE_QUIZ,
    {
      variables: { id: quiz._id, isActive: true }, // Assuming you're toggling isActive state
    },
  );

  // New mutation hook for starting a game
  const [startGame, { loading: startingGame }] = useMutation(START_GAME, {
    variables: { hostId: "YourHostIdHere", quizId: quiz._id }, // Replace "YourHostIdHere" as needed
    onCompleted: (data) => {
      // Display the game PIN after starting a game
      alert(`Game started! PIN: ${data.addGame.pin}`);
    },
    onError: (error) => {
      console.error("Error starting game:", error.message);
      alert("Failed to start game. Please try again.");
    },
  });

  const handleRemoveQuiz = async () => {
    try {
      await removeQuiz();
    } catch (e) {
      console.error("Error removing quiz:", e.message);
    }
  };

  const handleActivateQuiz = async () => {
    try {
      await activateQuiz();
    } catch (e) {
      console.error("Error activating quiz:", e.message);
    }
  };

  const handleStartGame = async () => {
    try {
      await startGame();
    } catch (e) {
      console.error("Error starting the game:", e.message);
    }
  };

  return (
    <div className="quiz-item">
      <h3>{quiz.title}</h3>
      <button onClick={handleActivateQuiz} disabled={activatingQuiz}>
        Activate
      </button>
      <button onClick={handleRemoveQuiz} disabled={removingQuiz}>
        Delete
      </button>
      <button onClick={handleStartGame} disabled={startingGame}>
        Start Game
      </button>
    </div>
  );
};

export default QuizItem;

