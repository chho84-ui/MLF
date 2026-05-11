import type { Topic } from '../../types';

export const solsystemetTopic: Topic = {
  id: 'solsystemet',
  title: 'Solsystemet',
  emoji: '🪐',
  description: 'Planeter, solen og rommet rundt oss',
  color: 'purple',
  levels: [
    {
      id: 'level-1',
      title: 'Planetene',
      description: 'Lær navnene og rekkefølgen på planetene',
      questions: [
        { id: 'ss1-1', type: 'multiple-choice', text: 'Hvilken planet er nærmest solen?', choices: [{ id: 'a', text: 'Venus' }, { id: 'b', text: 'Jorda' }, { id: 'c', text: 'Merkur' }, { id: 'd', text: 'Mars' }], correctAnswer: 'c', explanation: 'Merkur er den innerste av de åtte planetene og er nærmest solen.', xp: 10 },
        { id: 'ss1-2', type: 'multiple-choice', text: 'Hvilken planet er den største i solsystemet?', choices: [{ id: 'a', text: 'Saturn' }, { id: 'b', text: 'Jupiter' }, { id: 'c', text: 'Neptun' }, { id: 'd', text: 'Uranus' }], correctAnswer: 'b', explanation: 'Jupiter er så stor at over 1300 jordkloder får plass inni den!', xp: 10 },
        { id: 'ss1-3', type: 'fill-in', text: 'Hvor mange planeter er det i solsystemet?\n\nSvar: ?', acceptedAnswers: ['8', 'åtte'], explanation: 'De åtte planetene er: Merkur, Venus, Jorda, Mars, Jupiter, Saturn, Uranus og Neptun.', xp: 10 },
        { id: 'ss1-4', type: 'sort-order', text: 'Sorter de fire innerste planetene fra nærmest til lengst fra solen:', items: ['Merkur', 'Venus', 'Jorda', 'Mars'], explanation: 'Rekkefølgen fra solen: Merkur → Venus → Jorda → Mars. Jorda er den tredje planeten!', xp: 15 },
        { id: 'ss1-5', type: 'multiple-choice', text: 'Hvilken planet er kjent for sine tydelige ringer?', choices: [{ id: 'a', text: 'Jupiter' }, { id: 'b', text: 'Uranus' }, { id: 'c', text: 'Neptun' }, { id: 'd', text: 'Saturn' }], correctAnswer: 'd', explanation: 'Saturn har de vakreste ringene i solsystemet. De er laget av is og stein!', xp: 10 },
      ],
    },
    {
      id: 'level-2',
      title: 'Solen og månen',
      description: 'Hva er solen, og hvordan beveger Jorda seg?',
      questions: [
        { id: 'ss2-1', type: 'multiple-choice', text: 'Hva er solen?', choices: [{ id: 'a', text: 'En planet' }, { id: 'b', text: 'En måne' }, { id: 'c', text: 'En stjerne' }, { id: 'd', text: 'En asteroid' }], correctAnswer: 'c', explanation: 'Solen er en kjempestor stjerne — en glødende ball av gass som gir lys og varme til hele solsystemet.', xp: 10 },
        { id: 'ss2-2', type: 'multiple-choice', text: 'Omtrent hvor lang tid tar det for Jorda å gå én runde rundt solen?', choices: [{ id: 'a', text: '24 timer' }, { id: 'b', text: '30 dager' }, { id: 'c', text: '365 dager' }, { id: 'd', text: '10 år' }], correctAnswer: 'c', explanation: 'Jorda bruker 365 dager (og litt til) på én runde rundt solen. Det er ett år!', xp: 10 },
        { id: 'ss2-3', type: 'multiple-choice', text: 'Hva kalles det når månen beveger seg mellom Jorda og solen, slik at solen blir skjult?', choices: [{ id: 'a', text: 'Månedformørkelse' }, { id: 'b', text: 'Nordlys' }, { id: 'c', text: 'Solformørkelse' }, { id: 'd', text: 'Solnedgang' }], correctAnswer: 'c', explanation: 'En solformørkelse skjer når månen stiller seg mellom Jorda og solen og kaster skygge på Jorda.', xp: 12 },
        { id: 'ss2-4', type: 'fill-in', text: 'Hvor mange timer tar det for Jorda å rotere rundt seg selv én gang?\n\nSvar: ?', acceptedAnswers: ['24'], unit: 'timer', explanation: 'Jordens rotasjon tar 24 timer — det er grunnen til at vi har dag og natt!', xp: 10 },
        { id: 'ss2-5', type: 'match-pairs', text: 'Koble himmellegemet med riktig kjennetegn:', pairs: [{ left: 'Solen', right: 'En stjerne som gir oss lys' }, { left: 'Månen', right: 'Går rundt Jorda' }, { left: 'Saturn', right: 'Har vakre ringer' }, { left: 'Mars', right: 'Den røde planeten' }], explanation: 'Bra! Hvert himmellegeme har sine særtrekk som gjør dem unike.', xp: 15 },
      ],
    },
    {
      id: 'level-3',
      title: 'Romfakta',
      description: 'Kometer, dvergplaneter og spennende fakta',
      questions: [
        { id: 'ss3-1', type: 'multiple-choice', text: 'Hva er Pluto?', choices: [{ id: 'a', text: 'En vanlig planet' }, { id: 'b', text: 'En måne rundt Jupiter' }, { id: 'c', text: 'En dvergplanet' }, { id: 'd', text: 'En komet' }], correctAnswer: 'c', explanation: 'Pluto ble i 2006 omdøpt til dvergplanet. Den er for liten og deler bane med andre objekter langt ute i solsystemet.', xp: 12 },
        { id: 'ss3-2', type: 'multiple-choice', text: 'Hva er en komet?', choices: [{ id: 'a', text: 'En liten planet' }, { id: 'b', text: 'En isklump med glødende hale' }, { id: 'c', text: 'En eksplosjon i verdensrommet' }, { id: 'd', text: 'En stor asteroide' }], correctAnswer: 'b', explanation: 'Kometer er baller av is og støv. Når de nærmer seg solen, fordamper isen og danner en lysende hale!', xp: 12 },
        { id: 'ss3-3', type: 'multiple-choice', text: 'Hvilken planet kalles "den røde planeten"?', choices: [{ id: 'a', text: 'Venus' }, { id: 'b', text: 'Merkur' }, { id: 'c', text: 'Jupiter' }, { id: 'd', text: 'Mars' }], correctAnswer: 'd', explanation: 'Mars er rød fordi overflaten er dekket av rødbrun rust (jernoksid). NASA har sendt rovere dit for å utforske planeten!', xp: 10 },
        { id: 'ss3-4', type: 'sort-order', text: 'Sorter disse himmellegemene fra minst til størst:', items: ['Månen', 'Jorda', 'Jupiter', 'Solen'], explanation: 'Solen er over 100 ganger bredere enn Jorda. Jupiter er ca. 11 ganger bredere enn Jorda. Månen er omtrent en fjerdedel av Jorda!', xp: 15 },
        { id: 'ss3-5', type: 'multiple-choice', text: 'Omtrent hvor langt er det fra Jorda til solen?', choices: [{ id: 'a', text: '150 000 km' }, { id: 'b', text: '15 millioner km' }, { id: 'c', text: '150 millioner km' }, { id: 'd', text: '150 milliarder km' }], correctAnswer: 'c', explanation: 'Jorda er ca. 150 millioner km fra solen. Lyset fra solen bruker hele 8 minutter på å nå oss!', xp: 15 },
      ],
    },
  ],
};
