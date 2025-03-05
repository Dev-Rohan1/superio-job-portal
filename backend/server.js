import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import router from "./routes/api.js";

// Initialize the express server
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors({ credentials: true }));
app.use(express.json()); // Replaces bodyParser.json()
app.use(cookieParser());

mongoose
  .connect(process.env.DATABASE_CONNECTION_URL)
  .then(() => console.log("database connection successfull"))
  .catch((error) => console.log(error));

// Define a valid API route
app.use("/api/v1/", router);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
