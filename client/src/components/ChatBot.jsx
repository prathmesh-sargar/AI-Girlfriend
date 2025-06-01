import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const chatEndRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, userMsg]);

     // Voice output function
//   const speakText = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = 'en-US';
//     utterance.pitch = 1.2;
//     utterance.rate = 1;
//     speechSynthesis.speak(utterance);
//   };

    try {
      const response = await axios.post('https://ai-girlfriend-backend.vercel.app/api/chat', {
        userMessage: userInput,
      });

      const botMsg = { sender: 'bot', text: response.data.reply };
      setMessages((prev) => [...prev, botMsg]);
    //    speakText(botMsg?.text); // Speak the bot message
    } catch (error) {
      const errorMsg = { sender: 'bot', text: 'Oops! Something went wrong.',error };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setUserInput('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[90vh] bg-gray-900 rounded-xl shadow-2xl flex flex-col border border-gray-700">
        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs ${
                  msg.sender === 'user' ? 'bg-blue-600' : 'bg-pink-600'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <form
          onSubmit={sendMessage}
          className="p-4 border-t border-gray-700 flex gap-2 bg-gray-800"
        >
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
            placeholder="Say something to your AI girlfriend..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
