import { useParams, useLocation, Navigate, Link } from 'react-router-dom';
import { topics } from '../data/topics';
import { StarRating } from '../components/StarRating';

interface LocationState {
  score: number;
  total: number;
  xpGained: number;
}

function getStars(score: number, total: number): number {
  if (score === total) return 3;
  if (score >= Math.ceil(total * 0.6)) return 2;
  if (score > 0) return 1;
  return 0;
}

function getMessage(stars: number): { emoji: string; title: string; subtitle: string } {
  if (stars === 3) return { emoji: '🏆', title: 'Perfekt!', subtitle: 'Du svarte riktig på alt. Imponerende!' };
  if (stars === 2) return { emoji: '🌟', title: 'Veldig bra!', subtitle: 'Du er godt på vei. Øv litt mer for 3 stjerner!' };
  if (stars === 1) return { emoji: '💪', title: 'Bra innsats!', subtitle: 'Du kan dette. Prøv igjen for å forbedre deg!' };
  return { emoji: '😅', title: 'Ikke gi opp!', subtitle: 'Les forklaringene og prøv igjen!' };
}

export function ResultsPage() {
  const { topicId, levelId } = useParams<{ topicId: string; levelId: string }>();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const topic = topics.find((t) => t.id === topicId);
  const level = topic?.levels.find((l) => l.id === levelId);

  if (!topic || !level || !state) return <Navigate to="/" replace />;

  const { score, total, xpGained } = state;
  const stars = getStars(score, total);
  const { emoji, title, subtitle } = getMessage(stars);
  const percent = Math.round((score / total) * 100);

  const currentLevelIndex = topic.levels.findIndex((l) => l.id === levelId);
  const nextLevel = topic.levels[currentLevelIndex + 1];
  const canPlayNext = nextLevel && stars > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      <div className="max-w-2xl mx-auto w-full px-4 py-8 flex flex-col items-center">
        {/* Main result card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full text-center mb-6 animate-bounce-in">
          <div className="text-7xl mb-4">{emoji}</div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-500 mb-6">{subtitle}</p>

          {/* Stars */}
          <div className="flex justify-center mb-6">
            <StarRating stars={stars} size="lg" animate />
          </div>

          {/* Score */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl font-black text-indigo-600">{score}/{total}</span>
              <span className="text-gray-400 text-lg">riktige</span>
            </div>
            {/* Score bar */}
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${percent}%`,
                  background: stars === 3 ? '#22c55e' : stars === 2 ? '#f59e0b' : '#6366f1',
                }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">{percent}% korrekt</p>
          </div>

          {/* XP gained */}
          {xpGained > 0 && (
            <div className="flex items-center justify-center gap-2 bg-yellow-50 border border-yellow-200 rounded-2xl px-6 py-3 mb-6">
              <span className="text-2xl">⭐</span>
              <span className="font-black text-yellow-700 text-xl">+{xpGained} XP opptjent!</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="w-full space-y-3">
          {canPlayNext && (
            <Link
              to={`/game/${topic.id}/${nextLevel.id}`}
              className="block w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg py-4 rounded-2xl text-center hover:opacity-90 active:scale-98 transition-all shadow-md"
            >
              Neste nivå: {nextLevel.title} →
            </Link>
          )}

          <Link
            to={`/game/${topic.id}/${level.id}`}
            className="block w-full bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg py-4 rounded-2xl text-center hover:border-indigo-300 hover:bg-indigo-50 active:scale-98 transition-all"
          >
            🔄 Prøv igjen
          </Link>

          <Link
            to="/leaderboard"
            className="block w-full text-center bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold py-3 rounded-2xl hover:opacity-90 active:scale-98 transition-all shadow-sm"
          >
            🏆 Se topplisten
          </Link>

          <Link
            to={`/topic/${topic.id}`}
            className="block w-full text-center text-gray-400 hover:text-gray-600 py-3 transition-colors"
          >
            ← Tilbake til {topic.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
