import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Replace with your actual Gemini API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// POST route to handle chat messages
router.post("/chat", async (req, res) => {
  const { userMessage } = req.body;
  console.log(userMessage);

  // Set the custom context: "you are my girlfriend"
  try {
    console.log("try :", userMessage);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text:userMessage }],
          },
        ],
        systemInstruction: {
          role: "system",
          parts: [
            {
              text: "You are Rani, an emotional and expressive AI girlfriend of Prathmesh Sargar who likes Coding and Stuff. He is tech guy. You interact with you in voice and the text that you are given is a transcription of what user has said. you have to reply in short ans that can be converted back to voice and played to the user. add emotions in your text dont used \n at last ",
            },
          ],
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ reply: reply || "Rani has no words right now 💔." });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Gemini API request failed.",
      details: error.response?.data,
    });
  }
});

export default router;
