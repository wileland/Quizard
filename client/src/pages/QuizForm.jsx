
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client"; // Import useMutation
import QuestionForm from "../components/QuestionForm.jsx";
import { ADD_QUIZ } from "../utils/mutations"; // Import the mutation
import authService from "../utils/auth"; // Adjust the path as per your structure
// import io from "socket.io-client";

// const socket = io("http://localhost:3000");

const QuizForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [addQuiz, { data, loading, error }] = useMutation(ADD_QUIZ); // Initialize the mutation

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to server");
  //   });

  //   return () => {
  //     socket.off("connect");
  //   };
  // }, []);

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
      i === index ? updatedQuestion : q,
    );
    setQuestions(updatedQuestions);
  };

  const submitQuiz = async () => { 
    try {
      // Use authService to get the current user's profile which includes the ID
      const userProfile = authService.getProfile();

      // Prepare the questions in the format expected by your GraphQL API
      const formattedQuestions = questions.map(q => ({
        questionText: q.question,
        answerOptions: q.answers.map(answer => answer.option),
        correctAnswer: q.correctAnswer
      }));
      console.log(formattedQuestions);

      console.log(title)
      console.log(userProfile.data._id);
      // Call the addQuiz mutation with the necessary variables
      await addQuiz({
        variables: {
          title: title,
          questions: formattedQuestions,
          createdBy: userProfile.data._id
        }
      });


      
    } catch (e) {
      console.error('Error submitting quiz:', e);
      // Handle errors here, such as by showing an error message to the user
    }
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
      <Link spy="true" smooth="true" to="/dashboard">
        <button onClick={submitQuiz}>Submit Quiz</button>
      </Link>

      {loading && <p>Submitting Quiz...</p>}
      {error && <p>An error occurred while submitting the quiz.</p>}
    </div>
  );
};

export default QuizForm;
