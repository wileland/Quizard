import { Schema, SchemaTypes, model } from "mongoose";

const quizSchema = new Schema(
  {
    title: { type: String, required: true },
    createdBy: { type: SchemaTypes.ObjectId, ref: "Profile", required: true },
    questions: [
      {
        questionText: String,
        answerOptions: [String],
        correctAnswer: String,
      },
    ],
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Quiz = model("Quiz", quizSchema);

export default Quiz;
