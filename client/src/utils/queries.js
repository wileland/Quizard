import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      username
      email
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_QUIZZES = gql`
  query quizzes {
    quizzes {
      title
      questions {
        questionText
        correctAnswer
        answerOptions {
          option
        }
      }
      isActive
      _id
    }
  }
`;

export const QUERY_SINGLE_QUIZ = gql`
  query singleQuiz($quizId: ID!) {
    quiz(quizId: $quizId) {
      _id
      title
      questions {
        questionText
        answerOptions
        correctAnswer
      }
      isActive
    }
  }
`;
