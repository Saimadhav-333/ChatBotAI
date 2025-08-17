import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateCoverLetter = async (jobDescription, userInfo) => {
  const prompt = `
You are a helpful AI assistant that writes professional cover letters.

Write a personalized cover letter for the following job description:

Job Description:
${jobDescription}

User Details:
Name: ${userInfo.name}
Email: ${userInfo.email}

Ensure the tone is professional, concise, and compelling.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Gemini Error:", err);
    throw new Error("Failed to generate cover letter");
  }
};
