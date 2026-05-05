import { useState, useCallback, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { topics } from '../data/topics';
import { useGameStore, XP_PER_LEVEL } from '../store/useGameStore';
import { FloatingXP } from '../components/FloatingXP';
import { LevelUpModal } from '../components/LevelUpModal';
import type { Question } from '../types';

type AnswerState = 'idle' | 'correct' | 'wrong';

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function GamePage() {
  const { topicId, levelId } = useParams<{ topicId: string; levelId: string }>();
  const navigate = useNavigate();
  const { addXP, updateStreak, saveLevelResult, xp } = useGameStore();

  const topic = topics.find((t) => t.id === topicId);
  const level_ = topic?.levels.find((l) => l.id === levelId);

  const [questions] = useState<Question[]>(() =>
    level_ ? shuffleArray(level_.questions) : []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [score, setScore] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [floatingXP, setFloatingXP] = useState<number | null>(null);
  const [levelUpTo, setLevelUpTo] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = useCallback((answerId: string) => {
    if (answerState !== 'idle') return;

    setSelectedAnswer(answerId);
    const isCorrect = answerId === currentQuestion.correctAnswer;

    if (isCorrect) {
      setAnswerState('correct');
      const earned = currentQuestion.xp;
      setScore((s) => s + 1);
      setXpGained((x) => x + earned);
      updateStreak(true);

      const oldLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
      addXP(earned);
      const newLevel = Math.floor((xp + earned) / XP_PER_LEVEL) + 1;
      if (newLevel > oldLevel) {
        setLevelUpTo(newLevel);
      }

      setFloatingXP(earned);
    } else {
      setAnswerState('wrong');
      updateStreak(false);
    }
  }, [answerState, currentQuestion, xp, addXP, updateStreak]);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setAnswerState('idle');
    }
  }, [currentIndex, questions.length]);

  useEffect(() => {
    if (isFinished && topic && level_) {
      const stars = score >= questions.length ? 3 : score >= Math.ceil(questions.length * 0.6) ? 2 : score > 0 ? 1 : 0;
      saveLevelResult({
        topicId: topic.id,
        levelId: level_.id,
        stars,
        score,
        totalQuestions: questions.length,
      });
      navigate(`/results/${topicId}/${levelId}`, {
        state: { score, total: questions.length, xpGained },
      });
    }
  }, [isFinished, score, questions.length, xpGained, topic, level_, topicId, levelId, navigate, saveLevelResult]);

  if (!topic || !level_) return <Navigate to="/" replace />;

  const progress = ((currentIndex) / questions.length) * 100;

  const bgCorrect = 'bg-green-50 border-green-400 text-green-800';
  const bgWrong = 'bg-red-50 border-red-400 text-red-800';
  const bgSelected = 'bg-indigo-50 border-indigo-400 text-indigo-800';
  const bgDefault = 'bg-white border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300';

  const getChoiceStyle = (choiceId: string) => {
    if (answerState === 'idle') {
      return selectedAnswer === choiceId ? bgSelected : bgDefault;
    }
    if (choiceId === currentQuestion.correctAnswer) return bgCorrect;
    if (choiceId === selectedAnswer && answerState === 'wrong') return bgWrong;
    return 'bg-gray-50 border-gray-200 text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Game header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate(`/topic/${topicId}`)}
              className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
            >
              ✕ Avslutt
            </button>
            <span className="text-gray-500 text-sm font-medium">
              {currentIndex + 1} / {questions.length}
            </span>
            <div className="flex items-center gap-1 text-yellow-600 font-bold text-sm">
              ⭐ +{xpGained} XP
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 flex flex-col">
        {/* Topic badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">{topic.emoji}</span>
          <span className="text-gray-500 text-sm font-medium">{topic.title} · {level_.title}</span>
        </div>

        {/* Question card */}
        <div
          key={currentQuestion.id}
          className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 animate-slide-in
            ${answerState === 'correct' ? 'ring-2 ring-green-400' : ''}
            ${answerState === 'wrong' ? 'ring-2 ring-red-400 animate-shake' : ''}
          `}
        >
          <p className="text-xl font-bold text-gray-800 leading-relaxed">
            {currentQuestion.text}
          </p>
        </div>

        {/* Answer choices */}
        {currentQuestion.type === 'multiple-choice' && currentQuestion.choices && (
          <div className="grid gap-3 mb-6">
            {currentQuestion.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleAnswer(choice.id)}
                disabled={answerState !== 'idle'}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all duration-150
                  ${getChoiceStyle(choice.id)}
                  ${answerState === 'idle' ? 'active:scale-98 cursor-pointer' : 'cursor-default'}
                  ${answerState !== 'idle' && choice.id === currentQuestion.correctAnswer ? 'animate-pulse-once' : ''}
                `}
              >
                <span className="mr-3 font-bold text-gray-400 uppercase">{choice.id})</span>
                {choice.text}
              </button>
            ))}
          </div>
        )}

        {/* Explanation + Next button */}
        {answerState !== 'idle' && (
          <div className="animate-bounce-in">
            <div
              className={`rounded-2xl p-4 mb-4 ${
                answerState === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              <p className="font-bold text-lg mb-1">
                {answerState === 'correct' ? '✅ Riktig!' : '❌ Feil!'}
              </p>
              <p className="text-gray-700 text-sm">{currentQuestion.explanation}</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg py-4 rounded-2xl hover:opacity-90 active:scale-98 transition-all shadow-md"
            >
              {currentIndex + 1 >= questions.length ? 'Se resultat 🏆' : 'Neste spørsmål →'}
            </button>
          </div>
        )}
      </div>

      {floatingXP !== null && (
        <FloatingXP amount={floatingXP} onDone={() => setFloatingXP(null)} />
      )}
      {levelUpTo !== null && (
        <LevelUpModal newLevel={levelUpTo} onClose={() => setLevelUpTo(null)} />
      )}
    </div>
  );
}
