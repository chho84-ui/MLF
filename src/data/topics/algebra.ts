import type { Topic } from '../../types';

export const algebraTopic: Topic = {
  id: 'algebra',
  title: 'Algebra',
  emoji: '🔡',
  description: 'Likninger, uttrykk og faktorisering',
  color: 'blue',
  levels: [
    {
      id: 'level-1',
      title: 'Enkle likninger',
      description: 'Løs likninger med én ukjent',
      questions: [
        { id: 'a1-1', type: 'fill-in', text: 'Løs likningen: x + 5 = 12\n\nx = ?', acceptedAnswers: ['7'], explanation: 'x + 5 = 12 → x = 12 − 5 = 7', xp: 15 },
        { id: 'a1-2', type: 'fill-in', text: 'Løs likningen: 3x = 18\n\nx = ?', acceptedAnswers: ['6'], explanation: '3x = 18 → x = 18 ÷ 3 = 6', xp: 15 },
        { id: 'a1-3', type: 'fill-in', text: 'Løs likningen: 2x − 4 = 10\n\nx = ?', acceptedAnswers: ['7'], explanation: '2x − 4 = 10 → 2x = 14 → x = 7', xp: 20 },
        { id: 'a1-4', type: 'sort-order', text: 'Sorter disse stegene for å løse 2x + 3 = 11 i riktig rekkefølge:', items: ['Skriv opp 2x + 3 = 11', 'Trekk fra 3 på begge sider: 2x = 8', 'Del på 2: x = 4', 'Sjekk: 2×4+3 = 11 ✓'], explanation: 'Slik løser vi en likning: isoler x steg for steg!', xp: 20 },
        { id: 'a1-5', type: 'match-pairs', text: 'Koble likningen med riktig løsning:', pairs: [{ left: 'x + 3 = 10', right: 'x = 7' }, { left: '2x = 14', right: 'x = 7 ✓ / x = 7' }, { left: 'x − 5 = 1', right: 'x = 6' }, { left: '4x = 20', right: 'x = 5' }], explanation: 'Bra! Husker du fremgangsmåten for hver type?', xp: 25 },
      ],
    },
    {
      id: 'level-2',
      title: 'Likninger med x på begge sider',
      description: 'Flytt leddene og forenkle',
      questions: [
        { id: 'a2-1', type: 'fill-in', text: 'Løs: 4x + 2 = 2x + 10\n\nx = ?', acceptedAnswers: ['4'], explanation: '4x − 2x = 10 − 2 → 2x = 8 → x = 4', xp: 20 },
        { id: 'a2-2', type: 'multiple-choice', text: 'Løs likningen: 5x − 3 = 3x + 9', choices: [{ id: 'a', text: 'x = 3' }, { id: 'b', text: 'x = 6' }, { id: 'c', text: 'x = 4' }, { id: 'd', text: 'x = 9' }], correctAnswer: 'b', explanation: '5x − 3x = 9 + 3 → 2x = 12 → x = 6', xp: 20 },
        { id: 'a2-3', type: 'fill-in', text: 'Forenkle uttrykket:\n\n3x + 2x − x = ?x', acceptedAnswers: ['4'], explanation: '(3 + 2 − 1)x = 4x', xp: 15 },
        { id: 'a2-4', type: 'sort-order', text: 'Sorter stegene for å løse 5x − 3 = 3x + 9:', items: ['Flytt x til venstre: 5x − 3x = 9 + 3', 'Forenkle: 2x = 12', 'Del på 2: x = 6', 'Sjekk: 5(6)−3 = 27 = 3(6)+9 ✓'], explanation: 'Flytt alltid x-ledd til én side og tall til den andre!', xp: 25 },
        { id: 'a2-5', type: 'fill-in', text: 'Løs: 2(x + 3) = 14\n\nx = ?', acceptedAnswers: ['4'], explanation: '2(x + 3) = 14 → x + 3 = 7 → x = 4', xp: 20 },
      ],
    },
    {
      id: 'level-3',
      title: 'Andregradslikninger',
      description: 'x² og faktorisering',
      questions: [
        { id: 'a3-1', type: 'multiple-choice', text: 'Løs: x² = 25', choices: [{ id: 'a', text: 'x = 5' }, { id: 'b', text: 'x = ±5' }, { id: 'c', text: 'x = 12,5' }, { id: 'd', text: 'x = −5' }], correctAnswer: 'b', explanation: 'x² = 25 gir x = 5 eller x = −5 (begge løsninger!)', xp: 25 },
        { id: 'a3-2', type: 'match-pairs', text: 'Koble uttrykket med riktig faktorisering:', pairs: [{ left: 'x² + 4x + 4', right: '(x+2)²' }, { left: 'x² − 9', right: '(x+3)(x−3)' }, { left: 'x² + 5x + 6', right: '(x+2)(x+3)' }, { left: 'x² − 6x + 9', right: '(x−3)²' }], explanation: 'Kjenn igjen mønstrene: fullstendige kvadrater og konjugatsetningen!', xp: 30 },
        { id: 'a3-3', type: 'fill-in', text: 'Hva er (x+2)(x+3) når x = 0?\n\nSvar = ?', acceptedAnswers: ['6'], explanation: '(0+2)(0+3) = 2 × 3 = 6', xp: 20 },
        { id: 'a3-4', type: 'sort-order', text: 'Sorter fra minst til størst:', items: ['x² − 4 = 0 → x = ±2', 'x² = 9 → x = ±3', 'x² = 16 → x = ±4', 'x² = 25 → x = ±5'], explanation: 'Jo større høyreside, jo større løsning!', xp: 15 },
        { id: 'a3-5', type: 'fill-in', text: 'Løs: x² − 4 = 0\n\nx = ± ?', acceptedAnswers: ['2'], explanation: 'x² = 4 → x = ±2', xp: 25 },
      ],
    },
  ],
};
