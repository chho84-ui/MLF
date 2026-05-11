import type { Topic } from '../../types';

export const geometriTopic: Topic = {
  id: 'geometri',
  title: 'Geometri',
  emoji: '📐',
  description: 'Areal, omkrets, volum og Pytagoras',
  color: 'green',
  levels: [
    {
      id: 'level-1',
      title: 'Areal og omkrets',
      description: 'Grunnleggende former',
      questions: [
        { id: 'g1-1', type: 'fill-in', text: 'Arealet av et rektangel med lengde 8 cm og bredde 5 cm?', acceptedAnswers: ['40'], unit: 'cm²', explanation: 'A = lengde × bredde = 8 × 5 = 40 cm²', xp: 10 },
        { id: 'g1-2', type: 'fill-in', text: 'Arealet av en trekant med grunnlinje 6 og høyde 4?', acceptedAnswers: ['12'], unit: 'cm²', explanation: 'A = (g × h) / 2 = (6 × 4) / 2 = 12 cm²', xp: 15 },
        { id: 'g1-3', type: 'match-pairs', text: 'Koble figuren med riktig arealformel:', pairs: [{ left: 'Rektangel', right: 'l × b' }, { left: 'Trekant', right: '(g × h) / 2' }, { left: 'Sirkel', right: 'π × r²' }, { left: 'Kvadrat', right: 's²' }], explanation: 'Husk disse formlene — de er grunnleggende for alle flateoppgaver!', xp: 20 },
        { id: 'g1-4', type: 'fill-in', text: 'Arealet av en sirkel med radius 5 cm? (π ≈ 3,14)\n\nSvar = ?', acceptedAnswers: ['78.5', '78,5'], unit: 'cm²', explanation: 'A = π × r² = 3,14 × 25 = 78,5 cm²', xp: 20 },
        { id: 'g1-5', type: 'sort-order', text: 'Sorter figurene fra minst til størst areal (alle med side/radius = 5):', items: ['Trekant: A = 12,5', 'Kvadrat: A = 25', 'Sirkel: A = 78,5', 'Rektangel 5×10: A = 50'], explanation: 'Sirkelen har størst areal for samme "størrelse"!', xp: 20 },
      ],
    },
    {
      id: 'level-2',
      title: 'Pytagoras',
      description: 'a² + b² = c²',
      questions: [
        { id: 'g2-1', type: 'fill-in', text: 'Rettvinklet trekant med kateter a=3 og b=4.\n\nHypotenusen c = ?', acceptedAnswers: ['5'], explanation: 'c² = 3² + 4² = 9 + 16 = 25 → c = 5', xp: 20 },
        { id: 'g2-2', type: 'fill-in', text: 'Kateter 5 og 12 — hva er hypotenusen?', acceptedAnswers: ['13'], explanation: 'c² = 25 + 144 = 169 → c = 13', xp: 20 },
        { id: 'g2-3', type: 'sort-order', text: 'Sorter stegene for å finne hypotenusen når a=6, b=8:', items: ['Skriv opp Pytagoras: a² + b² = c²', 'Sett inn: 6² + 8² = c²', 'Regn ut: 36 + 64 = 100', 'Ta kvadratroten: c = 10'], explanation: 'Pytagoras: alltid kvadrer kateterne, sum, deretter kvadratrot!', xp: 20 },
        { id: 'g2-4', type: 'multiple-choice', text: 'Hypotenusen er 10, én katet er 6. Hva er den andre?', choices: [{ id: 'a', text: '4' }, { id: 'b', text: '8' }, { id: 'c', text: '16' }, { id: 'd', text: '√136' }], correctAnswer: 'b', explanation: 'b² = 10² − 6² = 100 − 36 = 64 → b = 8', xp: 25 },
        { id: 'g2-5', type: 'match-pairs', text: 'Koble de kjente pytagoreiske triplene:', pairs: [{ left: '3, 4, ?', right: '5' }, { left: '5, 12, ?', right: '13' }, { left: '8, 15, ?', right: '17' }, { left: '7, 24, ?', right: '25' }], explanation: 'Disse triplene er verdt å huske — de dukker ofte opp på tentamen!', xp: 25 },
      ],
    },
    {
      id: 'level-3',
      title: 'Volum',
      description: 'Volum av 3D-figurer',
      questions: [
        { id: 'g3-1', type: 'fill-in', text: 'Volumet av en kube med side 4 cm?', acceptedAnswers: ['64'], unit: 'cm³', explanation: 'V = s³ = 4³ = 64 cm³', xp: 15 },
        { id: 'g3-2', type: 'match-pairs', text: 'Koble figuren med riktig volumformel:', pairs: [{ left: 'Kube', right: 's³' }, { left: 'Rettblokk', right: 'l × b × h' }, { left: 'Sylinder', right: 'π × r² × h' }, { left: 'Kjegle', right: '(1/3) × π × r² × h' }], explanation: 'Kjeglen er 1/3 av sylinderen med samme mål!', xp: 20 },
        { id: 'g3-3', type: 'fill-in', text: 'Volumet av en rettblokk 5 × 4 × 3 cm?', acceptedAnswers: ['60'], unit: 'cm³', explanation: 'V = 5 × 4 × 3 = 60 cm³', xp: 15 },
        { id: 'g3-4', type: 'sort-order', text: 'Sorter figurene fra minst til størst volum (alle med r=3, h=6):', items: ['Kjegle: V ≈ 56,5 cm³', 'Sylinder: V ≈ 169,6 cm³', 'Kule (r=3): V ≈ 113 cm³', 'Rettblokk 3×3×6: V = 54 cm³'], explanation: 'Sylinderen har alltid 3× volumet av kjeglen med samme mål!', xp: 25 },
        { id: 'g3-5', type: 'multiple-choice', text: 'Hva er volumet av en sylinder med r=3 og h=10? (π≈3,14)', choices: [{ id: 'a', text: '94,2 cm³' }, { id: 'b', text: '282,6 cm³' }, { id: 'c', text: '188,4 cm³' }, { id: 'd', text: '942 cm³' }], correctAnswer: 'b', explanation: 'V = π × 3² × 10 = 3,14 × 9 × 10 = 282,6 cm³', xp: 25 },
      ],
    },
  ],
};
