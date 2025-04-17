
import React, { useState } from 'react';
import Lottie from 'lottie-react';
import hamsterAnimation from './hamster-lottie.json';

const HamsterChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMessage = { sender: 'grind', text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 p-4 rounded-2xl shadow-xl bg-amber-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-24 h-24">
          <Lottie animationData={hamsterAnimation} loop autoplay />
        </div>
        <div className="text-xl font-bold">Grind the Barista</div>
      </div>
      <div className="h-64 overflow-y-auto bg-white p-2 rounded-md mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-1 ${msg.sender === 'user' ? 'text-right' : 'text-left text-brown-700'}`}>
            <span className="inline-block px-2 py-1 bg-brown-100 rounded">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask Grind something..."
        />
        <button className="bg-brown-600 text-white px-3 py-1 rounded" onClick={sendMessage} disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default HamsterChatbot;
