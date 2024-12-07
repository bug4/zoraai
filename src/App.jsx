import Spline from '@splinetool/react-spline';
import { useState, useEffect } from 'react';

const KeyButton = ({ children, className }) => (
  <div className={`w-10 h-10 bg-gray-800 border-2 border-purple-500/50 rounded-lg flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.3)] ${className}`}>
    {children}
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', ' '].includes(key)) {
        setActiveKey(key);
      }
      if (e.key === 'Escape') {
        setShowAbout(false);
      }
    };
    
    const handleKeyUp = () => setActiveKey(null);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-[#1a1a2e] z-50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-green-500 border-l-orange-500 rounded-full animate-spin"></div>
          <h2 className="text-white text-2xl mt-8 font-bold">Loading Space...</h2>
          <div className="w-64 h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full animate-[loading_2s_ease-in-out]"></div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/90 max-w-2xl rounded-2xl p-8 border border-purple-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-purple-400">About LEAP</h2>
              <button 
                onClick={() => setShowAbout(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 text-gray-200">
              <p>Welcome to LEAP - The first-ever daily competitive platformer on Solana!</p>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-purple-400">Daily Challenges</h3>
                <p>Every 24 hours, a new level appears in the LEAP universe. Your mission? Complete it faster than anyone else!</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-purple-400">Prize Pool</h3>
                <p>Each day brings a fresh opportunity to win SOL. The fastest astronaut to complete the daily mission takes home the prize pool!</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-purple-400">How It Works</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>New level unlocks every day at 00:00 UTC</li>
                  <li>Complete the level as fast as you can</li>
                  <li>Your best time is automatically recorded</li>
                  <li>Daily winner receives the SOL prize</li>
                  <li>Global leaderboard updates in real-time</li>
                </ul>
              </div>
              <div className="mt-6 p-4 bg-purple-500/20 rounded-xl">
                <p className="text-center font-bold">Join the space race and prove you're the fastest astronaut in the galaxy!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Controls Display */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl z-40 border border-purple-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <h3 className="text-xl font-bold mb-6 text-purple-400 text-center">Controls</h3>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div></div>
          <KeyButton className={activeKey === 'w' ? 'bg-purple-600' : ''}>W</KeyButton>
          <div></div>
          <KeyButton className={activeKey === 'a' ? 'bg-purple-600' : ''}>A</KeyButton>
          <KeyButton className={activeKey === 's' ? 'bg-purple-600' : ''}>S</KeyButton>
          <KeyButton className={activeKey === 'd' ? 'bg-purple-600' : ''}>D</KeyButton>
        </div>

        <div className="mt-4">
          <div className={`w-full h-10 bg-gray-800 border-2 border-purple-500/50 rounded-lg flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.3)] ${activeKey === ' ' ? 'bg-purple-600' : ''}`}>
            SPACE
          </div>
          <p className="text-purple-400 text-sm mt-2 text-center">JUMP</p>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-40 flex justify-center items-center p-4">
        <div className="flex gap-6">
          <a
            href="https://x.com/LeapSolana"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
          >
            Twitter
          </a>

          <a
            href="https://t.me/leaponsol"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          >
            Telegram
          </a>

          <a
            href="https://pump.fun/coin/4MPp8MWerw8X8XzoBu58ox26c7NCV4hiRmwvS2Ewpump"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
          >
            Buy Now
          </a>

          <button
            onClick={() => setShowAbout(true)}
            className="px-6 py-3 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          >
            About
          </button>
        </div>
      </nav>

      {/* Spline Scene */}
      <div style={{ width: '100vw', height: '100vh' }}>
        <Spline scene="https://prod.spline.design/yAKmh5oup6rMMwLn/scene.splinecode" />
      </div>
    </div>
  );
}