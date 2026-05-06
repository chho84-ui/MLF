import { Link } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { topics } from '../data/topics';
import { useGameStore } from '../store/useGameStore';
import { useAuthStore } from '../store/useAuthStore';

const colorMap = {
  blue:   { bg: 'from-blue-500 to-blue-600',    ring: 'ring-blue-200' },
  green:  { bg: 'from-green-500 to-emerald-600', ring: 'ring-green-200' },
  purple: { bg: 'from-purple-500 to-violet-600', ring: 'ring-purple-200' },
  orange: { bg: 'from-orange-400 to-orange-500', ring: 'ring-orange-200' },
  red:    { bg: 'from-red-500 to-rose-600',      ring: 'ring-red-200' },
  teal:   { bg: 'from-teal-500 to-cyan-600',     ring: 'ring-teal-200' },
  indigo: { bg: 'from-indigo-500 to-indigo-600', ring: 'ring-indigo-200' },
  pink:   { bg: 'from-pink-500 to-pink-600',     ring: 'ring-pink-200' },
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
        {/* Greeting + leaderboard */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-800">Hei, {playerName}! 👋</h1>
            <p className="text-gray-500 mt-1">Velg et fag og start øving!</p>
          </div>
          <Link
            to="/leaderboard"
            className="flex flex-col items-center gap-1 bg-gradient-to-br from-yellow-400 to-amber-500 text-white rounded-2xl px-4 py-3 shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="text-2xl">🏆</span>
            <span className="text-xs font-bold">Toppliste</span>
          </Link>
        </div>

        {/* Stats */}
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

        {/* Subjects */}
        <h2 className="text-lg font-bold text-gray-700 mb-3">Velg fag</h2>
        <div className="grid gap-4">
          {subjects.map((subject) => {
            const colors = colorMap[subject.color];
            const subjectTopics = subject.topicIds
              .map((id) => topics.find((t) => t.id === id))
              .filter(Boolean) as typeof topics;

            const subjectStars = subjectTopics.reduce((sum, topic) => {
              return sum + Object.values(levelResults)
                .filter((r) => r.topicId === topic.id)
                .reduce((s, r) => s + r.stars, 0);
            }, 0);
            const maxStars = subjectTopics.reduce((sum, t) => sum + t.levels.length * 3, 0);
            const completedTopics = subjectTopics.filter((topic) =>
              topic.levels.some((l) => levelResults[`${topic.id}-${l.id}`]?.stars > 0)
            ).length;

            return (
              <Link
                key={subject.id}
                to={`/subject/${subject.id}`}
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:ring-2 ${colors.ring} transition-all duration-200 overflow-hidden group active:scale-98`}
              >
                <div className={`bg-gradient-to-r ${colors.bg} p-5 flex items-center gap-4`}>
                  <span className="text-5xl">{subject.emoji}</span>
                  <div className="text-white flex-1">
                    <h3 className="font-black text-2xl">{subject.title}</h3>
                    <p className="text-white/80 text-sm mt-0.5">{subject.description}</p>
                  </div>
                  <div className="text-white/80 text-2xl group-hover:translate-x-1 transition-transform">→</div>
                </div>
                <div className="px-5 py-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {completedTopics}/{subjectTopics.length} temaer påbegynt
                  </span>
                  {subjectStars > 0
                    ? <span className="text-sm font-bold text-gray-500">{subjectStars}/{maxStars} ⭐</span>
                    : <span className="text-xs text-gray-400">Ikke startet</span>
                  }
                </div>
              </Link>
            );
          })}

          {/* Coming soon placeholder */}
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-5 text-center text-gray-400">
            <div className="text-3xl mb-2">🔜</div>
            <p className="font-semibold">Flere fag kommer snart</p>
            <p className="text-sm mt-1">Engelsk, Naturfag, Norsk...</p>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8 pb-4">Mestre — lær mer, mestre mer 🚀</p>
      </div>
    </div>
  );
}
