const typeDefs = `
  type Profile {
    _id: ID
    username: String
    email: String
  }

  
  type Quiz {
    _id: ID
    title: String
    questions: [String]
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
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  
    removeProfile: Profile
    addQuestion(question: String!, answerOptions: [String]!, correctAnswer: String!): Quiz
    removeQuiz: Quiz 
    addQuiz(profileId: ID!, questions: [String]!): Quiz
    removeQuestion(question: String!): Quiz
  
  }
`;

export default typeDefs;








