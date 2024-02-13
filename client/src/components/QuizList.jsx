import React from "react";
import { motion } from 'framer-motion';

const QuizList = ({ quizzes }) => {
  console.log(quizzes);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {quizzes.length ? (
        quizzes.map((quiz, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-neon-blue p-4 rounded-lg shadow-md"
          >
            <h3 className="text-white">{quiz.title}</h3>
            {/* Add more details as needed */}
          </motion.div>
        ))
      ) : (
        <p className="text-white">No quizzes found.</p>
      )}
    </motion.div>
  );
};

export default QuizList;
