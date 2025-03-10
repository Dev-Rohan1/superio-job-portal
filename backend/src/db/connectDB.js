import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_URL + "job-portal");
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❎ Database connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
