import express from "express";
import { addMessage, getMessages } from "../controllers/messageController.js";
const router = express.Router();

router.post("/add", addMessage);
router.post("/get", getMessages);

export { router as MessageRouter };
