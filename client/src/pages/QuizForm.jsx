import React, { useState, useEffect } from "react";
import QuestionForm from "../components/QuestionForm.jsx";
import io from "socket.io-client";
import authService from "../utils/auth"; // Adjust the path as per your structure

const socket = io("http://localhost:3000");

const QuizForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  const addQuestion = () => {
    const newQuestion = {
      question: "",
      answers: ["", "", "", ""],
      correct: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? updatedQuestion : q,
    );
    setQuestions(updatedQuestions);
  };

  const submitQuiz = () => {
    // Use authService to get the current user's profile which includes the ID
    const userProfile = authService.getProfile();
    const quizData = {
      title,
      questions,
      hostId: userProfile._id, // Use the _id from the user's profile as the hostId
    };
    socket.emit("newQuiz", quizData);
    setTitle("");
    setQuestions([]);
  };

  return (
    <div>
      <h3>Create Your Quiz</h3>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {questions.map((question, index) => (
        <QuestionForm
          key={index}
          questionIndex={index}
          question={question}
          updateQuestion={updateQuestion}
        />
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={submitQuiz}>Submit Quiz</button>
    </div>
  );
};

export default QuizForm;
