import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { v2 as cloudinary } from "cloudinary";

import webhook from "./src/controller/webHook.js";

// Initialize the express server
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors({ credentials: true }));
app.use(express.json()); // Replaces bodyParser.json()
app.use(cookieParser());

mongoose
  .connect(`${process.env.DATABASE_CONNECTION_URL}job-portal`)
  .then(() => console.log("database connection successfull"))
  .catch((error) => console.log(error));

cloudinary.config({
  cloud_name: process.env.CLOUDINERY_NAME,
  api_key: process.env.CLOUDINERY_API_KEY,
  api_secret: process.env.CLOUDINERY_API_SECRET,
});

// Define a valid API route
app.get("/", (req, res) => {
  res.send("Api Working");
});
app.post("/webhooks", webhook);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
