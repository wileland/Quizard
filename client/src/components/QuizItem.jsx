import React from "react";
import { useMutation } from "@apollo/client";
import { START_GAME } from "../utils/mutations";
import { motion } from 'framer-motion';

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      yoyo: Infinity
    }
  }
};

const QuizItem = ({ quiz, hostId }) => {
  const [startGame, { data, loading, error }] = useMutation(START_GAME, {
    variables: { hostId, quizId: quiz._id },
    onCompleted: (data) => {
      alert(`Game started! PIN: ${data.addGame.pin}`);
    },
    onError: (error) => {
      alert(`Error starting game: ${error.message}`);
    },
  });

  return (
    <div className="quiz-item bg-neon-purple p-4 rounded-lg shadow-md">
      <h3 className="text-white">{quiz.title}</h3>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        onClick={() => startGame()}
        disabled={loading}
        className="bg-neon-yellow text-black px-4 py-2 rounded-md mt-2 focus:outline-none"
      >
        Start Game
      </motion.button>
      {error && <p className="text-red-500">Error starting game: {error.message}</p>}
    </div>
  );
};

export default QuizItem;
