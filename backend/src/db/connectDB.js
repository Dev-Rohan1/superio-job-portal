import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.DATABASE_CONNECTION_URL}/superio-job-portal`
    );

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.log(error);
    console.log("❎ Database connection failed");
  }
};

export default connectDB;
