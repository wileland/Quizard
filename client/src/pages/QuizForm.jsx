import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import QuestionForm from "../components/QuestionForm.jsx";
import { ADD_QUIZ } from "../utils/mutations";
import authService from "../utils/auth";

const QuizForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [addQuiz, { data, loading, error }] = useMutation(ADD_QUIZ);

  const addQuestion = () => {
    const newQuestion = {
      question: "",
      answers: ["", "", "", ""],
      correctAnswer: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  const submitQuiz = async () => {
    try {
      const userProfile = authService.getProfile();

      const formattedQuestions = questions.map((q) => ({
        questionText: q.question,
        answerOptions: q.answers.map((answer) => answer.option),
        correctAnswer: q.correctAnswer,
      }));

      await addQuiz({
        variables: {
          title: title,
          questions: formattedQuestions,
          createdBy: userProfile.data._id,
        },
      });
    } catch (e) {
      console.error('Error submitting quiz:', e);
    }
  };

  return (
    <div className="bg-yellow-100 p-8 rounded-md shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-teal-500">Create Your Retro Quiz</h3>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-md shadow-md focus:outline-none focus:border-blue-500"
      />
      {questions.map((question, index) => (
        <QuestionForm
          key={index}
          questionIndex={index}
          question={question}
          updateQuestion={updateQuestion}
        />
      ))}
      <button
        onClick={addQuestion}
        className="bg-orange-500 text-black px-4 py-2 rounded-md hover:bg-orange-600"
      >
        Add Question
      </button>
      <Link to="/dashboard">
        <button
          onClick={submitQuiz}
          className="mt-4 bg-teal-500 text-black px-4 py-2 rounded-md hover:bg-teal-600"
        >
          Submit Quiz
        </button>
      </Link>

      {loading && <p className="mt-4">Submitting Quiz...</p>}
      {error && <p className="mt-4 text-red-500">An error occurred while submitting the quiz.</p>}
    </div>
  );
};

export default QuizForm;
