import Spline from '@splinetool/react-spline';
import { useState, useRef, useEffect } from 'react';

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
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am Zora, an AI assistant specialized in Solana blockchain technology. Feel free to ask me anything about Solana, DeFi, or crypto concepts. I\'m here to help you understand and navigate the blockchain space better.'
    }
  ]);

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
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: [
            SYSTEM_MESSAGE,
            ...messages.slice(-10),
            userMessage
          ]
        })
      });

      const assistantMessage = await response.json();
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
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-[#1a1f2e]/90 backdrop-blur-sm flex items-center justify-between px-12 z-50 border-b border-[#8e9eff]/10 shadow-lg">
        {/* Left side - Logo */}
        <div className="text-white text-3xl font-bold tracking-wider font-['Orbitron'] relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8e9eff] to-[#4169e1]">
            ZORA
          </span>
          <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#8e9eff] to-transparent" />
        </div>

        {/* Right side - Navigation Items */}
        <div className="flex items-center gap-8 font-['Inter']">
          <a
            href="https://pump.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8e9eff] hover:text-white transition-all duration-300 hover:translate-y-[-2px]"
          >
            Chart
          </a>

          <button
            onClick={() => setShowHowItWorks(true)}
            className="text-[#8e9eff] hover:text-white transition-all duration-300 hover:translate-y-[-2px]"
          >
            How it Works
          </button>

          <button
            onClick={() => setShowChangelog(true)}
            className="text-[#8e9eff] hover:text-white transition-all duration-300 hover:translate-y-[-2px]"
          >
            Changelog
          </button>

          <a
            href="https://pump.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:translate-y-[-2px]"
          >
            BUY $ZORA
          </a>
        </div>
      </div>

      {/* Spline Scene */}
      <div className="w-full h-full">
        <Spline scene="https://prod.spline.design/VL-N7qAitfambd5q/scene.splinecode" />
      </div>

      {/* Social Icons */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6">
        <a
          href="https://x.com/ZoraTerminal"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#1a1f2e]/90 rounded-lg flex items-center justify-center text-[#8e9eff] hover:bg-[#2a2f3e] transition-all duration-300 hover:scale-110"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        <a
          href="https://t.me/ZoraPortal"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#1a1f2e]/90 rounded-lg flex items-center justify-center text-[#8e9eff] hover:bg-[#2a2f3e] transition-all duration-300 hover:scale-110"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.218-.548.218l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.03-2.76-.918c-.598-.183-.608-.577.126-.852l10.782-4.156c.505-.183.95.114.78.852z" />
          </svg>
        </a>
      </div>

      {/* Chat Interface */}
      <div className="fixed top-32 right-12 w-[600px] h-[700px] flex flex-col animate-fadeIn">
        <div className="text-[#8e9eff] text-2xl mb-4 tracking-wider font-['Orbitron'] flex items-center gap-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8e9eff] to-[#4169e1]">
            CHAT WITH ZORA
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#4169e1] rounded-full animate-pulse"></span>
            <span className="text-sm font-['Inter'] opacity-60">AI Active</span>
          </div>
        </div>

        <div className="flex-1 bg-[#1a1f2e]/90 rounded-xl backdrop-blur-sm flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(142,158,255,0.1)] border border-[#8e9eff]/10">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 font-['Inter']"
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

          <div className="p-4 border-t border-[#8e9eff]/10 bg-[#1a1f2e]/50">
            <form onSubmit={handleSubmit} className="relative flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-[#2a2f3e] rounded-lg px-4 py-3 text-white placeholder-[#8e9eff]/50 focus:outline-none focus:ring-1 focus:ring-[#8e9eff]/50 font-['Inter']"
                placeholder="Type your message here..."
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping}
                className="px-6 py-3 bg-gradient-to-r from-[#4169e1] to-[#8e9eff] text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-['Inter'] hover:shadow-[0_0_20px_rgba(65,105,225,0.3)]"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* How it Works Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f2e] rounded-xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-white font-bold font-['Orbitron']">How Zora Works</h2>
              <button onClick={() => setShowHowItWorks(false)} className="text-[#8e9eff]">✕</button>
            </div>
            <div className="text-[#8e9eff] space-y-4 font-['Inter']">
              <p>Zora is an advanced AI system specifically trained on Solana blockchain data and market patterns. It continuously learns and evolves through:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Real-time blockchain data analysis</li>
                <li>Neural network training on market patterns</li>
                <li>Community interaction and feedback</li>
                <li>Advanced trading analytics integration</li>
              </ul>
              <p>Soon, Zora will be capable of providing real-time trading insights and automated analysis based on its growing understanding of the Solana ecosystem.</p>
            </div>
          </div>
        </div>
      )}

      {/* Changelog Modal */}
      {showChangelog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f2e] rounded-xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-white font-bold font-['Orbitron']">Changelog</h2>
              <button onClick={() => setShowChangelog(false)} className="text-[#8e9eff]">✕</button>
            </div>
            <div className="text-[#8e9eff] space-y-4 font-['Inter']">
              <div className="border-l-2 border-[#8e9eff]/20 pl-4 space-y-4">
                <div>
                  <h3 className="text-white">Token Deployment</h3>
                  <p className="text-sm opacity-80">$ZORA token successfully deployed on Solana</p>
                </div>
                <div>
                  <h3 className="text-white">Website Launch</h3>
                  <p className="text-sm opacity-80">Official website and AI chat interface deployed</p>
                </div>
                <div>
                  <h3 className="text-white">Social Media</h3>
                  <p className="text-sm opacity-80">Twitter account created and community building initiated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}