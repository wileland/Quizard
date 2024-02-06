import { Schema, model } from 'mongoose';

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

const Quiz = model('Quiz', quizSchema);

export default Quiz;
