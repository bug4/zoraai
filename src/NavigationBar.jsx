import { Twitter, Telegram, ShoppingCart } from 'lucide-react';

export default function NavigationBar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center items-center p-4 bg-opacity-20 bg-black backdrop-blur-sm">
      <div className="flex gap-6">
        <a
          href="#twitter"
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white transform hover:scale-105 transition-all duration-300"
        >
          <Twitter size={20} />
          <span className="font-semibold">Twitter</span>
        </a>

        <a
          href="#telegram"
          className="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white transform hover:scale-105 transition-all duration-300"
        >
          <Telegram size={20} />
          <span className="font-semibold">Telegram</span>
        </a>

        <a
          href="#buy"
          className="flex items-center gap-2 px-8 py-2 rounded-full bg-green-500 hover:bg-green-400 text-white transform hover:scale-105 transition-all duration-300"
        >
          <ShoppingCart size={20} />
          <span className="font-semibold">Buy Now</span>
        </a>
      </div>
    </nav>
  );
}