import type { Topic } from '../../types';

export const prosentTopic: Topic = {
  id: 'prosent',
  title: 'Prosent og brøk',
  emoji: '💯',
  description: 'Prosentregning, brøk og desimaltall',
  color: 'orange',
  levels: [
    {
      id: 'level-1',
      title: 'Grunnleggende prosent',
      description: 'Finn prosent av et tall',
      questions: [
        { id: 'p1-1', type: 'fill-in', text: 'Hva er 25% av 200?', acceptedAnswers: ['50'], explanation: '25% = 0,25 → 0,25 × 200 = 50', xp: 10 },
        { id: 'p1-2', type: 'fill-in', text: '40 er hvor mange prosent av 200?', acceptedAnswers: ['20'], unit: '%', explanation: '40/200 × 100 = 20%', xp: 15 },
        { id: 'p1-3', type: 'match-pairs', text: 'Koble brøken med riktig prosent:', pairs: [{ left: '1/2', right: '50%' }, { left: '1/4', right: '25%' }, { left: '3/4', right: '75%' }, { left: '1/5', right: '20%' }], explanation: 'Disse brøk↔prosent-parene er supernyttige å huske utenat!', xp: 20 },
        { id: 'p1-4', type: 'fill-in', text: 'En vare koster 300 kr og er satt ned 20%.\n\nNy pris = ?', acceptedAnswers: ['240'], unit: 'kr', explanation: '300 × 0,80 = 240 kr', xp: 20 },
        { id: 'p1-5', type: 'sort-order', text: 'Sorter fra minst til størst:', items: ['15%', '1/4 (=25%)', '0,3 (=30%)', '2/5 (=40%)'], explanation: 'Gjør alt om til prosent for å sammenligne: 15% < 25% < 30% < 40%', xp: 20 },
      ],
    },
    {
      id: 'level-2',
      title: 'Vekst og nedgang',
      description: 'Prosentvis økning og reduksjon',
      questions: [
        { id: 'p2-1', type: 'fill-in', text: 'En pris øker fra 400 kr til 500 kr.\n\nØkning i % = ?', acceptedAnswers: ['25'], unit: '%', explanation: '(500−400)/400 × 100 = 25%', xp: 20 },
        { id: 'p2-2', type: 'fill-in', text: 'Øk 600 kr med 15%.\n\nNy pris = ?', acceptedAnswers: ['690'], unit: 'kr', explanation: '600 × 1,15 = 690 kr', xp: 20 },
        { id: 'p2-3', type: 'match-pairs', text: 'Koble operasjonen med riktig multiplikator:', pairs: [{ left: 'Øk med 20%', right: '× 1,20' }, { left: 'Reduser med 30%', right: '× 0,70' }, { left: 'Øk med 5%', right: '× 1,05' }, { left: 'Reduser med 15%', right: '× 0,85' }], explanation: 'Økning: multipliser med (1 + prosent). Reduksjon: med (1 − prosent).', xp: 25 },
        { id: 'p2-4', type: 'multiple-choice', text: 'Etter 20% økning er prisen 360 kr. Hva var originalprisen?', choices: [{ id: 'a', text: '288 kr' }, { id: 'b', text: '300 kr' }, { id: 'c', text: '320 kr' }, { id: 'd', text: '340 kr' }], correctAnswer: 'b', explanation: 'x × 1,20 = 360 → x = 300 kr', xp: 25 },
        { id: 'p2-5', type: 'sort-order', text: 'Sorter stegene for å finne originalpris når ny pris er 480 kr etter 20% økning:', items: ['Sett opp: x × 1,20 = 480', 'Del på 1,20: x = 480 / 1,20', 'Regn ut: x = 400 kr', 'Sjekk: 400 × 1,20 = 480 ✓'], explanation: 'Del alltid på vekstfaktoren for å finne originalverdi!', xp: 25 },
      ],
    },
    {
      id: 'level-3',
      title: 'Brøkregning',
      description: 'Regn med brøker',
      questions: [
        { id: 'p3-1', type: 'multiple-choice', text: 'Regn ut: 1/2 + 1/3', choices: [{ id: 'a', text: '2/5' }, { id: 'b', text: '2/6' }, { id: 'c', text: '5/6' }, { id: 'd', text: '3/5' }], correctAnswer: 'c', explanation: '1/2 + 1/3 = 3/6 + 2/6 = 5/6', xp: 15 },
        { id: 'p3-2', type: 'match-pairs', text: 'Koble regnestykket med svaret:', pairs: [{ left: '3/4 × 2/3', right: '1/2' }, { left: '5/6 − 1/3', right: '1/2' }, { left: '2/3 ÷ 4/9', right: '3/2' }, { left: '1/4 + 3/8', right: '5/8' }], explanation: 'Brøkregning: finn fellesnevner ved addisjon, snu og gang ved divisjon!', xp: 25 },
        { id: 'p3-3', type: 'sort-order', text: 'Sorter stegene for å addere 1/3 + 1/4:', items: ['Finn fellesnevner: 12', 'Gjør om: 4/12 + 3/12', 'Adder: 7/12', 'Forenkle om mulig (her: 7/12 er allerede forenklet)'], explanation: 'Finn alltid fellesnevner før du adderer brøker!', xp: 20 },
        { id: 'p3-4', type: 'multiple-choice', text: 'Hvilken brøk er størst: 3/5 eller 5/8?', choices: [{ id: 'a', text: '3/5' }, { id: 'b', text: '5/8' }, { id: 'c', text: 'De er like' }, { id: 'd', text: 'Umulig å si' }], correctAnswer: 'b', explanation: '3/5 = 24/40, 5/8 = 25/40 → 5/8 er størst', xp: 20 },
        { id: 'p3-5', type: 'fill-in', text: '2/3 ÷ 4/9 = ?\n\n(Skriv som desimal eller brøk, f.eks. 1.5)', acceptedAnswers: ['1.5', '1,5', '3/2'], explanation: '2/3 ÷ 4/9 = 2/3 × 9/4 = 18/12 = 3/2 = 1,5', xp: 25 },
      ],
    },
  ],
};
