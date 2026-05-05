import { useState, useMemo } from 'react';

interface Props {
  items: string[];
  onAnswer: (correct: boolean) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const s = [...arr].sort(() => Math.random() - 0.5);
  // re-shuffle if accidentally in correct order
  if (s.every((v, i) => v === arr[i])) return shuffleArray(arr);
  return s;
}

export function SortQuestion({ items, onAnswer }: Props) {
  const shuffled = useMemo(() => shuffleArray(items), [items]);
  const [pool, setPool] = useState<string[]>(shuffled);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleAdd = (item: string) => {
    if (submitted) return;
    setPool((p) => p.filter((x) => x !== item));
    setSelected((s) => [...s, item]);
  };

  const handleRemoveLast = () => {
    if (submitted || selected.length === 0) return;
    const last = selected[selected.length - 1];
    setSelected((s) => s.slice(0, -1));
    setPool((p) => [...p, last]);
  };

  const handleCheck = () => {
    const ok = selected.every((v, i) => v === items[i]);
    setCorrect(ok);
    setSubmitted(true);
    setTimeout(() => onAnswer(ok), 800);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Answer slots */}
      <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-3 min-h-16">
        {selected.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-2">Trykk på elementene nedenfor i riktig rekkefølge</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selected.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 font-bold text-sm transition-all
                  ${submitted
                    ? item === items[i]
                      ? 'bg-green-100 border-green-400 text-green-800'
                      : 'bg-red-100 border-red-400 text-red-800'
                    : 'bg-indigo-100 border-indigo-400 text-indigo-800'
                  }
                `}
              >
                <span className="text-xs opacity-60">{i + 1}.</span>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available items */}
      <div className="flex flex-wrap gap-2 justify-center">
        {pool.map((item) => (
          <button
            key={item}
            onClick={() => handleAdd(item)}
            disabled={submitted}
            className="bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 font-bold text-sm text-gray-700
              hover:bg-indigo-50 hover:border-indigo-300 active:scale-95 transition-all shadow-sm disabled:opacity-40"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Controls */}
      {!submitted && (
        <div className="flex gap-2">
          <button
            onClick={handleRemoveLast}
            disabled={selected.length === 0}
            className="flex-1 bg-white border-2 border-gray-200 text-gray-500 font-bold py-3 rounded-xl
              hover:bg-red-50 hover:border-red-300 active:scale-95 transition-all disabled:opacity-30"
          >
            ⌫ Angre siste
          </button>
          <button
            onClick={handleCheck}
            disabled={selected.length !== items.length}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl
              hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 shadow-md"
          >
            Sjekk ✓
          </button>
        </div>
      )}

      {submitted && (
        <div className={`rounded-2xl p-3 text-center font-black text-lg animate-bounce-in
          ${correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
        `}>
          {correct ? '✅ Perfekt rekkefølge!' : '❌ Ikke helt riktig'}
        </div>
      )}
    </div>
  );
}
