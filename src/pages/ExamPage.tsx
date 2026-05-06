import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { topics } from '../data/topics';
import { FillInQuestion } from '../components/questions/FillInQuestion';
import { MatchPairsQuestion } from '../components/questions/MatchPairsQuestion';
import { SortQuestion } from '../components/questions/SortQuestion';
import type { Question, Topic } from '../types';

export interface ExamAnswer {
  questionId: string;
  correct: boolean;
  topicId: string;
  topicTitle: string;
  topicEmoji: string;
  question: Question;
  givenAnswer?: string;
}

interface ExamQuestion extends Question {
  topicId: string;
  topicTitle: string;
  topicEmoji: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateExam(subjectTopics: Topic[], count: number): ExamQuestion[] {
  const perTopic = Math.ceil(count / subjectTopics.length);
  const selected: ExamQuestion[] = [];
  for (const topic of subjectTopics) {
    const pool = shuffleArray(topic.levels.flatMap((l) => l.questions));
    pool.slice(0, perTopic).forEach((q) =>
      selected.push({ ...q, topicId: topic.id, topicTitle: topic.title, topicEmoji: topic.emoji })
    );
  }
  return shuffleArray(selected).slice(0, count);
}

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

const QUESTION_COUNTS = [10, 15, 20];
const TIME_OPTIONS: Record<number, number> = { 10: 20, 15: 30, 20: 45 };

const TYPE_LABELS: Record<string, string> = {
  'multiple-choice': '🔘 Flervalg',
  'fill-in': '✏️ Skriv svaret',
  'match-pairs': '🔗 Koble par',
  'sort-order': '📋 Sorter',
};

export function ExamPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  const subject = subjects.find((s) => s.id === subjectId);
  const subjectTopics = subject
    ? subject.topicIds.map((id) => topics.find((t) => t.id === id)).filter(Boolean) as Topic[]
    : [];

  // ── Setup phase ───────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<'setup' | 'exam'>('setup');
  const [questionCount, setQuestionCount] = useState(15);
  const [withTimer, setWithTimer] = useState(true);

  // ── Exam state ────────────────────────────────────────────────────────────
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [answered, setAnswered] = useState(false);
  const [selectedMC, setSelectedMC] = useState<string | null>(null);
  const [questionKey, setQuestionKey] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  if (!subject) return <Navigate to="/" replace />;

  const startExam = () => {
    const qs = generateExam(subjectTopics, questionCount);
    setQuestions(qs);
    setTimeLeft(TIME_OPTIONS[questionCount] * 60);
    setPhase('exam');
  };

  // Timer
  useEffect(() => {
    if (phase !== 'exam' || !withTimer) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          finishExam();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase]);

  const finishExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigate(`/exam/${subjectId}/results`, {
      state: { answers, totalQuestions: questions.length },
      replace: true,
    });
  }, [answers, questions, subjectId, navigate]);

  const handleAnswered = useCallback((correct: boolean, givenAnswer?: string) => {
    if (answered) return;
    const q = questions[currentIndex];
    const newAnswers = [
      ...answers,
      { questionId: q.id, correct, topicId: q.topicId, topicTitle: q.topicTitle, topicEmoji: q.topicEmoji, question: q, givenAnswer },
    ];
    setAnswers(newAnswers);
    setAnswered(true);

    // Auto-advance after short delay for interactive types
    if (q.type === 'match-pairs' || q.type === 'sort-order') {
      setTimeout(() => advance(newAnswers), 800);
    }
  }, [answered, questions, currentIndex, answers]);

  const handleMC = useCallback((choiceId: string) => {
    if (answered) return;
    setSelectedMC(choiceId);
    handleAnswered(choiceId === questions[currentIndex].correctAnswer, choiceId);
  }, [answered, questions, currentIndex, handleAnswered]);

  const advance = useCallback((currentAnswers = answers) => {
    if (currentIndex + 1 >= questions.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      navigate(`/exam/${subjectId}/results`, {
        state: { answers: currentAnswers, totalQuestions: questions.length },
        replace: true,
      });
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setSelectedMC(null);
      setQuestionKey((k) => k + 1);
    }
  }, [currentIndex, questions, answers, subjectId, navigate]);

  // ── Setup screen ──────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-bounce-in">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">📝</div>
            <h1 className="text-2xl font-black text-gray-800">Tentamen</h1>
            <p className="text-gray-500 mt-1">{subject.title} — tilfeldig generert</p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-bold text-gray-600 mb-2">Antall spørsmål</p>
            <div className="flex gap-2">
              {QUESTION_COUNTS.map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
                    questionCount === n
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-bold text-gray-600 mb-2">Tid</p>
            <div className="flex gap-2">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  onClick={() => setWithTimer(v)}
                  className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
                    withTimer === v
                      ? 'bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {v ? `⏱ ${TIME_OPTIONS[questionCount]} min` : '∞ Uten tid'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-4 mb-6 text-sm text-indigo-700">
            <p className="font-bold mb-1">Slik fungerer tentamen:</p>
            <ul className="space-y-1 text-indigo-600">
              <li>✦ Spørsmål fra alle temaer i {subject.title}</li>
              <li>✦ Ingen forklaringer underveis</li>
              <li>✦ Du får karakter 1–6 til slutt</li>
              <li>✦ Ingen liv — svar på alt du kan</li>
            </ul>
          </div>

          <button
            onClick={startExam}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-lg py-4 rounded-2xl hover:opacity-90 active:scale-98 transition-all shadow-md"
          >
            Start tentamen 🚀
          </button>
        </div>
      </div>
    );
  }

  // ── Exam screen ───────────────────────────────────────────────────────────
  const q = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;
  const isLowTime = withTimer && timeLeft < 120;
  const isInteractive = q.type === 'match-pairs' || q.type === 'sort-order';

  const getMCStyle = (choiceId: string) => {
    const base = 'w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all';
    if (!answered) return `${base} bg-white border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer`;
    if (choiceId === q.correctAnswer) return `${base} bg-green-50 border-green-400 text-green-800`;
    if (choiceId === selectedMC) return `${base} bg-red-50 border-red-400 text-red-800`;
    return `${base} bg-gray-50 border-gray-200 text-gray-400`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Exam header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => navigate(`/subject/${subjectId}`)} className="text-gray-400 hover:text-gray-600 text-sm">
              ✕ Avslutt
            </button>
            <span className="font-bold text-gray-700 text-sm">{currentIndex + 1} / {questions.length}</span>
            {withTimer ? (
              <span className={`font-black text-sm tabular-nums px-3 py-1 rounded-full ${isLowTime ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600'}`}>
                ⏱ {formatTime(timeLeft)}
              </span>
            ) : (
              <div className="w-16" />
            )}
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{q.topicEmoji}</span>
            <span className="text-gray-500 text-sm font-medium">{q.topicTitle}</span>
          </div>
          <span className="text-xs bg-indigo-100 text-indigo-600 font-bold px-2 py-1 rounded-full">
            {TYPE_LABELS[q.type]}
          </span>
        </div>

        {/* Question */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-5 animate-slide-in">
          <p className="text-xl font-bold text-gray-800 leading-relaxed whitespace-pre-line">{q.text}</p>
        </div>

        {/* Answer input */}
        <div key={questionKey} className="flex flex-col gap-3 flex-1">
          {q.type === 'multiple-choice' && q.choices && (
            <div className="grid gap-3">
              {q.choices.map((choice) => (
                <button key={choice.id} onClick={() => handleMC(choice.id)} disabled={answered} className={getMCStyle(choice.id)}>
                  <span className="mr-3 font-bold text-gray-400 uppercase">{choice.id})</span>
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {q.type === 'fill-in' && !answered && (
            <FillInQuestion question={q} onAnswer={(c) => handleAnswered(c)} />
          )}
          {q.type === 'fill-in' && answered && (
            <div className={`rounded-2xl p-4 border-2 font-bold text-lg ${answers.at(-1)?.correct ? 'bg-green-50 border-green-400 text-green-800' : 'bg-red-50 border-red-400 text-red-800'}`}>
              {answers.at(-1)?.correct ? '✅ Riktig!' : '❌ Feil'}
            </div>
          )}

          {q.type === 'match-pairs' && q.pairs && !answered && (
            <MatchPairsQuestion pairs={q.pairs} onAnswer={(c) => handleAnswered(c)} />
          )}
          {q.type === 'sort-order' && q.items && !answered && (
            <SortQuestion items={q.items} onAnswer={(c) => handleAnswered(c)} />
          )}

          {/* Next button — shown after answering non-interactive types */}
          {answered && !isInteractive && (
            <button
              onClick={() => advance()}
              className="mt-auto w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg py-4 rounded-2xl hover:opacity-90 active:scale-98 transition-all shadow-md animate-bounce-in"
            >
              {currentIndex + 1 >= questions.length ? 'Se karakter 🎓' : 'Neste →'}
            </button>
          )}
          {answered && isInteractive && (
            <button
              onClick={() => advance()}
              className="mt-auto w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg py-4 rounded-2xl hover:opacity-90 active:scale-98 transition-all shadow-md animate-bounce-in"
            >
              {currentIndex + 1 >= questions.length ? 'Se karakter 🎓' : 'Neste →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
