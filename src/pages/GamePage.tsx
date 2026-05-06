import { useState, useCallback, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { topics } from '../data/topics';
import { useGameStore, XP_PER_LEVEL } from '../store/useGameStore';
import { FloatingXP } from '../components/FloatingXP';
import { LevelUpModal } from '../components/LevelUpModal';
import { FillInQuestion } from '../components/questions/FillInQuestion';
import { MatchPairsQuestion } from '../components/questions/MatchPairsQuestion';
import { SortQuestion } from '../components/questions/SortQuestion';
import type { Question } from '../types';

const MAX_LIVES = 3;

type AnswerState = 'idle' | 'correct' | 'wrong';

const TYPE_LABELS: Record<string, string> = {
  'multiple-choice': '🔘 Flervalg',
  'fill-in': '✏️ Skriv svaret',
  'match-pairs': '🔗 Koble par',
  'sort-order': '📋 Sorter',
};

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function Hearts({ lives, shake }: { lives: number; shake: boolean }) {
  return (
    <div className={`flex gap-1 ${shake ? 'animate-shake' : ''}`}>
      {Array.from({ length: MAX_LIVES }).map((_, i) => (
        <span key={i} className={`text-xl transition-all duration-300 ${i < lives ? '' : 'opacity-20 grayscale'}`}>
          ❤️
        </span>
      ))}
    </div>
  );
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
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [lives, setLives] = useState(MAX_LIVES);
  const [heartShake, setHeartShake] = useState(false);
  const [score, setScore] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [floatingXP, setFloatingXP] = useState<number | null>(null);
  const [levelUpTo, setLevelUpTo] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionKey, setQuestionKey] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleAnswered = useCallback((correct: boolean) => {
    setAnswerState(correct ? 'correct' : 'wrong');

    if (correct) {
      const earned = currentQuestion.xp;
      setScore((s) => s + 1);
      setXpGained((x) => x + earned);
      updateStreak(true);
      const oldLevel = Math.floor(xp / XP_PER_LEVEL) + 1;
      addXP(earned);
      const newLevel = Math.floor((xp + earned) / XP_PER_LEVEL) + 1;
      if (newLevel > oldLevel) setLevelUpTo(newLevel);
      setFloatingXP(earned);
    } else {
      updateStreak(false);
      setHeartShake(true);
      setTimeout(() => setHeartShake(false), 500);
      setLives((l) => {
        const newLives = l - 1;
        if (newLives <= 0) setTimeout(() => setIsGameOver(true), 800);
        return newLives;
      });
    }
  }, [currentQuestion, xp, addXP, updateStreak]);

  const handleMCAnswer = useCallback((choiceId: string) => {
    if (answerState !== 'idle') return;
    setSelectedAnswer(choiceId);
    handleAnswered(choiceId === currentQuestion.correctAnswer);
  }, [answerState, currentQuestion, handleAnswered]);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswerState('idle');
      setSelectedAnswer(null);
      setQuestionKey((k) => k + 1);
    }
  }, [currentIndex, questions.length]);

  useEffect(() => {
    if (isFinished && topic && level_) {
      const wrong = questions.length - score;
      const stars = wrong === 0 ? 3 : wrong <= 1 ? 2 : wrong <= 2 ? 1 : 0;
      saveLevelResult({ topicId: topic.id, levelId: level_.id, stars, score, totalQuestions: questions.length });
      navigate(`/results/${topicId}/${levelId}`, { state: { score, total: questions.length, xpGained } });
    }
  }, [isFinished]);

  if (!topic || !level_) return <Navigate to="/" replace />;

  const progress = (currentIndex / questions.length) * 100;
  const isInteractive = currentQuestion.type === 'match-pairs' || currentQuestion.type === 'sort-order';
  const showNextButton = answerState !== 'idle' && !isGameOver;

  // ── Game Over screen ──────────────────────────────────────────────────────
  if (isGameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
          <div className="text-7xl mb-4">💔</div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">Ingen liv igjen!</h1>
          <p className="text-gray-500 mb-2">Du kom til spørsmål {currentIndex + 1} av {questions.length}</p>
          <p className="text-gray-500 mb-6">{score} riktige svar</p>

          <div className="flex gap-2 mb-3">
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <div key={i} className="flex-1 h-2 rounded-full bg-red-200" />
            ))}
          </div>

          <button
            onClick={() => navigate(`/game/${topicId}/${levelId}`)}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg py-4 rounded-2xl hover:opacity-90 active:scale-98 transition-all shadow-md mb-3"
          >
            🔄 Prøv igjen
          </button>
          <button
            onClick={() => navigate(`/topic/${topicId}`)}
            className="w-full text-gray-400 hover:text-gray-600 py-2 text-sm transition-colors"
          >
            ← Tilbake til nivåer
          </button>
        </div>
      </div>
    );
  }

  const getChoiceStyle = (choiceId: string) => {
    const base = 'w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all duration-150';
    if (answerState === 'idle') {
      return `${base} bg-white border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300 active:scale-98 cursor-pointer`;
    }
    if (choiceId === currentQuestion.correctAnswer) return `${base} bg-green-50 border-green-400 text-green-800 animate-pulse-once`;
    if (choiceId === selectedAnswer) return `${base} bg-red-50 border-red-400 text-red-800`;
    return `${base} bg-gray-50 border-gray-200 text-gray-400`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Game header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => navigate(`/topic/${topicId}`)} className="text-gray-400 hover:text-gray-600 text-sm">
              ✕ Avslutt
            </button>
            <span className="text-gray-500 text-sm font-medium">{currentIndex + 1} / {questions.length}</span>
            <div className="flex items-center gap-3">
              <Hearts lives={lives} shake={heartShake} />
              <div className="text-yellow-600 font-bold text-sm">⭐ +{xpGained}</div>
            </div>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{topic.emoji}</span>
            <span className="text-gray-500 text-sm font-medium">{topic.title}</span>
          </div>
          <span className="text-xs bg-indigo-100 text-indigo-600 font-bold px-2 py-1 rounded-full">
            {TYPE_LABELS[currentQuestion.type]}
          </span>
        </div>

        {/* Question card */}
        <div className={`bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-5 animate-slide-in
          ${answerState === 'correct' ? 'ring-2 ring-green-400' : ''}
          ${answerState === 'wrong' && currentQuestion.type === 'multiple-choice' ? 'ring-2 ring-red-400 animate-shake' : ''}
        `}>
          <p className="text-xl font-bold text-gray-800 leading-relaxed whitespace-pre-line">
            {currentQuestion.text}
          </p>
        </div>

        {/* Answers */}
        <div key={questionKey} className="flex flex-col gap-4 flex-1">
          {currentQuestion.type === 'multiple-choice' && currentQuestion.choices && (
            <div className="grid gap-3">
              {currentQuestion.choices.map((choice) => (
                <button key={choice.id} onClick={() => handleMCAnswer(choice.id)} disabled={answerState !== 'idle'} className={getChoiceStyle(choice.id)}>
                  <span className="mr-3 font-bold text-gray-400 uppercase">{choice.id})</span>
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'fill-in' && answerState === 'idle' && (
            <FillInQuestion question={currentQuestion} onAnswer={handleAnswered} />
          )}

          {currentQuestion.type === 'match-pairs' && currentQuestion.pairs && answerState === 'idle' && (
            <MatchPairsQuestion pairs={currentQuestion.pairs} onAnswer={handleAnswered} />
          )}

          {currentQuestion.type === 'sort-order' && currentQuestion.items && answerState === 'idle' && (
            <SortQuestion items={currentQuestion.items} onAnswer={handleAnswered} />
          )}

          {/* Explanation + Next */}
          {showNextButton && (
            <div className="animate-bounce-in mt-auto">
              {!isInteractive && (
                <div className={`rounded-2xl p-4 mb-4 ${answerState === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="font-bold text-lg mb-1">{answerState === 'correct' ? '✅ Riktig!' : '❌ Feil!'}</p>
                  <p className="text-gray-700 text-sm">{currentQuestion.explanation}</p>
                </div>
              )}
              {isInteractive && (
                <div className={`rounded-2xl p-4 mb-4 ${answerState === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className="text-gray-700 text-sm">{currentQuestion.explanation}</p>
                </div>
              )}
              <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg py-4 rounded-2xl hover:opacity-90 active:scale-98 transition-all shadow-md">
                {currentIndex + 1 >= questions.length ? 'Se resultat 🏆' : 'Neste spørsmål →'}
              </button>
            </div>
          )}
        </div>
      </div>

      {floatingXP !== null && <FloatingXP amount={floatingXP} onDone={() => setFloatingXP(null)} />}
      {levelUpTo !== null && <LevelUpModal newLevel={levelUpTo} onClose={() => setLevelUpTo(null)} />}
    </div>
  );
}
