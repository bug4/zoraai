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
          <h2 className="text-white text-2xl mt-8 font-bold">Loading COSM Game ...</h2>
          <div className="w-64 h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full animate-[loading_2s_ease-in-out]"></div>
          </div>
        </div>
      )}
      {/* HOPS Logo */}
      <div className="fixed top-10 left-10 z-40">
        <h1 className="text-8xl font-black tracking-tight flex">
          <span className="inline-block animate-bounce-slow relative">
            {/* H Letter */}
            <span className="absolute -inset-1 text-black blur-[2px] select-none">H</span>
            <span className="relative text-[#8B89FF]">H</span>
          </span>
          {/* O Letter */}
          <span className="inline-block animate-bounce-slow relative [animation-delay:0.1s]">
            <span className="absolute -inset-1 text-black blur-[2px] select-none">O</span>
            <span className="relative text-[#FF8A3D]">O</span>
          </span>
          {/* P Letter */}
          <span className="inline-block animate-bounce-slow relative [animation-delay:0.2s]">
            <span className="absolute -inset-1 text-black blur-[2px] select-none">P</span>
            <span className="relative text-[#65d6ad]">P</span>
          </span>
          {/* S Letter */}
          <span className="inline-block animate-bounce-slow relative [animation-delay:0.3s]">
            <span className="absolute -inset-1 text-black blur-[2px] select-none">S</span>
            <span className="relative text-[#FFD43B]">S</span>
          </span>
        </h1>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900/90 max-w-2xl rounded-2xl p-8 border border-purple-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-purple-400">About COSM</h2>
              <button 
                onClick={() => setShowAbout(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 text-gray-200">
              <p>Welcome to Cosmic Odyssey Space Mission - Where astronauts embark on an epic browser-based adventure in the Solana universe!</p>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-purple-400">The Mission</h3>
                <p>Navigate through mystical cosmic landscapes, collecting rare stellar artifacts and completing challenging space missions. Each jump brings you closer to becoming a legendary space explorer!</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-purple-400">Stellar Rewards</h3>
                <p>Complete missions to earn $COSM tokens and unique space artifacts. The more challenging the mission, the greater the rewards await in the cosmic vault!</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-purple-400">Cosmic Features</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Browser-based space exploration game</li>
                  <li>Zero-gravity platforming mechanics</li>
                  <li>Collect rare cosmic artifacts</li>
                  <li>Earn while exploring the cosmos</li>
                  <li>Join an interstellar community</li>
                </ul>
              </div>
              <div className="mt-6 p-4 bg-purple-500/20 rounded-xl">
                <p className="text-center font-bold">Your cosmic odyssey awaits! Jump into the stars and become part of the next generation of space explorers! 🚀✨</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Replace the existing Game Controls Display with this new version */}
      {/* Game Controls Display */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center">
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg">
          {/* WASD Keys */}
          <div className="grid grid-cols-3 gap-2">
            <div></div>
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 transition-all duration-200 ${activeKey === 'w' ? 'bg-white/30' : ''}`}>
              <span className="text-white/80 font-medium text-lg">W</span>
            </div>
            <div></div>
            
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 transition-all duration-200 ${activeKey === 'a' ? 'bg-white/30' : ''}`}>
              <span className="text-white/80 font-medium text-lg">A</span>
            </div>
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 transition-all duration-200 ${activeKey === 's' ? 'bg-white/30' : ''}`}>
              <span className="text-white/80 font-medium text-lg">S</span>
            </div>
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 transition-all duration-200 ${activeKey === 'd' ? 'bg-white/30' : ''}`}>
              <span className="text-white/80 font-medium text-lg">D</span>
            </div>
          </div>

          {/* Spacebar */}
          <div className="mt-3">
            <div className={`h-12 w-48 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 transition-all duration-200 ${activeKey === ' ' ? 'bg-white/30' : ''}`}>
              <span className="text-white/80 font-medium text-sm">SPACE</span>
            </div>
            <p className="text-white/50 text-xs mt-2 text-center">jump</p>
          </div>
        </div>
      </div>

      {/* Update the Navigation Bar section with these new styles */}
      <nav className="fixed top-0 w-full z-40 flex justify-center items-center p-4">
        <div className="flex gap-4">
          <a
            href="https://x.com/CosmSolana"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium transition-all duration-300 hover:scale-105 hover:bg-white/20 shadow-lg"
          >
            Twitter
          </a>

          <a
            href="https://t.me/cosmsolana"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium transition-all duration-300 hover:scale-105 hover:bg-white/20 shadow-lg"
          >
            Telegram
          </a>

          <a
            href="https://pump.fun/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-2xl bg-[#65d6ad]/20 backdrop-blur-sm border border-[#65d6ad]/30 text-white font-medium transition-all duration-300 hover:scale-105 hover:bg-[#65d6ad]/30 shadow-lg"
          >
            Buy Now
          </a>

          <button
            onClick={() => setShowAbout(true)}
            className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium transition-all duration-300 hover:scale-105 hover:bg-white/20 shadow-lg"
          >
            About
          </button>
        </div>
      </nav>

      {/* Spline Scene */}
      <div style={{ width: '100vw', height: '100vh' }}>
        <Spline scene="https://prod.spline.design/UgeH0tX3o6QrrJME/scene.splinecode" />
      </div>
    </div>
  );
}