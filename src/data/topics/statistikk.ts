import type { Topic } from '../../types';

export const statistikkTopic: Topic = {
  id: 'statistikk',
  title: 'Statistikk',
  emoji: '📊',
  description: 'Gjennomsnitt, median, typetall og sannsynlighet',
  color: 'purple',
  levels: [
    {
      id: 'level-1',
      title: 'Gjennomsnitt og median',
      description: 'Finn gjennomsnitt, median og typetall',
      questions: [
        { id: 's1-1', type: 'fill-in', text: 'Finn gjennomsnittet av:\n4, 8, 6, 10, 2', acceptedAnswers: ['6'], explanation: '(4+8+6+10+2)/5 = 30/5 = 6', xp: 10 },
        { id: 's1-2', type: 'sort-order', text: 'Sorter disse tallene fra minst til størst (for å finne medianen):', items: ['1', '3', '4', '5', '9'], explanation: 'Sortert: 1, 3, 4, 5, 9 — medianen er midterste tall = 4', xp: 15 },
        { id: 's1-3', type: 'match-pairs', text: 'Koble begrepet med riktig definisjon:', pairs: [{ left: 'Gjennomsnitt', right: 'Sum / antall' }, { left: 'Median', right: 'Midterste tall' }, { left: 'Typetall', right: 'Hyppigst forekommende' }, { left: 'Variasjonsbredde', right: 'Største − minste' }], explanation: 'Disse er de fire viktigste statistikkbegrepene!', xp: 20 },
        { id: 's1-4', type: 'fill-in', text: 'Gjennomsnitt av 4 elever er 4.\nTre har 3, 4 og 5.\n\nHva har den fjerde?', acceptedAnswers: ['4'], explanation: 'Sum = 4×4=16. 3+4+5=12. Fjerde: 16−12 = 4', xp: 25 },
        { id: 's1-5', type: 'multiple-choice', text: 'Finn medianen av: 7, 2, 9, 4, 6, 1', choices: [{ id: 'a', text: '4' }, { id: 'b', text: '5' }, { id: 'c', text: '6' }, { id: 'd', text: '4,8' }], correctAnswer: 'b', explanation: 'Sortert: 1,2,4,6,7,9 — median = (4+6)/2 = 5', xp: 20 },
      ],
    },
    {
      id: 'level-2',
      title: 'Sannsynlighet',
      description: 'Regn ut sannsynligheter',
      questions: [
        { id: 's2-1', type: 'multiple-choice', text: 'Du kaster en terning. Hva er P(6)?', choices: [{ id: 'a', text: '1/3' }, { id: 'b', text: '1/6' }, { id: 'c', text: '1/4' }, { id: 'd', text: '6' }], correctAnswer: 'b', explanation: '6 mulige utfall, 1 gunstig → P = 1/6', xp: 10 },
        { id: 's2-2', type: 'fill-in', text: 'En pose har 3 røde og 2 blå kuler.\n\nP(rød) = ?/5', acceptedAnswers: ['3'], explanation: 'P(rød) = 3/5 (3 røde av totalt 5)', xp: 15 },
        { id: 's2-3', type: 'match-pairs', text: 'Koble hendelsen med sannsynligheten:', pairs: [{ left: 'Kaste kron (mynt)', right: '1/2' }, { left: 'Kaste 6 (terning)', right: '1/6' }, { left: 'Trekke ruter (kortspill)', right: '1/4' }, { left: 'To kron på rad', right: '1/4' }], explanation: 'P(to uavhengige) = P(A) × P(B)', xp: 20 },
        { id: 's2-4', type: 'fill-in', text: 'P(regn) = 0,3\n\nP(ikke regn) = ?', acceptedAnswers: ['0.7', '0,7'], explanation: 'P(ikke regn) = 1 − 0,3 = 0,7', xp: 15 },
        { id: 's2-5', type: 'sort-order', text: 'Sorter hendelsene fra minst til størst sannsynlighet:', items: ['Kaste 6 to ganger: P = 1/36', 'Kaste 6 én gang: P = 1/6', 'Kaste partall: P = 1/2', 'Kaste under 7: P = 1'], explanation: 'Sikker hendelse har P=1, umulig har P=0. Mellom der er alt mulig!', xp: 20 },
      ],
    },
  ],
};
