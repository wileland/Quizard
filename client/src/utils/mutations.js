import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
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

export const ADD_QUIZ = gql `
  mutation addQuiz($quizQuestion: String!, $quizAnswer: String!) {
    addQuiz(quizQuestion: $quizQuestion, quizAnswer: $quizAnswer) {
      title
      questions
      _id
    }
  }
`;

export const REMOVE_QUIZ = gql `
  mutation removeQuiz {
    removeQuiz {
      _id
    }
  }
`;



