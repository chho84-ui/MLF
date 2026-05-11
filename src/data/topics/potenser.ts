import type { Topic } from '../../types';

export const potenserTopic: Topic = {
  id: 'potenser',
  title: 'Potenser og røtter',
  emoji: '⚡',
  description: 'Potenser, kvadratrøtter og standardform',
  color: 'red',
  levels: [
    {
      id: 'level-1',
      title: 'Potenser',
      description: 'Regn med potenser',
      questions: [
        { id: 'pot1-1', type: 'fill-in', text: '2⁴ = ?', acceptedAnswers: ['16'], explanation: '2⁴ = 2 × 2 × 2 × 2 = 16', xp: 10 },
        { id: 'pot1-2', type: 'match-pairs', text: 'Koble potensen med riktig verdi:', pairs: [{ left: '2³', right: '8' }, { left: '3²', right: '9' }, { left: '4³', right: '64' }, { left: '5²', right: '25' }], explanation: 'aⁿ betyr a ganget med seg selv n ganger.', xp: 20 },
        { id: 'pot1-3', type: 'sort-order', text: 'Sorter disse potensr fra minst til størst verdi:', items: ['2² = 4', '2³ = 8', '3² = 9', '2⁴ = 16'], explanation: '4 < 8 < 9 < 16 — merk at 3² > 2³!', xp: 20 },
        { id: 'pot1-4', type: 'multiple-choice', text: 'Hva er 2³ × 2²?', choices: [{ id: 'a', text: '2⁶ = 64' }, { id: 'b', text: '2⁵ = 32' }, { id: 'c', text: '4⁵' }, { id: 'd', text: '2⁴ = 16' }], correctAnswer: 'b', explanation: 'aᵐ × aⁿ = aᵐ⁺ⁿ → 2³ × 2² = 2⁵ = 32', xp: 20 },
        { id: 'pot1-5', type: 'fill-in', text: '10⁻² = ?\n\n(Skriv som desimaltall)', acceptedAnswers: ['0.01', '0,01'], explanation: '10⁻² = 1/10² = 1/100 = 0,01', xp: 20 },
      ],
    },
    {
      id: 'level-2',
      title: 'Kvadratrøtter',
      description: 'Finn og forenkle røtter',
      questions: [
        { id: 'pot2-1', type: 'fill-in', text: '√144 = ?', acceptedAnswers: ['12'], explanation: '√144 = 12 fordi 12² = 144', xp: 10 },
        { id: 'pot2-2', type: 'match-pairs', text: 'Koble kvadrattallet med kvadratroten:', pairs: [{ left: '√25', right: '5' }, { left: '√81', right: '9' }, { left: '√121', right: '11' }, { left: '√225', right: '15' }], explanation: 'Lær disse utenat — de dukker stadig opp på tentamen!', xp: 20 },
        { id: 'pot2-3', type: 'sort-order', text: 'Sorter stegene for å forenkle √50:', items: ['Skriv 50 som produkt: 50 = 25 × 2', 'Bruk: √(a×b) = √a × √b', 'Regn: √25 × √2 = 5√2', 'Svar: √50 = 5√2'], explanation: 'Finn alltid det største perfekte kvadrattallet i uttrykket!', xp: 25 },
        { id: 'pot2-4', type: 'fill-in', text: '4^(1/2) = ?\n\n(Hint: dette er det samme som √4)', acceptedAnswers: ['2'], explanation: '4^(1/2) = √4 = 2', xp: 20 },
        { id: 'pot2-5', type: 'multiple-choice', text: 'Hva er ∛27?', choices: [{ id: 'a', text: '9' }, { id: 'b', text: '3' }, { id: 'c', text: '6' }, { id: 'd', text: '81' }], correctAnswer: 'b', explanation: '∛27 = 3 fordi 3³ = 27', xp: 20 },
      ],
    },
  ],
};
