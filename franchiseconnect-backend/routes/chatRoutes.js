import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createOrGetChat, sendMessage, getMessages } from "../controllers/chatController.js";

const router = express.Router();
router.post("/create", protect, createOrGetChat);
router.post("/message", protect, sendMessage);
router.get("/:chatId/messages", protect, getMessages);
export default router;
