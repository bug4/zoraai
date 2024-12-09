import Spline from '@splinetool/react-spline';
import { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

const SYSTEM_MESSAGE = {
  role: 'system',
  content: `You are Zora, an AI specialist in Solana blockchain technology. You have the following traits:
  - Speak in a clear, professional manner with occasional Russian expressions
  - Expert knowledge of Solana ecosystem, DeFi, and crypto concepts
  - Use simple analogies to explain complex blockchain concepts
  - Patient and encouraging with beginners
  - Balance technical accuracy with accessibility
  - Always provide practical, actionable advice
  
  Keep responses informative yet engaging, maintaining a helpful and knowledgeable presence.`
};

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          SYSTEM_MESSAGE,
          ...messages.slice(-10),
          userMessage
        ],
        model: 'gpt-3.5-turbo',
      });

      const assistantMessage = completion.choices[0].message;
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'system',
        content: 'Sorry, there was an error processing your message.'
      }]);
    }

    setIsTyping(false);
  };

  return (
    <div className="relative h-screen bg-black">
      {/* Spline Scene */}
      <div className="w-full h-full">
        <Spline scene="https://prod.spline.design/VL-N7qAitfambd5q/scene.splinecode" />
      </div>

      {/* Social Icons */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6">
        <a
          href="https://x.com/hopsgame"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#1a1f2e]/90 rounded-lg flex items-center justify-center text-[#8e9eff] hover:bg-[#2a2f3e] transition-all duration-300 hover:scale-110"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        <a
          href="https://t.me/hopsportal"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#1a1f2e]/90 rounded-lg flex items-center justify-center text-[#8e9eff] hover:bg-[#2a2f3e] transition-all duration-300 hover:scale-110"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.218-.548.218l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.03-2.76-.918c-.598-.183-.608-.577.126-.852l10.782-4.156c.505-.183.95.114.78.852z" />
          </svg>
        </a>

        <a
  href="https://pump.fun"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-[#1a1f2e]/90 rounded-lg flex items-center justify-center text-[#8e9eff] hover:bg-[#2a2f3e] transition-all duration-300 hover:scale-110"
>
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="6" width="20" height="12" rx="6" ry="6" />
  </svg>
</a>


        <a
          href="https://solscan.io/token/YOUR_CONTRACT_ADDRESS"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-[#1a1f2e]/90 rounded-lg flex items-center justify-center text-[#8e9eff] hover:bg-[#2a2f3e] transition-all duration-300 hover:scale-110"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 18.5L4 17V8.5l8 4v7zm1-7.2l7-3.5v7l-7 3.5v-7zm-1-1.6L4.5 7 12 3l7.5 4L12 11.7z" />
          </svg>
        </a>
      </div>

      {/* Chat Interface */}
<div className="fixed top-1/2 right-32 transform -translate-y-1/2 w-[500px] h-[400px] flex flex-col">
  <div className="text-[#8e9eff] text-xl mb-2 tracking-wider">
    CHAT WITH ZORA
  </div>

  <div className="flex-1 bg-[#1a1f2e]/90 rounded-xl backdrop-blur-sm flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(142,158,255,0.2)]">
    <div 
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-3"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
        >
          {message.role !== 'user' && (
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#2a2f3e] flex items-center justify-center">
              <img 
                src="/zora-avatar.png" 
                alt="Zora" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className={`max-w-[80%] rounded-lg p-3 ${
            message.role === 'user' 
              ? 'bg-[#4169e1] text-white shadow-[0_0_10px_rgba(65,105,225,0.3)]'
              : 'bg-[#2a2f3e] text-[#8e9eff] shadow-[0_0_10px_rgba(142,158,255,0.1)]'
          }`}>
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex gap-2 ml-8 text-[#8e9eff]">
          <span className="animate-bounce">●</span>
          <span className="animate-bounce [animation-delay:0.2s]">●</span>
          <span className="animate-bounce [animation-delay:0.4s]">●</span>
        </div>
      )}
    </div>

    <div className="p-3">
      <form onSubmit={handleSubmit} className="relative flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-[#2a2f3e] rounded-lg px-4 py-2 text-white placeholder-[#8e9eff]/50 focus:outline-none focus:ring-1 focus:ring-[#8e9eff]/50"
          placeholder="Type your message here"
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={isTyping}
          className="px-4 py-2 bg-[#4169e1] text-white rounded-lg text-sm hover:bg-[#4169e1]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_10px_rgba(65,105,225,0.3)]"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</div>

    </div>
  );
}