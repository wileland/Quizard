import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/QuizardDB');
};


export default connectDB;