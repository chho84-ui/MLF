import { useParams, Link, Navigate } from 'react-router-dom';
import { topics } from '../data/topics';
import { useGameStore } from '../store/useGameStore';
import { StarRating } from '../components/StarRating';

const colorMap = {
  blue: { bg: 'from-blue-500 to-blue-600', ring: 'ring-blue-300', btn: 'bg-blue-500 hover:bg-blue-600', locked: 'bg-gray-200' },
  green: { bg: 'from-green-500 to-emerald-600', ring: 'ring-green-300', btn: 'bg-green-500 hover:bg-green-600', locked: 'bg-gray-200' },
  purple: { bg: 'from-purple-500 to-violet-600', ring: 'ring-purple-300', btn: 'bg-purple-500 hover:bg-purple-600', locked: 'bg-gray-200' },
  orange: { bg: 'from-orange-400 to-orange-500', ring: 'ring-orange-300', btn: 'bg-orange-500 hover:bg-orange-600', locked: 'bg-gray-200' },
  red: { bg: 'from-red-500 to-rose-600', ring: 'ring-red-300', btn: 'bg-red-500 hover:bg-red-600', locked: 'bg-gray-200' },
  teal: { bg: 'from-teal-500 to-cyan-600', ring: 'ring-teal-300', btn: 'bg-teal-500 hover:bg-teal-600', locked: 'bg-gray-200' },
};

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const { getLevelResult } = useGameStore();

  const topic = topics.find((t) => t.id === topicId);
  if (!topic) return <Navigate to="/" replace />;

  const colors = colorMap[topic.color];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topic header */}
      <div className={`bg-gradient-to-r ${colors.bg} text-white`}>
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <div className="text-6xl mb-3">{topic.emoji}</div>
          <h1 className="text-3xl font-black mb-2">{topic.title}</h1>
          <p className="text-white/80">{topic.description}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Velg nivå</h2>

        {/* Level path */}
        <div className="relative">
          {/* Connecting line */}
          {topic.levels.length > 1 && (
            <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gray-200 -z-0" />
          )}

          <div className="space-y-4">
            {topic.levels.map((level, index) => {
              const result = getLevelResult(topic.id, level.id);
              const prevResult = index > 0 ? getLevelResult(topic.id, topic.levels[index - 1].id) : null;
              const isLocked = index > 0 && !prevResult;
              const stars = result?.stars ?? 0;
              const isCompleted = stars > 0;

              return (
                <div key={level.id} className="flex gap-4 items-start animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Level number circle */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-black text-lg shadow-md ring-4
                      ${isLocked ? 'bg-gray-200 ring-gray-100 text-gray-400' : isCompleted ? `ring-${topic.color === 'blue' ? 'blue' : topic.color}-200 bg-white` : `ring-${topic.color === 'blue' ? 'blue' : topic.color}-100 bg-white`}
                    `}
                  >
                    {isLocked ? (
                      <span className="text-2xl">🔒</span>
                    ) : isCompleted ? (
                      <span className="text-2xl">✅</span>
                    ) : (
                      <span className={`text-xl text-${topic.color === 'orange' ? 'orange' : topic.color === 'red' ? 'red' : topic.color === 'teal' ? 'teal' : topic.color === 'green' ? 'green' : topic.color === 'purple' ? 'purple' : 'blue'}-500`}>
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Level card */}
                  <div
                    className={`flex-1 bg-white rounded-2xl border shadow-sm overflow-hidden
                      ${isLocked ? 'opacity-60' : 'hover:shadow-md transition-shadow'}
                      ${isCompleted ? 'border-gray-200' : 'border-gray-200'}
                    `}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className={`font-bold text-gray-800 ${isLocked ? 'text-gray-400' : ''}`}>
                            {level.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5">{level.description}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {level.questions.length} spørsmål
                          </p>
                        </div>
                        {isCompleted && <StarRating stars={stars} size="sm" />}
                      </div>

                      {!isLocked && (
                        <Link
                          to={`/game/${topic.id}/${level.id}`}
                          className={`mt-3 inline-block ${colors.btn} text-white font-bold text-sm px-5 py-2 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm`}
                        >
                          {isCompleted ? '🔄 Spill igjen' : '▶ Start'}
                        </Link>
                      )}
                      {isLocked && (
                        <p className="mt-3 text-xs text-gray-400">
                          Fullfør forrige nivå for å låse opp
                        </p>
                      )}
                    </div>

                    {result && (
                      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex gap-3">
                        <span>Beste: {result.score}/{result.totalQuestions} riktige</span>
                        <span>·</span>
                        <span>{result.stars}/3 stjerner</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
            ← Tilbake til alle temaer
          </Link>
        </div>
      </div>
    </div>
  );
}
