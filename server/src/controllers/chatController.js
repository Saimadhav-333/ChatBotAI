import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from '../models/chatmodel.js'
import User from '../models/usermodel.js'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get user's last chat session or create one
    let chat = await Chat.findOne({ user: userId });
    if (!chat) {
      chat = new Chat({ user: userId, messages: [] });
    }

    // Add user message
    chat.messages.push({ role: "user", content: message });

    // Generate AI response
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const historyText = chat.messages
      .map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n");

    const prompt = `${historyText}\nASSISTANT:`;

    const result = await model.generateContent(prompt);
    const reply = result?.response?.text?.() || "Sorry, I couldn't generate a response.";

    // Save assistant reply
    chat.messages.push({ role: "assistant", content: reply });

    // Save to DB
    await chat.save();

    res.json({ reply, history: chat.messages });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get chat history
export const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const chat = await Chat.findOne({ user: userId });
    
    if (!chat) {
      return res.json({ messages: [] });
    }
    
    res.json({ messages: chat.messages });
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

// Clear chat history (start new chat)
export const clearChat = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find and clear the chat for this user
    const chat = await Chat.findOne({ user: userId });
    if (chat) {
      chat.messages = [];
      await chat.save();
    }
    
    res.json({ message: "Chat cleared successfully" });
  } catch (err) {
    console.error("Error clearing chat:", err);
    res.status(500).json({ error: "Failed to clear chat" });
  }
};