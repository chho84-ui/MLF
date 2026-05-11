import type { Subject } from '../types';

export const subjects: Subject[] = [
  {
    id: 'matematikk',
    title: 'Matematikk',
    emoji: '🧮',
    description: 'Algebra, geometri, statistikk og mer',
    color: 'blue',
    topicIds: ['algebra', 'geometri', 'prosent', 'statistikk', 'funksjoner', 'potenser'],
  },
  {
    id: 'naturfag',
    title: 'Naturfag',
    emoji: '🔬',
    description: 'Solsystemet, naturen og kroppen',
    color: 'teal',
    topicIds: ['solsystemet'],
  },
];
