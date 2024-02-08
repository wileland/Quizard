import  Quiz  from '../models/Quiz.js';
import Profile  from '../models/Profile.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

const resolvers = {
  Query: {
    // find all quizzez 
    quizzes: async () => {
      return Quiz.find().sort({ createdAt: -1 });
    },
    //find one quiz
    quiz: async (parent, { quizId }) => {
      return Quiz.findOne({ _id: quizId });
    },
    // // find all profiles
    profiles: async () => {
      return Profile.find();
    },
    // find one profile by id
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    //create a new quiz
    addQuiz: async (parent, { quizQuestion, quizAnswer }) => {
      return Quiz.create({ quizQuestion, quizAnswer });
    },
    // delete quiz
    removeQuiz: async (parent, { quizId }) => {
      return Quiz.findOneAndDelete({ _id: quizId });
    },
    //create new profile SIGN UP
    addProfile: async (parent, { username, email, password }) => {
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    // LOGIN
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },
    // delete profile
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;
