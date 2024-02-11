// TODO: Setup TypeDefs for Game schema

const typeDefs = `
  type Game {
    id: ID!
    hostId: String!
    pin: String!
    gameLive: Boolean!
    gameData: String
  }
  type Profile {
    _id: ID
    hostId: String
    playerId: string
    username: String
    email: String
    gameData: String
  }

  type Quiz {
    _id: ID!
    title: String!
    questionNumber: Int
    questions: [Question!]!
    isActive: Boolean! # Indicates if the quiz is active or not

  }

  type Question {
    _id: ID!
    questionText: String!
    answerOptions: [String!]!
    correctAnswer: String!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    quizzes: [Quiz]
    quiz(quizId: ID!): Quiz
    getProfile(playerId: String!): Profile
    getProfiles(hostId: String!): [Profile]
    getGame(hostId: String!): Game
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    addQuiz(quizQuestion: String!, quizAnswer: String!): Quiz
    removeQuiz: Quiz
    # Activate or deactivate a quiz
    activateQuiz(id: ID!, isActive: Boolean!): Quiz
    addQuestion(quizId: ID!, question: String!, answerOptions: [String!]!, correctAnswer: String!): Quiz
    removeQuestion(questionId: ID!): Quiz
    addPlayer(hostId: String!, playerId: String!, username: String!, gameData: String!): Profile
    removePlayer(playerId: String): Profile
    addGame(pin: String!, hostId: String!, gameLive: Boolean!, gameData: String!): Game
    removeGame(hostId: String!): Game
  }
`;

export default typeDefs;
