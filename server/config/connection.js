import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quizzardDB',);
}


export default connectDB;