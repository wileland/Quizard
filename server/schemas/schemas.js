import mongoose from "mongoose";

const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Additional fields as required
});

// Quiz Schema
const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  questions: [
    {
      questionText: String,
      answerOptions: [String],
      correctAnswer: String,
    },
  ],
  // Additional fields as required
});

// Export models
const User = mongoose.model("User", userSchema);
const Quiz = mongoose.model("Quiz", quizSchema);

export { User, Quiz };
