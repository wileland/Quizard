import React from "react";

const QuizList = ({ quizzes }) => {
  console.log(quizzes);
  return (
    <div>
      {quizzes.length ? (
        quizzes.map((quiz, index) => (
          <div key={index}>
            <h3>{quiz.title}</h3>
            {/* Add more details as needed */}
          </div>
        ))
      ) : (
        <p>No quizzes found.</p>
      )}
    </div>
  );
};

export default QuizList;
