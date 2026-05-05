import { Link } from 'react-router-dom';
import { topics } from '../data/topics';
import { useGameStore } from '../store/useGameStore';
import { useAuthStore } from '../store/useAuthStore';
import { StarRating } from '../components/StarRating';

const colorMap = {
  blue: {
    bg: 'from-blue-500 to-blue-600',
    light: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    hover: 'hover:shadow-blue-200',
  },
  green: {
    bg: 'from-green-500 to-emerald-600',
    light: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    hover: 'hover:shadow-green-200',
  },
  purple: {
    bg: 'from-purple-500 to-violet-600',
    light: 'bg-purple-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    hover: 'hover:shadow-purple-200',
  },
  orange: {
    bg: 'from-orange-400 to-orange-500',
    light: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
    hover: 'hover:shadow-orange-200',
  },
  red: {
    bg: 'from-red-500 to-rose-600',
    light: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    hover: 'hover:shadow-red-200',
  },
  teal: {
    bg: 'from-teal-500 to-cyan-600',
    light: 'bg-teal-50',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-700',
    hover: 'hover:shadow-teal-200',
  },
};

export function HomePage() {
  const { totalCorrect, totalAttempted, bestStreak, levelResults } = useGameStore();
  const user = useAuthStore((s) => s.user);
  const playerName = user?.displayName || user?.email?.split('@')[0] || 'Spiller';

  const totalStarsEarned = Object.values(levelResults).reduce((sum, r) => sum + r.stars, 0);
  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-800">
            Hei, {playerName}! 👋
          </h1>
          <p className="text-gray-500 mt-1">Velg et tema og start øving!</p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-black text-yellow-500">{totalStarsEarned}</div>
            <div className="text-xs text-gray-500 mt-1">Stjerner</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-black text-green-500">{accuracy}%</div>
            <div className="text-xs text-gray-500 mt-1">Nøyaktighet</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-black text-orange-500">{bestStreak}</div>
            <div className="text-xs text-gray-500 mt-1">Beste streak</div>
          </div>
        </div>

        {/* Topics */}
        <h2 className="text-lg font-bold text-gray-700 mb-3">Velg tema</h2>
        <div className="grid gap-4">
          {topics.map((topic) => {
            const colors = colorMap[topic.color];
            const totalStars = Object.values(levelResults)
              .filter((r) => r.topicId === topic.id)
              .reduce((sum, r) => sum + r.stars, 0);
            const maxStars = topic.levels.length * 3;
            const completedLevels = topic.levels.filter((l) => {
              const key = `${topic.id}-${l.id}`;
              return levelResults[key]?.stars > 0;
            }).length;

            return (
              <Link
                key={topic.id}
                to={`/topic/${topic.id}`}
                className={`bg-white rounded-2xl border ${colors.border} shadow-sm hover:shadow-lg ${colors.hover} transition-all duration-200 overflow-hidden active:scale-98 group`}
              >
                <div className={`bg-gradient-to-r ${colors.bg} p-4 flex items-center gap-4`}>
                  <span className="text-4xl">{topic.emoji}</span>
                  <div className="text-white">
                    <h3 className="font-black text-xl">{topic.title}</h3>
                    <p className="text-white/80 text-sm">{topic.description}</p>
                  </div>
                  <div className="ml-auto text-white/80 group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StarRating stars={Math.min(totalStars, 3)} size="sm" />
                    <span className="text-sm text-gray-500">
                      {completedLevels}/{topic.levels.length} nivåer
                    </span>
                  </div>
                  {totalStars > 0 && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${colors.badge}`}>
                      {totalStars}/{maxStars} ⭐
                    </span>
                  )}
                  {totalStars === 0 && (
                    <span className="text-xs text-gray-400">Ikke startet</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8 pb-4">
          MatteMester — tentamenhjelp for 14-åringer 📚
        </p>
      </div>
    </div>
  );
}
