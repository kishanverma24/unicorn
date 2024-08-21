import express from "express";
import {
  addChatToHistory,
  deleteChat,
} from "../controllers/chatHistoryController.js";
const router = express.Router();

router.post("/addchat", addChatToHistory);
router.post("/deletechat", deleteChat);

export { router as ChatHistoryRouter };
