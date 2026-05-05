import { useState, useRef, useEffect } from 'react';
import type { Question } from '../../types';

interface Props {
  question: Question;
  onAnswer: (correct: boolean) => void;
}

function normalize(s: string) {
  return s.trim().replace(',', '.').toLowerCase().replace(/\s+/g, '');
}

function isCorrect(input: string, question: Question): boolean {
  const norm = normalize(input);
  const accepted = question.acceptedAnswers ?? (question.correctAnswer ? [question.correctAnswer] : []);
  return accepted.some((a) => normalize(a) === norm);
}

const NUMPAD = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['-', '0', '.'],
];

export function FillInQuestion({ question, onAnswer }: Props) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (!value.trim() || submitted) return;
    const ok = isCorrect(value, question);
    setCorrect(ok);
    setSubmitted(true);
    setTimeout(() => onAnswer(ok), 600);
  };

  const handleNumpad = (key: string) => {
    if (submitted) return;
    if (key === '⌫') {
      setValue((v) => v.slice(0, -1));
    } else if (key === '✓') {
      handleSubmit();
    } else {
      // prevent double decimal/minus
      if (key === '.' && value.includes('.')) return;
      if (key === '-' && value.length > 0) return;
      setValue((v) => v + key);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Answer input */}
      <div className={`flex items-center gap-2 bg-white rounded-2xl border-2 px-5 py-4 shadow-sm transition-all duration-300
        ${!submitted ? 'border-gray-200' : correct ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}
      `}>
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => { if (!submitted) setValue(e.target.value); }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Skriv svaret..."
          className="flex-1 text-2xl font-bold bg-transparent outline-none text-gray-800 placeholder:text-gray-300 min-w-0"
        />
        {question.unit && (
          <span className="text-xl font-bold text-gray-400 shrink-0">{question.unit}</span>
        )}
        {submitted && (
          <span className="text-2xl shrink-0">{correct ? '✅' : '❌'}</span>
        )}
      </div>

      {/* Numpad */}
      {!submitted && (
        <div className="grid grid-cols-3 gap-2">
          {NUMPAD.flat().map((key) => (
            <button
              key={key}
              onClick={() => handleNumpad(key)}
              className="bg-white border-2 border-gray-200 rounded-xl py-3 text-xl font-bold text-gray-700
                hover:bg-indigo-50 hover:border-indigo-300 active:scale-95 transition-all"
            >
              {key}
            </button>
          ))}
          <button
            onClick={() => setValue((v) => v.slice(0, -1))}
            className="bg-white border-2 border-gray-200 rounded-xl py-3 text-xl font-bold text-gray-500
              hover:bg-red-50 hover:border-red-300 active:scale-95 transition-all"
          >
            ⌫
          </button>
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="col-span-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl py-3 text-lg font-bold
              hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 shadow-md"
          >
            Sjekk ✓
          </button>
        </div>
      )}
    </div>
  );
}
