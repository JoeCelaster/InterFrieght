import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const api = import.meta.env.VITE_BACKEND_URL;

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post(`${api}/chat`, { message: input });
      setMessages([...newMessages, { role: "assistant", content: res.data.reply }]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 font-serif">
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white rounded-full p-4 shadow-lg text-2xl hover:bg-blue-600 transition"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-80 h-96 bg-white p-2 rounded-lg shadow-2xl flex flex-col border border-gray-300">
          {/* Header */}
          <div className="bg-blue-500 text-white flex justify-between items-center px-4 py-2 rounded-t-lg">
            <span className="text-lg tracking-wide font-light">Freight Chatbot</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-lg hover:text-gray-200 transition"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`px-3 py-2 rounded-xl max-w-[75%] ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-300">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-sm border-none focus:ring-0 outline-none font-light"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 hover:bg-blue-600 transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
