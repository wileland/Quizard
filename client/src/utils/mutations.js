import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation addQuestion(
    $quizId: ID!
    $question: String!
    $answerOptions: [String]!
    $correctAnswer: String!
  ) {
    addQuestion(
      quizId: $quizId
      question: $question
      answerOptions: $answerOptions
      correctAnswer: $correctAnswer
    ) {
      _id
      title
      questions {
        questionText
        answerOptions
        correctAnswer
      }
    }
  }
`;

export const REMOVE_QUIZ = gql`
  mutation removeQuiz($quizId: ID!) {
    removeQuiz(quizId: $quizId) {
      _id
    }
  }
`;

export const ADD_QUIZ = gql`
  mutation addQuiz($title: String!, $questions: [QuestionInput]!) {
    addQuiz(title: $title, questions: $questions) {
      _id
      title
      questions {
        questionText
        answerOptions
        correctAnswer
      }
    }
  }
`;

export const ACTIVATE_QUIZ = gql`
  mutation activateQuiz($id: ID!, $isActive: Boolean!) {
    activateQuiz(id: $id, isActive: $isActive) {
      _id
      title
      isActive
    }
  }
`;

export const START_GAME = gql`
  mutation StartGame($hostId: ID!, $quizId: ID!) {
    addGame(hostId: $hostId, quizId: $quizId, gameLive: true) {
      pin
      gameData
    }
  }
`;
