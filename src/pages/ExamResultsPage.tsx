import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { subjects } from '../data/subjects';
import type { ExamAnswer } from './ExamPage';

function getGrade(pct: number): { grade: number; label: string; color: string; bg: string } {
  if (pct >= 90) return { grade: 6, label: 'Utmerket!', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-300' };
  if (pct >= 75) return { grade: 5, label: 'Meget bra!', color: 'text-green-700', bg: 'bg-green-50 border-green-300' };
  if (pct >= 60) return { grade: 4, label: 'Bra!', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-300' };
  if (pct >= 45) return { grade: 3, label: 'Bestått', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-300' };
  if (pct >= 30) return { grade: 2, label: 'Under middels', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-300' };
  return { grade: 1, label: 'Ikke bestått', color: 'text-red-700', bg: 'bg-red-50 border-red-300' };
}

const GRADE_EMOJI: Record<number, string> = { 6: '🏆', 5: '⭐', 4: '👍', 3: '📚', 2: '💪', 1: '🔄' };

interface TopicSummary {
  topicId: string;
  topicTitle: string;
  topicEmoji: string;
  correct: number;
  total: number;
}

export function ExamResultsPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject) return <Navigate to="/" replace />;

  const state = location.state as { answers: ExamAnswer[]; totalQuestions: number } | null;
  if (!state?.answers) return <Navigate to={`/subject/${subjectId}`} replace />;

  const { answers, totalQuestions } = state;
  const correctCount = answers.filter((a) => a.correct).length;
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const { grade, label, color, bg } = getGrade(pct);

  // Group by topic
  const topicMap = new Map<string, TopicSummary>();
  for (const a of answers) {
    if (!topicMap.has(a.topicId)) {
      topicMap.set(a.topicId, { topicId: a.topicId, topicTitle: a.topicTitle, topicEmoji: a.topicEmoji, correct: 0, total: 0 });
    }
    const t = topicMap.get(a.topicId)!;
    t.total++;
    if (a.correct) t.correct++;
  }
  const topicSummaries = Array.from(topicMap.values());

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-start py-8 px-4">
      {/* Grade card */}
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-bounce-in mb-4">
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">{GRADE_EMOJI[grade]}</div>
          <div className={`inline-block rounded-2xl border-2 px-6 py-3 mb-3 ${bg}`}>
            <span className={`text-6xl font-black ${color}`}>{grade}</span>
            <span className={`text-2xl font-bold ${color} ml-1`}>/ 6</span>
          </div>
          <p className={`text-xl font-bold ${color}`}>{label}</p>
          <p className="text-gray-500 mt-1 text-sm">{correctCount} av {totalQuestions} riktige ({pct}%)</p>
        </div>

        {/* Score bar */}
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Grade legend */}
        <div className="grid grid-cols-6 gap-1 mb-6">
          {[1, 2, 3, 4, 5, 6].map((g) => (
            <div
              key={g}
              className={`text-center rounded-xl py-2 text-sm font-black transition-all ${
                g === grade
                  ? 'bg-indigo-500 text-white scale-110 shadow-md'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {g}
            </div>
          ))}
        </div>

        {/* Topic breakdown */}
        <div className="mb-6">
          <p className="text-sm font-bold text-gray-500 mb-3">Resultater per tema</p>
          <div className="space-y-2">
            {topicSummaries.map((t) => {
              const tPct = Math.round((t.correct / t.total) * 100);
              const tGrade = getGrade(tPct);
              return (
                <div key={t.topicId} className="flex items-center gap-3">
                  <span className="text-xl w-7 text-center">{t.topicEmoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-medium text-gray-700">{t.topicTitle}</span>
                      <span className={`text-xs font-bold ${tGrade.color}`}>{t.correct}/{t.total}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                        style={{ width: `${tPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/exam/${subjectId}`)}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-2xl hover:opacity-90 active:scale-98 transition-all shadow-md"
          >
            🔄 Ny tentamen
          </button>
          <button
            onClick={() => navigate(`/subject/${subjectId}`)}
            className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-2xl hover:bg-gray-200 active:scale-98 transition-all"
          >
            📚 Øv mer
          </button>
        </div>
      </div>

      {/* Answer review */}
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-slide-in">
        <p className="font-bold text-gray-700 mb-4">Alle spørsmål</p>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {answers.map((a, i) => (
            <div
              key={a.questionId + i}
              className={`rounded-2xl p-3 border ${a.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
            >
              <div className="flex items-start gap-2">
                <span className="text-base mt-0.5">{a.correct ? '✅' : '❌'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-snug">{a.question.text}</p>
                  {!a.correct && a.question.type === 'multiple-choice' && a.question.choices && (
                    <p className="text-xs text-green-700 mt-1">
                      Riktig: {a.question.choices.find((c) => c.id === a.question.correctAnswer)?.text}
                    </p>
                  )}
                  {!a.correct && a.question.type === 'fill-in' && (
                    <p className="text-xs text-green-700 mt-1">
                      Riktig: {a.question.acceptedAnswers?.[0] ?? a.question.correctAnswer}
                      {a.question.unit ? ` ${a.question.unit}` : ''}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">{a.topicEmoji} {a.topicTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
