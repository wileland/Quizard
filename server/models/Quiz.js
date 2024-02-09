import { Schema, model } from 'mongoose';

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  questionNumber: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  questions: [
    {
      question: String,
      answerOptions: [String],
      correctAnswer: String,
    },
  ],
  // Additional fields as required
});

const Quiz = model('Quiz', quizSchema);

export default Quiz;
