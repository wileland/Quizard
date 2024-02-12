import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import QuestionForm from '../components/QuestionForm'
import { ADD_QUIZ } from "../utils/mutations";

import Auth from "../utils/auth";

const QuizForm = ({ quizId }) => {
  const [title, setTitle] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questions, setQuestions] = useState([]);


  const [addQuiz, { error }] = useMutation(ADD_QUIZ);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addQuiz({
        variables: {
          quizId,
          title,
          questionNumber,
          questions,
        },
      });

      setTitle('');
      setQuestionNumber(0);
      setQuestions([]);
    } catch (err) {
      console.error(err);
    }
  };

  const addQuestionData = (questionData) => {
    setQuestions([...questions, questionData]);
  };

  return (
    <div>
        <h3>CREATE YOUR QUIZ</h3>

        {Auth.loggedIn() ? (
            <form
            className=''
            onSubmit={handleFormSubmit}>
                <div className=''>
                    <input 
                    placeholder='Title'
                    value={title}
                    className=''
                    onChange={(event) => setTitle(event.target.value)} 
                    />
                </div>

                <div>
                    <input
                    type='number'
                    placeholder='Number of Questions'
                    value={questionNumber}
                    onChange={(event) => setQuestionNumber(parseInt(event.target.value))}
                />
                </div>

                <div>
                    <button type='submit'>Create Quiz</button>
                </div>
                {error && (
                    <div className=''>
                        {error.message}
                    </div>
                )}
            </form>
        ):(
        <p>
            You need to be logged in to create a quiz. Please {' '}
            <Link to='/login'>login</Link> or <Link to='/signup'>signup</Link>
        </p>
        )}

         {/* Render QuestionForm component */}
      <QuestionForm quizId={quizId} />
    </div>
  );
};

export default QuizForm;