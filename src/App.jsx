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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', ' '].includes(key)) {
        setActiveKey(key);
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

      {/* Game Controls Display */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl z-40 border border-purple-500/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <h3 className="text-xl font-bold mb-6 text-purple-400 text-center">Controls</h3>
        
        {/* WASD Keys */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div></div>
          <KeyButton className={activeKey === 'w' ? 'bg-purple-600' : ''}>W</KeyButton>
          <div></div>
          <KeyButton className={activeKey === 'a' ? 'bg-purple-600' : ''}>A</KeyButton>
          <KeyButton className={activeKey === 's' ? 'bg-purple-600' : ''}>S</KeyButton>
          <KeyButton className={activeKey === 'd' ? 'bg-purple-600' : ''}>D</KeyButton>
        </div>

        {/* Spacebar */}
        <div className="mt-4">
          <div className={`w-full h-10 bg-gray-800 border-2 border-purple-500/50 rounded-lg flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.3)] ${activeKey === ' ' ? 'bg-purple-600' : ''}`}>
            SPACE
          </div>
          <p className="text-purple-400 text-sm mt-2 text-center">JUMP</p>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-40 flex justify-center items-center p-4">
        <div className="flex gap-6 bg-black bg-opacity-30 backdrop-blur-md px-8 py-4 rounded-full">
          <a href="#twitter" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(139,92,246,0.5)]">Twitter</a>
          <a href="#telegram" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)]">Telegram</a>
          <a href="#buy" className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(249,115,22,0.5)]">Buy Now</a>
        </div>
      </nav>

      {/* Spline Scene */}
      <div style={{ width: '100vw', height: '100vh' }}>
        <Spline scene="https://prod.spline.design/wl54UrggXabcewt6/scene.splinecode" />
      </div>
    </div>
  );
}