export type QuestionType = 'multiple-choice' | 'fill-in' | 'match-pairs' | 'sort-order';

export interface Choice {
  id: string;
  text: string;
}

export interface MatchPair {
  left: string;
  right: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  // multiple-choice
  choices?: Choice[];
  correctAnswer?: string;
  // fill-in
  acceptedAnswers?: string[];
  unit?: string;
  // match-pairs
  pairs?: MatchPair[];
  // sort-order
  items?: string[];
  explanation: string;
  xp: number;
}

export interface Level {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export type TopicColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal';

export interface Topic {
  id: string;
  title: string;
  emoji: string;
  description: string;
  color: TopicColor;
  levels: Level[];
}

export type SubjectColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'teal' | 'indigo' | 'pink';

export interface Subject {
  id: string;
  title: string;
  emoji: string;
  description: string;
  color: SubjectColor;
  topicIds: string[];
}


  topicId: string;
  levelId: string;
  stars: number;
  score: number;
  totalQuestions: number;
}

export interface GameState {
  playerName: string;
  xp: number;
  level: number;
  levelResults: Record<string, LevelResult>;
  totalCorrect: number;
  totalAttempted: number;
  streak: number;
  bestStreak: number;
}
