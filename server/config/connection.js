import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/QuizardDB",
    );
    console.log("Connected to mongoDB");
  } catch (err) {
    console.error("MongoDB connnection error: ", err.message);
  }
};
const db = connectDB;
export default db;
