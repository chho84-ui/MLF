import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from './lib/firebase';
import { EMAIL_KEY } from './pages/LoginPage';
import { useAuthStore } from './store/useAuthStore';
import { useGameStore } from './store/useGameStore';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { TopicPage } from './pages/TopicPage';
import { GamePage } from './pages/GamePage';
import { ResultsPage } from './pages/ResultsPage';
import { useFirestoreSync } from './hooks/useFirestoreSync';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
    </div>
  );
}

function AppContent() {
  useFirestoreSync();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const setPlayerName = useGameStore((s) => s.setPlayerName);

  // Sync Firebase display name → game store player name
  useEffect(() => {
    if (user?.displayName) setPlayerName(user.displayName);
  }, [user?.displayName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-5xl mb-4 animate-spin-slow">🧮</div>
          <p className="text-white/80">Laster...</p>
        </div>
      </div>
    );
  }

  if (!user) return <LoginPage />;

  return (
    <Routes>
      <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
      <Route path="/topic/:topicId" element={<AppLayout><TopicPage /></AppLayout>} />
      <Route path="/game/:topicId/:levelId" element={<GamePage />} />
      <Route path="/results/:topicId/:levelId" element={<AppLayout><ResultsPage /></AppLayout>} />
    </Routes>
  );
}

export default function App() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Handle magic link redirect
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem(EMAIL_KEY) ?? window.prompt('Bekreft epostadressen din:') ?? '';
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem(EMAIL_KEY);
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(() => {});
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
