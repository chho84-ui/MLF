import { useParams, Link, Navigate } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { topics } from '../data/topics';
import { useGameStore } from '../store/useGameStore';
import { StarRating } from '../components/StarRating';

const colorMap = {
  blue:   { bg: 'from-blue-500 to-blue-600',     border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',     btn: 'bg-blue-500 hover:bg-blue-600' },
  green:  { bg: 'from-green-500 to-emerald-600',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700',   btn: 'bg-green-500 hover:bg-green-600' },
  purple: { bg: 'from-purple-500 to-violet-600',  border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', btn: 'bg-purple-500 hover:bg-purple-600' },
  orange: { bg: 'from-orange-400 to-orange-500',  border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', btn: 'bg-orange-500 hover:bg-orange-600' },
  red:    { bg: 'from-red-500 to-rose-600',       border: 'border-red-200',    badge: 'bg-red-100 text-red-700',       btn: 'bg-red-500 hover:bg-red-600' },
  teal:   { bg: 'from-teal-500 to-cyan-600',      border: 'border-teal-200',   badge: 'bg-teal-100 text-teal-700',     btn: 'bg-teal-500 hover:bg-teal-600' },
  indigo: { bg: 'from-indigo-500 to-indigo-600',  border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-700', btn: 'bg-indigo-500 hover:bg-indigo-600' },
  pink:   { bg: 'from-pink-500 to-pink-600',      border: 'border-pink-200',   badge: 'bg-pink-100 text-pink-700',     btn: 'bg-pink-500 hover:bg-pink-600' },
};

// topic colors for the cards inside a subject
const topicColors = {
  blue:   { bg: 'from-blue-500 to-blue-600' },
  green:  { bg: 'from-green-500 to-emerald-600' },
  purple: { bg: 'from-purple-500 to-violet-600' },
  orange: { bg: 'from-orange-400 to-orange-500' },
  red:    { bg: 'from-red-500 to-rose-600' },
  teal:   { bg: 'from-teal-500 to-cyan-600' },
  indigo: { bg: 'from-indigo-500 to-indigo-600' },
  pink:   { bg: 'from-pink-500 to-pink-600' },
};

export function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { levelResults } = useGameStore();

  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) return <Navigate to="/" replace />;

  const subjectTopics = subject.topicIds
    .map((id) => topics.find((t) => t.id === id))
    .filter(Boolean) as typeof topics;

  const colors = colorMap[subject.color];

  const totalStars = subjectTopics.reduce((sum, topic) => {
    return sum + Object.values(levelResults)
      .filter((r) => r.topicId === topic.id)
      .reduce((s, r) => s + r.stars, 0);
  }, 0);
  const maxStars = subjectTopics.reduce((sum, t) => sum + t.levels.length * 3, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subject header */}
      <div className={`bg-gradient-to-r ${colors.bg} text-white`}>
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <div className="text-6xl mb-3">{subject.emoji}</div>
          <h1 className="text-3xl font-black mb-1">{subject.title}</h1>
          <p className="text-white/80 mb-3">{subject.description}</p>
          {totalStars > 0 && (
            <div className="inline-block bg-white/20 rounded-full px-4 py-1.5 text-sm font-bold">
              {totalStars} / {maxStars} ⭐
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Velg tema</h2>
        <div className="grid gap-4">
          {subjectTopics.map((topic, index) => {
            const tc = topicColors[topic.color];
            const topicStars = Object.values(levelResults)
              .filter((r) => r.topicId === topic.id)
              .reduce((s, r) => s + r.stars, 0);
            const completedLevels = topic.levels.filter((l) => {
              const key = `${topic.id}-${l.id}`;
              return levelResults[key]?.stars > 0;
            }).length;
            const maxTopicStars = topic.levels.length * 3;

            return (
              <Link
                key={topic.id}
                to={`/topic/${topic.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group animate-slide-in"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <div className={`bg-gradient-to-r ${tc.bg} p-4 flex items-center gap-4`}>
                  <span className="text-4xl">{topic.emoji}</span>
                  <div className="text-white flex-1">
                    <h3 className="font-black text-xl">{topic.title}</h3>
                    <p className="text-white/80 text-sm">{topic.description}</p>
                  </div>
                  <div className="text-white/80 group-hover:translate-x-1 transition-transform">→</div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StarRating stars={Math.min(topicStars, 3)} size="sm" />
                    <span className="text-sm text-gray-500">{completedLevels}/{topic.levels.length} nivåer</span>
                  </div>
                  {topicStars > 0
                    ? <span className="text-xs font-bold text-gray-400">{topicStars}/{maxTopicStars} ⭐</span>
                    : <span className="text-xs text-gray-400">Ikke startet</span>
                  }
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
            ← Tilbake til alle fag
          </Link>
        </div>
      </div>
    </div>
  );
}
