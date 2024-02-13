import React from "react";
import { Link } from "react-router-dom";
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

const CreateQuizButton = () => {
  return (
    <Link to="/QuizForm">
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
      >
        Create New Quiz
      </motion.button>
    </Link>
  );
};

export default CreateQuizButton;
