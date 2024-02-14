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
        email
      }
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation addQuestion($quizId: ID!, $question: QuestionInput!) {
    addQuestion(quizId: $quizId, question: $question) {
      _id
      title
      questions {
        _id
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
  mutation addQuiz($title: String!, $questions: [QuestionInput]!, $createdBy: ID!) {
    addQuiz(title: $title, questions: $questions, createdBy: $createdBy) {
      questions {
        questionText
        correctAnswer
        answerOptions {
          option
        }
      }
      title
      createdBy
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

export const ADD_PLAYER = gql`
  mutation addPlayer(
    $hostId: ID!
    $playerId: ID!
    $username: String!
    $gameData: String!
  ) {
    addPlayer(
      hostId: $hostId
      playerId: $playerId
      username: $username
      gameData: $gameData
    ) {
      _id
      username
      hostId
      playerId
      gameData
    }
  }
`;

export const REMOVE_PLAYER = gql`
  mutation removePlayer($playerId: ID!) {
    removePlayer(playerId: $playerId) {
      _id
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

export const ADD_GAME = gql`
  mutation addGame(
    $pin: String!
    $hostId: ID!
    $gameLive: Boolean!
    $gameData: String!
  ) {
    addGame(
      pin: $pin
      hostId: $hostId
      gameLive: $gameLive
      gameData: $gameData
    ) {
      id
      pin
      hostId
      gameLive
      gameData
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($hostId: ID!) {
    removeGame(hostId: $hostId) {
      id
    }
  }
`;

// Make sure to update this file with any other mutations or queries as needed.
