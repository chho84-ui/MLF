import { useState, useMemo } from 'react';
import type { MatchPair } from '../../types';

interface Props {
  pairs: MatchPair[];
  onAnswer: (correct: boolean) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function MatchPairsQuestion({ pairs, onAnswer }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const leftItems = useMemo(() => pairs.map((p) => p.left), [pairs]);
  const rightItems = useMemo(() => shuffleArray(pairs.map((p) => p.right)), [pairs]);

  const correctMap = useMemo(() => {
    const m: Record<string, string> = {};
    pairs.forEach((p) => { m[p.left] = p.right; });
    return m;
  }, [pairs]);

  const isMatched = (text: string) =>
    [...matched].some((k) => k === text || correctMap[k] === text);

  const handleLeft = (item: string) => {
    if (isMatched(item) || done) return;
    setSelectedLeft(item);
    setSelectedRight(null);
  };

  const handleRight = (item: string) => {
    if (isMatched(item) || done) return;
    if (!selectedLeft) { setSelectedRight(item); return; }

    const correct = correctMap[selectedLeft] === item;
    if (correct) {
      const newMatched = new Set([...matched, selectedLeft]);
      setMatched(newMatched);
      setSelectedLeft(null);
      setSelectedRight(null);
      if (newMatched.size === pairs.length) {
        setDone(true);
        setTimeout(() => onAnswer(true), 800);
      }
    } else {
      setWrongFlash(selectedLeft + '|' + item);
      setTimeout(() => {
        setWrongFlash(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 600);
    }
  };

  const getLeftStyle = (item: string) => {
    if (isMatched(item)) return 'bg-green-100 border-green-400 text-green-800 scale-95 opacity-80';
    if (wrongFlash?.startsWith(item + '|')) return 'bg-red-100 border-red-400 text-red-800 animate-shake';
    if (selectedLeft === item) return 'bg-indigo-100 border-indigo-500 text-indigo-800 scale-105 shadow-md';
    return 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50';
  };

  const getRightStyle = (item: string) => {
    if (isMatched(item)) return 'bg-green-100 border-green-400 text-green-800 scale-95 opacity-80';
    const leftKey = [...matched].find((k) => correctMap[k] === item);
    if (leftKey) return 'bg-green-100 border-green-400 text-green-800';
    if (wrongFlash?.endsWith('|' + item)) return 'bg-red-100 border-red-400 text-red-800 animate-shake';
    if (selectedRight === item) return 'bg-indigo-100 border-indigo-500 text-indigo-800 scale-105 shadow-md';
    if (selectedLeft) return 'bg-white border-indigo-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer';
    return 'bg-white border-gray-200 text-gray-500';
  };

  return (
    <div className="flex flex-col gap-3">
      {selectedLeft && (
        <p className="text-center text-sm text-indigo-600 font-medium animate-bounce-in">
          Valgt: <span className="font-bold">"{selectedLeft}"</span> — velg nå riktig svar →
        </p>
      )}
      {!selectedLeft && !done && (
        <p className="text-center text-sm text-gray-400">Trykk på et uttrykk til venstre for å starte</p>
      )}
      {done && (
        <p className="text-center text-lg font-black text-green-600 animate-bounce-in">Alle par riktige! 🎉</p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="flex flex-col gap-2">
          {leftItems.map((item) => (
            <button
              key={item}
              onClick={() => handleLeft(item)}
              disabled={isMatched(item) || done}
              className={`border-2 rounded-2xl px-4 py-3 text-center font-bold text-sm transition-all duration-150 ${getLeftStyle(item)}`}
            >
              {isMatched(item) && <span className="mr-1">✅</span>}
              {item}
            </button>
          ))}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-2">
          {rightItems.map((item) => (
            <button
              key={item}
              onClick={() => handleRight(item)}
              disabled={isMatched(item) || done}
              className={`border-2 rounded-2xl px-4 py-3 text-center font-bold text-sm transition-all duration-150 ${getRightStyle(item)}`}
            >
              {isMatched(item) && <span className="mr-1">✅</span>}
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-1">
        {pairs.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < matched.size ? 'bg-green-500 scale-110' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
