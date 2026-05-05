import { Link, useLocation } from 'react-router-dom';
import { XPBar } from './XPBar';
import { useGameStore } from '../store/useGameStore';

export function Header() {
  const location = useLocation();
  const { streak } = useGameStore();
  const isHome = location.pathname === '/';

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-90 transition-opacity">
            <span className="text-2xl">🧮</span>
            <span>MatteMester</span>
          </Link>
          <div className="flex items-center gap-3">
            {streak >= 2 && (
              <div className="flex items-center gap-1 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse-once">
                🔥 {streak}
              </div>
            )}
            {!isHome && (
              <Link
                to="/"
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                ← Hjem
              </Link>
            )}
          </div>
        </div>
        <XPBar />
      </div>
    </header>
  );
}
