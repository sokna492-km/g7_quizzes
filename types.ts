
export enum Subject {
  Mathematics = 'គណិតវិទ្យា',
  Physics = 'រូបវិទ្យា',
  Chemistry = 'គីមីវិទ្យា',
  Biology = 'ជីវវិទ្យា',
  KhmerLiterature = 'អក្សរសាស្រ្តខ្មែរ',
  MoralCivic = 'សីលធម៌ ពលរដ្ឋវិជ្ជា',
  EarthScience = 'ផែនដីវិទ្យា',
  Geography = 'ភូមិវិទ្យា',
  History = 'ប្រវត្តិវិទ្យា',
  English = 'ភាសាអង់គ្លេស'
}

export enum Difficulty {
  Easy = 'ងាយស្រួល',
  Medium = 'មធ្យម',
  Hard = 'ពិបាក'
}

export interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  subject: Subject;
  chapter: string;
  difficulty: Difficulty;
  timestamp: number;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  provider: 'email' | 'google';
  createdAt: number;
}

export interface UserStats {
  totalPoints: number;
  streak: number;
  lastQuizDate: string | null;
  history: QuizResult[];
}

export interface Chapter {
  id: string;
  title: string;
  summary: string; // Used for RAG context
  originalTitle?: string;
  displayTitle?: string;
}

export interface QuizSession {
  subject: Subject;
  chapter: Chapter;
  difficulty: Difficulty;
  questions: Question[];
  currentIdx: number;
  score: number;
  timeLeft: number;
  lastUpdated: number;
}
