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
    <div className="fixed bottom-5 left-5 z-50 font-sans">
      
    </div>
  );
};

export default Chatbot;
