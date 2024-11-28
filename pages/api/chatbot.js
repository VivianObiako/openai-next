// FILE: pages/api/chatbot.js
import { OpenAI } from "openai";

export default async function handler(req, res) {
  const openai = new OpenAI({ apiKey: process.env.NEXT_API_KEY });

  const { question } = req.body;

  console.log("Question >>>", question);

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: question || "What is car?",
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 300,
    });

    res.status(200).json({ message: response.data });
  } catch (error) {
    console.log("Error >>>", error);
  }
}
