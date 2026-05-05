import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { TopicPage } from './pages/TopicPage';
import { GamePage } from './pages/GamePage';
import { ResultsPage } from './pages/ResultsPage';
import { useGameStore } from './store/useGameStore';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
    </div>
  );
}

function AppRoutes() {
  const { playerName } = useGameStore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          playerName ? (
            <AppLayout>
              <HomePage />
            </AppLayout>
          ) : (
            <HomePage />
          )
        }
      />
      <Route
        path="/topic/:topicId"
        element={
          <AppLayout>
            <TopicPage />
          </AppLayout>
        }
      />
      <Route path="/game/:topicId/:levelId" element={<GamePage />} />
      <Route
        path="/results/:topicId/:levelId"
        element={
          <AppLayout>
            <ResultsPage />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
