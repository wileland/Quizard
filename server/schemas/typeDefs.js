import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Game {
    id: ID!
    hostId: ID!
    pin: String!
    gameLive: Boolean!
    gameData: String
  }

  type Profile {
    _id: ID!
    hostId: ID
    playerId: ID
    username: String!
    email: String!
    gameData: String
  }

  type Quiz {
    _id: ID!
    title: String!
    createdBy: ID!
    questions: [Whatever!]!
    isActive: Boolean
  }

  type Whatever {
    questionText: String!
    answerOptions: [Answers]!
    correctAnswer: String!
  }

  type Answers {
    option: String!
  } 


  type Question {
    _id: ID
    questionText: String!
    answerOptions: [String]!
    correctAnswer: String!
  }

  input QuestionInput {
    questionText: String!
    answerOptions: [AnswersInput]!
    correctAnswer: String!
  }

  input AnswersInput {
    option: String!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    quizzes: [Quiz]!
    quiz(quizId: ID!): Quiz
    getPlayer(playerId: ID!): Profile
    getPlayers(hostId: ID!): [Profile]!
    getGame(hostId: ID!): Game
    me: Profile
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    addQuiz(title: String!, questions: [QuestionInput]!, createdBy: ID!): Quiz!
    removeQuiz(quizId: ID!): Quiz
    activateQuiz(id: ID!, isActive: Boolean!): Quiz
    addQuestion(quizId: ID!, question: QuestionInput!): Quiz
    removeQuestion(quizId: ID!, questionText: String!): Quiz
    addPlayer(
      hostId: ID!
      playerId: ID!
      username: String!
      gameData: String!
    ): Profile
    removePlayer(playerId: ID!): Profile
    addGame(
      pin: String!
      hostId: ID!
      gameLive: Boolean!
      gameData: String!
    ): Game
    removeGame(hostId: ID!): Game
  }
`;

export default typeDefs;
