import type { Topic } from '../../types';

export const funksjonerTopic: Topic = {
  id: 'funksjoner',
  title: 'Funksjoner',
  emoji: '📈',
  description: 'Lineære funksjoner, grafer og koordinatsystem',
  color: 'teal',
  levels: [
    {
      id: 'level-1',
      title: 'Lineære funksjoner',
      description: 'Forstå y = ax + b',
      questions: [
        { id: 'f1-1', type: 'match-pairs', text: 'Koble funksjonen med riktig stigningstall (a):', pairs: [{ left: 'y = 3x + 2', right: 'a = 3' }, { left: 'y = −2x + 5', right: 'a = −2' }, { left: 'y = 0,5x − 1', right: 'a = 0,5' }, { left: 'y = 7', right: 'a = 0' }], explanation: 'Stigningstallet a bestemmer hvor bratt linjen er. a=0 gir horisontal linje.', xp: 15 },
        { id: 'f1-2', type: 'fill-in', text: 'y = 2x + 1\n\nHva er y når x = 3?', acceptedAnswers: ['7'], explanation: 'y = 2(3) + 1 = 6 + 1 = 7', xp: 10 },
        { id: 'f1-3', type: 'fill-in', text: 'y = 2x − 6\n\nFinn x når y = 0 (nullpunktet):', acceptedAnswers: ['3'], explanation: '0 = 2x − 6 → 2x = 6 → x = 3', xp: 20 },
        { id: 'f1-4', type: 'sort-order', text: 'Sorter linjene fra bratteste til minst bratt stigning:', items: ['y = 5x + 1  (a=5)', 'y = 3x − 2  (a=3)', 'y = x + 4   (a=1)', 'y = 0,5x    (a=0,5)'], explanation: 'Jo høyere absoluttverdi av a, jo brattere linje!', xp: 20 },
        { id: 'f1-5', type: 'multiple-choice', text: 'To punkter: (0, 2) og (3, 8). Hva er stigningstallet?', choices: [{ id: 'a', text: '3' }, { id: 'b', text: '2' }, { id: 'c', text: '6' }, { id: 'd', text: '4' }], correctAnswer: 'b', explanation: 'a = (y₂−y₁)/(x₂−x₁) = (8−2)/(3−0) = 6/3 = 2', xp: 25 },
      ],
    },
    {
      id: 'level-2',
      title: 'Koordinatsystem',
      description: 'Punkter, linjer og skjæring',
      questions: [
        { id: 'f2-1', type: 'match-pairs', text: 'Koble punktet med riktig kvadrant:', pairs: [{ left: '(3, 4)', right: '1. kvadrant' }, { left: '(−3, 4)', right: '2. kvadrant' }, { left: '(−3, −4)', right: '3. kvadrant' }, { left: '(3, −4)', right: '4. kvadrant' }], explanation: '1. kvadrant: (+,+), 2: (−,+), 3: (−,−), 4: (+,−)', xp: 15 },
        { id: 'f2-2', type: 'fill-in', text: 'Avstanden mellom (1, 2) og (4, 6)?\n\n(Bruk Pytagoras)', acceptedAnswers: ['5'], explanation: 'd = √((4−1)² + (6−2)²) = √(9+16) = √25 = 5', xp: 25 },
        { id: 'f2-3', type: 'sort-order', text: 'Sorter stegene for å finne skjæringspunktet mellom y=x+1 og y=2x−1:', items: ['Sett likningene lik hverandre: x+1 = 2x−1', 'Løs for x: x = 2', 'Finn y: y = 2+1 = 3', 'Skjæringspunktet er (2, 3)'], explanation: 'Sett y-uttrykkene lik hverandre, løs for x, finn deretter y!', xp: 25 },
        { id: 'f2-4', type: 'multiple-choice', text: 'Hvilken linje er parallell med y = 3x + 1?', choices: [{ id: 'a', text: 'y = 3x − 4' }, { id: 'b', text: 'y = −3x + 1' }, { id: 'c', text: 'y = x + 3' }, { id: 'd', text: 'y = 3' }], correctAnswer: 'a', explanation: 'Parallelle linjer har samme a. y = 3x − 4 har a = 3.', xp: 20 },
        { id: 'f2-5', type: 'fill-in', text: 'y = 3x + 1\n\nHva er y-aksens skjæringspunkt (konstantleddet b)?', acceptedAnswers: ['1'], explanation: 'I y = ax + b er b = 1 (der linjen krysser y-aksen)', xp: 15 },
      ],
    },
  ],
};
