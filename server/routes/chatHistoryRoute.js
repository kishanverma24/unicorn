import express from "express";
import {
  addChatToHistory,
  deleteChat,
  getChatHistory,
} from "../controllers/chatHistoryController.js";
const router = express.Router();

router.post("/addchat", addChatToHistory);
router.post("/deletechat", deleteChat);
router.get("/getchat", getChatHistory);

export { router as ChatHistoryRouter };
