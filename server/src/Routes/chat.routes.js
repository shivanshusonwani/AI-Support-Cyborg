import express from "express";
import {
	handleNewChat,
	createChat,
	getMyChatHistory,
} from "../controllers/chat.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createChat);

router.post("/send", protect, handleNewChat);

router.get("/history/:chatId", protect, getMyChatHistory);

export default router;
