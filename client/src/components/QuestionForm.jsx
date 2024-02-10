import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_QUESTION } from "../utils/mutations";

import Auth from "../utils/auth";

const QuestionForm = ({ quizId }) => { // this may need to be questions object if we get an error 
  const [question, setQuestion] = useState('');
  const [answerOptions, setAnswerOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const [addQuestion, { error }] = useMutation(ADD_QUESTION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addQuestion({
        variables: {
          quizId,
          question,
          answerOptions,
          correctAnswer
        },
      });

      setQuestion('');
      setAnswerOptions(['', '', '', '']);
      setCorrectAnswer( ' ');
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
        <h3>add your questions</h3>

        {Auth.loggedIn() ? (
            <form
            className=''
            onSubmit={handleFormSubmit}
            >
                <div className=''>
                    <input 
                    placeholder='Question'
                    value={question}
                    className=''
                    onChange={(event) => setQuestion(event.target.value)} 
                    /> 
                </div>  

                {answerOptions.map((option, index) => (
                  <div key={index} className=''>
                    <input 
                      placeholder={`Option ${index + 1}`}
                      value={answerOptions}
                      className=''
                      onChange={(event) => handleOptionChange(index, event.target.value)} 
                    />
                  </div>
                ))}

                <div className=''>
                    <button className='' type='submit'>
                        Add Question
                    </button>
                </div>
                {error && (
                    <div className=''>
                        {error.message}
                    </div>
                )}
            </form>
        ) : (
            <p>
                You need to be logged in to create a quiz. Please {' '}
                <Link to='/login'>login</Link> or <Link to='/signup'>signup</Link>
            </p>
        )}
    </div>
  );
};

export default QuestionForm;