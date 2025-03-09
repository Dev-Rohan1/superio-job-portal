import express from "express";
import test from "../controllers/test.js";
import clerkWebHooks from "../controllers/webHooks.js";

const router = express.Router();

router.get("/", test);
router.post("/webhooks", clerkWebHooks);

export default router;
