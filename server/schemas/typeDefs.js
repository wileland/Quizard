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
    playerId: String 
    username: String
    email: String
    gameData: String
  }

  type Quiz {
    _id: ID!
    title: String!
    questions: [Question!]!
    isActive: Boolean!
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
    quizzes: [Quiz]!
    quiz(quizId: ID!): Quiz
    getPlayer(playerId: ID!): Profile
    getPlayers(hostId: String!): [Profile]!
    getGame(hostId: String!): Game
    me: Profile
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeProfile: Profile
    addQuiz(title: String!, questions: [String]!): Quiz
    removeQuiz(quizId: ID!): Quiz
    activateQuiz(id: ID!, isActive: Boolean!): Quiz
    addQuestion(quizId: ID!, question: String!, answerOptions: [String!]!, correctAnswer: String!): Quiz
    removeQuestion(questionId: ID!): Quiz 
    addPlayer(hostId: String!, playerId: String!, username: String!, gameData: String!): Profile
    removePlayer(playerId: String!): Profile
    addGame(pin: String!, hostId: String!, gameLive: Boolean!, gameData: String!): Game
    removeGame(hostId: String!): Game
  }
`;

export default typeDefs;
