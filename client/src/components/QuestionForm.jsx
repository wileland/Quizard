import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_QUESTION } from "../utils/mutations";
import Auth from "../utils/auth";

const QuestionForm = ({ quizId, addQuestionData }) => {
  const [questionText, setQuestionText] = useState("");
  const [answerOptions, setAnswerOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [addQuestion, { error }] = useMutation(ADD_QUESTION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addQuestion({
        variables: {
          quizId,
          question: questionText,
          answerOptions,
          correctAnswer,
        },
      });

      setQuestionText("");
      setAnswerOptions(["", "", "", ""]);
      setCorrectAnswer("");

      if (addQuestionData) {
        addQuestionData({
          question: questionText,
          answerOptions,
          correctAnswer,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...answerOptions];
    newOptions[index] = value;
    setAnswerOptions(newOptions);
  };

  return (
    <div>
      <h3>Add Your Questions</h3>

      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <input
              placeholder="Question"
              value={questionText}
              onChange={(event) => setQuestionText(event.target.value)}
            />
          </div>

          {answerOptions.map((option, index) => (
            <div key={index}>
              <input
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(event) =>
                  handleOptionChange(index, event.target.value)
                }
              />
            </div>
          ))}

          <div>
            <input
              type="text"
              placeholder="Correct Answer"
              value={correctAnswer}
              onChange={(event) => setCorrectAnswer(event.target.value)}
            />
          </div>

          <div>
            <button type="submit">Add Question</button>
          </div>
          {error && <div>{error.message}</div>}
        </form>
      ) : (
        <p>
          You need to be logged in to add questions. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.
        </p>
      )}
    </div>
  );
};

export default QuestionForm;
