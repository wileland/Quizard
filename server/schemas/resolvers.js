import Quiz from "../models/Quiz.js";
import Profile from "../models/Profile.js";
import Game from "../models/Game.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

const resolvers = {
  Query: {
    getGame: async (parent, { hostId }) => {
      return await Game.findOne({ hostId });
    },
    quizzes: async () => {
      return Quiz.find().sort({ createdAt: -1 });
    },
    quiz: async (parent, { quizId }) => {
      return Quiz.findOne({ _id: quizId });
    },
    profiles: async () => {
      return Profile.find();
    },
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    getPlayer: async (parent, { playerId }) => {
      return await Profile.findOne({ playerId });
    },
    getPlayers: async (parent, { hostId }) => {
      return await Profile.find({ hostId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError();
    },
  },
  Mutation: {
    addQuiz: async (parent, { title, questions }) => {
      return Quiz.create({ title, questions });
    },
    removeQuiz: async (parent, { quizId }) => {
      return Quiz.findOneAndDelete({ _id: quizId });
    },
    addProfile: async (parent, { username, email, password }) => {
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile);
      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });
      if (!profile) {
        throw new AuthenticationError();
      }
      const correctPw = await profile.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError();
      }
      const token = signToken(profile);
      return { token, profile };
    },
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError();
    },
    addPlayer: async (parent, { hostId, playerId, username, gameData }) => {
      const newPlayer = new Profile({
        hostId,
        playerId,
        username,
        gameData,
      });
      await newPlayer.save();
      return newPlayer;
    },
    removePlayer: async (parent, { playerId }) => {
      return await Profile.findOneAndDelete({ playerId });
    },
    addGame: async (parent, { pin, hostId, gameLive, gameData }) => {
      const newGame = new Game({ pin, hostId, gameLive, gameData });
      await newGame.save();
      return newGame;
    },
    removeGame: async (parent, { hostId }) => {
      return await Game.findOneAndDelete({ hostId });
    },
    addQuestion: async (
      parent,
      { quizId, question, answerOptions, correctAnswer },
      context,
    ) => {
      if (context.user) {
        const updatedQuiz = await Quiz.findOneAndUpdate(
          { _id: quizId },
          {
            $addToSet: {
              questions: {
                questionText: question,
                answerOptions,
                correctAnswer,
              },
            },
          },
          { new: true, runValidators: true },
        );
        return updatedQuiz;
      }
      throw new AuthenticationError("User not authenticated!!");
    },
    removeQuestion: async (parent, { question }, context) => {
      if (context.user) {
        return Quiz.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { questions: { questionText: question } } },
          { new: true },
        );
      }
      throw new AuthenticationError();
    },
    activateQuiz: async (parent, { id, isActive }, context) => {
      if (context.user) {
        const updatedQuiz = await Quiz.findByIdAndUpdate(
          id,
          { isActive },
          { new: true },
        );
        return updatedQuiz;
      }
      throw new AuthenticationError("You must be logged in to activate a quiz");
    },
  },
};

export default resolvers;
