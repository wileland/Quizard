import { Schema, model } from 'mongoose';

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  questionNumber: {
    type: Number,

  },
  questions: [
    {
      questionText: String,
      answerOptions: [String],
      correctAnswer: String,
    },
  ],
  isActive: { // New field to indicate whether the quiz is currently active
    type: Boolean,
    default: false, // By default, a quiz is inactive when created
  },
  // Additional fields as required
}, {
  timestamps: true, // Optionally, add timestamps for creation and updates
});

const Quiz = model('Quiz', quizSchema);

export default Quiz;