import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { XPBar } from './XPBar';
import { useAuthStore } from '../store/useAuthStore';
import { useGameStore } from '../store/useGameStore';

export function Header() {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const { streak, resetProgress } = useGameStore();
  const isHome = location.pathname === '/';

  const handleLogout = async () => {
    resetProgress();
    await signOut(auth);
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Spiller';
  const photoURL = user?.photoURL;

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
              <div className="flex items-center gap-1 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                🔥 {streak}
              </div>
            )}
            {!isHome && (
              <Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">
                ← Hjem
              </Link>
            )}
            {/* User avatar + logout */}
            <div className="flex items-center gap-2 group relative">
              {photoURL ? (
                <img src={photoURL} alt={displayName} className="w-8 h-8 rounded-full border-2 border-white/50" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-white font-bold text-sm">
                  {displayName[0].toUpperCase()}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="text-white/60 hover:text-white text-xs transition-colors hidden group-hover:block absolute right-0 top-10 bg-indigo-800 px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-10"
              >
                Logg ut
              </button>
            </div>
          </div>
        </div>
        <XPBar />
      </div>
    </header>
  );
}
