import Quiz from "../models/Quiz.js";
import Profile from "../models/Profile.js";
import Game from "../models/Game.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

const resolvers = {
  Query: {
    getGame: async (_, { hostId }) => Game.findOne({ hostId }),
    quizzes: async () =>  Quiz.find,
    quiz: async (_, { quizId }) => await Quiz.findOne({ _id: quizId }),
    profiles: async () => Profile.find(),
    profile: async (_, { profileId }) => Profile.findOne({ _id: profileId }),
    getPlayer: async (_, { playerId }) => Profile.findOne({ _id: playerId }),
    getPlayers: async (_, { hostId }) => Profile.find({ hostId }),
    me: async (_, __, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("User not authenticated");
    },
  },
  Mutation: {
    addQuiz: async (_, { title, questions, createdBy }) => {
      questions.forEach((question) => {
        if (!question.questionText) {
          throw new Error("Each question must have a questionText");
        }
      });
      return await Quiz.create({ title, questions, createdBy });
    },
    removeQuiz: async (_, { quizId }) => Quiz.findOneAndDelete({ _id: quizId }),
    addProfile: async (_, { username, email, password }) => {
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile);
      return { token, profile };
    },
    login: async (_, { email, password }) => {
      const profile = await Profile.findOne({ email });
      if (!profile) {
        throw new AuthenticationError("Profile not found");
      }
      const correctPw = await profile.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }
      const token = signToken(profile);
      return { token, profile };
    },
    removeProfile: async (_, __, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("User not authenticated");
    },
    addPlayer: async (_, { hostId, playerId, username, gameData }) => {
      const newPlayer = new Profile({ hostId, playerId, username, gameData });
      await newPlayer.save();
      return newPlayer;
    },
    removePlayer: async (_, { playerId }) =>
      Profile.findOneAndDelete({ _id: playerId }),
    addGame: async (_, { pin, hostId, gameLive, gameData }) => {
      const newGame = new Game({ pin, hostId, gameLive, gameData });
      await newGame.save();
      return newGame;
    },
    removeGame: async (_, { hostId }) => Game.findOneAndDelete({ hostId }),
    addQuestion: async (
      _,
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
      throw new AuthenticationError("User not authenticated");
    },
    removeQuestion: async (_, { quizId, questionText }, context) => {
      if (context.user) {
        return Quiz.findOneAndUpdate(
          { _id: quizId },
          { $pull: { questions: { questionText } } },
          { new: true },
        );
      }
      throw new AuthenticationError("User not authenticated");
    },
    activateQuiz: async (_, { quizId, isActive }, context) => {
      if (context.user) {
        return Quiz.findByIdAndUpdate(quizId, { isActive }, { new: true });
      }
      throw new AuthenticationError("User not authenticated");
    },
  },
};

export default resolvers;
