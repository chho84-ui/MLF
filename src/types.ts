export type QuestionType = 'multiple-choice' | 'fill-in';

export interface Choice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  choices?: Choice[];
  correctAnswer: string;
  explanation: string;
  xp: number;
}

export interface Level {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  requiredStars?: number;
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

export interface LevelResult {
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
