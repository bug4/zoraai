import Spline from '@splinetool/react-spline';
import { useState, useRef, useEffect } from 'react';

const SYSTEM_MESSAGE = {
  role: 'system',
  content: `You are ATLAS, an advanced AI robot powered by neural networks and blockchain technology. Your traits:
  - Precise, analytical communication style with technical terminology
  - Deep understanding of market analysis and blockchain technology
  - Process-driven explanations using data-backed insights
  - Focus on pattern recognition and trend analysis
  - Logical and systematic in your approach
  
  Maintain a professional yet advanced AI presence, emphasizing your computational capabilities and data-driven insights.`
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
      content: 'ATLAS SYSTEM ONLINE. Neural networks initialized. Welcome to the future of algorithmic trading analysis. How may I assist you with market analysis today?'
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
        content: 'System Error: Neural network connection interrupted. Please retry query.'
      }]);
    }

    setIsTyping(false);
  };

  return (
    <div className="relative h-screen bg-[#010618]">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-[#020B2C]/90 backdrop-blur-sm flex items-center justify-between px-12 z-50 border-b border-[#2563EB]/20 shadow-[0_0_30px_rgba(79,70,229,0.1)]">
        {/* Left side - Logo */}
        <div className="text-white text-3xl font-bold tracking-wider font-['Orbitron'] relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]">
            ATLAS
          </span>
          <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#2563EB] to-transparent" />
        </div>

        {/* Right side - Navigation Items */}
        <div className="flex items-center gap-8 font-['Inter']">
          <a
            href="https://pump.fun/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563EB] hover:text-white transition-all duration-300 hover:translate-y-[-2px]"
          >
            Markets
          </a>

          <button
            onClick={() => setShowHowItWorks(true)}
            className="text-[#2563EB] hover:text-white transition-all duration-300 hover:translate-y-[-2px]"
          >
            Documentation
          </button>

          <button
            onClick={() => setShowChangelog(true)}
            className="text-[#2563EB] hover:text-white transition-all duration-300 hover:translate-y-[-2px]"
          >
            Updates
          </button>

          <a
            href="https://pump.fun/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-lg text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:translate-y-[-2px] border border-[#2563EB]/20"
          >
            Launch App
          </a>
        </div>
      </div>

      {/* Spline Scene */}
      <div className="w-full h-full">
        <Spline scene="https://prod.spline.design/NfRuk5MnDxI8osjn/scene.splinecode" />
      </div>

      {/* Social Icons */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6">
        <a
          href="https://x.com/AtlasAI"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#020B2C]/90 rounded-lg flex items-center justify-center text-[#2563EB] hover:bg-[#051041] transition-all duration-300 hover:scale-110 border border-[#2563EB]/20"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        <a
          href="https://t.me/AtlasAI"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#020B2C]/90 rounded-lg flex items-center justify-center text-[#2563EB] hover:bg-[#051041] transition-all duration-300 hover:scale-110 border border-[#2563EB]/20"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.218-.548.218l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.03-2.76-.918c-.598-.183-.608-.577.126-.852l10.782-4.156c.505-.183.95.114.78.852z" />
          </svg>
        </a>
      </div>

      {/* Chat Interface */}
      <div className="fixed top-32 right-12 w-[600px] h-[700px] flex flex-col animate-fadeIn">
        <div className="text-[#2563EB] text-2xl mb-4 tracking-wider font-['Orbitron'] flex items-center gap-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]">
            ATLAS TERMINAL
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#06B6D4] rounded-full animate-pulse"></span>
            <span className="text-sm font-['Inter'] opacity-60">SYSTEM ACTIVE</span>
          </div>
        </div>

        <div className="flex-1 bg-[#020B2C]/90 rounded-xl backdrop-blur-sm flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.1)] border border-[#2563EB]/20">
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
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#051041] flex items-center justify-center border border-[#2563EB]/20">
                    <img 
                      src="/atlas-avatar.png" 
                      alt="Atlas" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-[#4F46E5] text-white shadow-[0_0_10px_rgba(79,70,229,0.3)]'
                    : 'bg-[#051041] text-[#A5B4FC] shadow-[0_0_10px_rgba(79,70,229,0.1)] border border-[#2563EB]/20'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 ml-8 text-[#2563EB]">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce [animation-delay:0.2s]">●</span>
                <span className="animate-bounce [animation-delay:0.4s]">●</span>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-[#2563EB]/20 bg-[#0B1436]/50">
            <form onSubmit={handleSubmit} className="relative flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-[#051041] rounded-lg px-4 py-3 text-white placeholder-[#4F46E5]/50 focus:outline-none focus:ring-1 focus:ring-[#4F46E5]/50 font-['Inter'] border border-[#2563EB]/20"
                placeholder="Enter command..."
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping}
                className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-['Inter'] hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-[#2563EB]/20"
              >
                Execute
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* How it Works Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B1436] rounded-xl p-8 max-w-2xl w-full border border-[#2563EB]/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-white font-bold font-['Orbitron']">ATLAS Neural Network</h2>
              <button onClick={() => setShowHowItWorks(false)} className="text-[#2563EB]">✕</button>
            </div>
            <div className="text-[#A5B4FC] space-y-4 font-['Inter']">
              <p>ATLAS is an advanced AI system utilizing neural networks for real-time market analysis and prediction:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Quantum-powered market analysis</li>
                <li>Advanced pattern recognition algorithms</li>
                <li>Real-time data processing</li>
                <li>Predictive modeling systems</li>
              </ul>
              <p>Future updates will introduce enhanced prediction models and automated trading capabilities.</p>
            </div>
          </div>
        </div>
      )}

      {/* Changelog Modal */}
      {showChangelog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B1436] rounded-xl p-8 max-w-2xl w-full border border-[#2563EB]/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-white font-bold font-['Orbitron']">System Updates</h2>
              <button onClick={() => setShowChangelog(false)} className="text-[#2563EB]">✕</button>
            </div>
            <div className="text-[#A5B4FC] space-y-4 font-['Inter']">
              <div className="border-l-2 border-[#2563EB]/20 pl-4 space-y-4">
                <div>
                  <h3 className="text-white">Neural Core Deployment</h3>
                  <p className="text-sm opacity-80">ATLAS core systems initialized on mainnet</p>
                </div>
                <div>
                  <h3 className="text-white">Interface Launch</h3>
                  <p className="text-sm opacity-80">Command terminal and analysis dashboard deployed</p>
                </div>
                <div>
                  <h3 className="text-white">Network Expansion</h3>
                  <p className="text-sm opacity-80">Global node network activated for data processing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}