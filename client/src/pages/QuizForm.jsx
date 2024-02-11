import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import QuestionForm from "../components/QuestionForm";
import { ADD_QUIZ } from "../utils/mutations";
import Auth from "../utils/auth";

const QuizForm = ({ quizId }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", "", "", ""], correct: "" },
  ]);

  const [addQuiz, { error }] = useMutation(ADD_QUIZ);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addQuiz({
        variables: {
          quizId,
          title,
          questions,
        },
      });

      // Reset form state after submission
      setTitle("");
      setQuestions([{ question: "", answers: ["", "", "", ""], correct: "" }]);
    } catch (err) {
      console.error(err);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answers: ["", "", "", ""], correct: "" },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    } else if (field.startsWith("answer")) {
      const answerIndex = parseInt(field.substring(6), 10) - 1;
      updatedQuestions[index].answers[answerIndex] = value;
    } else if (field === "correct") {
      updatedQuestions[index].correct = value;
    }
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <h3>CREATE YOUR QUIZ</h3>

      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <h4>What is the title of your quiz?</h4>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {questions.map((question, index) => (
            <QuestionForm
              key={index}
              question={question}
              handleChange={(field, value) => handleChange(index, field, value)}
            />
          ))}

          <div>
            <button type="button" onClick={addQuestion}>
              Add Question
            </button>
            <button type="submit">Create Quiz</button>
          </div>
          {error && <div>{error.message}</div>}
        </form>
      ) : (
        <p>
          You need to be logged in to create a quiz. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.
        </p>
      )}
    </div>
  );
};

export default QuizForm;

