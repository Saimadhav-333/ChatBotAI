import express from "express";
import { chatWithAI,clearChat,getChatHistory } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/bot",protect, chatWithAI);
router.delete("/clear",protect,clearChat);
router.get('/history', protect, getChatHistory);

export default router;
