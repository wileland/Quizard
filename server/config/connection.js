import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('MONGO_URI=mongodb://127.0.0.1:27017/QuizardDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
