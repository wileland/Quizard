import React from "react";
import { motion } from 'framer-motion';

const QuestionForm = ({ questionIndex, question, updateQuestion }) => {
  const handleInputChange = (e, field, index) => {
    if (field === "question") {
      updateQuestion(questionIndex, { ...question, question: e.target.value });
    } else if (field.startsWith("answer")) {
      const newAnswers = [...question.answers];
      newAnswers[index] = e.target.value;
      updateQuestion(questionIndex, { ...question, answers: newAnswers });
    } else if (field === "correct") {
      updateQuestion(questionIndex, { ...question, correctAnswer: e.target.value });
    }
  };

  return (
    <motion.div
      className="question-form-container"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ marginBottom: "20px" }}
    >
      <input
        type="text"
        placeholder={`Question ${questionIndex + 1}`}
        value={question.question}
        onChange={(e) => handleInputChange(e, "question")}
      />
      {question.answers.map((answer, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Answer ${index + 1}`}
          value={answer}
          onChange={(e) => handleInputChange(e, "answer", index)}
        />
      ))}
      <input
        type="number"
        placeholder="Correct answer number"
        value={question.correctAnswer}
        onChange={(e) => handleInputChange(e, "correct")}
        min="1"
        max="4"
      />
    </motion.div>
  );
};

export default QuestionForm;
