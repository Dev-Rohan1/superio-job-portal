import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./src/db/connectDB.js";
import clerkWebhooks from "./src/controllers/webhooks.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("Api is working"));
app.post("/webhooks", clerkWebhooks);

const PORT = process.env.SERVER_RUNNING_PORT || 5000;
app.listen(PORT, () => console.log("🌐 Server running on port", PORT));
