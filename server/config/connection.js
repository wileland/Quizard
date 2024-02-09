import mongoose from 'mongoose';
const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/QuizardDB');
};
const db = mongoose.connection;
export default db;
