
export enum Subject {
  Mathematics = 'គណិតវិទ្យា',
  KhmerLiterature = 'អក្សរសាស្រ្តខ្មែរ',
  Physics = 'រូបវិទ្យា',
  Chemistry = 'គីមីវិទ្យា',
  Biology = 'ជីវវិទ្យា',
  MoralCivic = 'សីលធម៌ ពលរដ្ឋវិជ្ជា',
  EarthScience = 'ផែនដីវិទ្យា',
  Geography = 'ភូមិវិទ្យា',
  History = 'ប្រវត្តិវិទ្យា',
  English = 'ភាសាអង់គ្លេស',
  Python = 'Python'
}

export enum Difficulty {
  Easy = 'ងាយស្រួល',
  Medium = 'មធ្យម',
  Hard = 'ពិបាក'
}

export enum QuestionType {
  MCQ = 'MCQ',
  TrueFalse = 'TrueFalse',
  FillInTheBlank = 'FillInTheBlank',
  OddOneOut = 'OddOneOut',
  DefinitionMatch = 'DefinitionMatch',
  WhatsMissing = 'WhatsMissing',
  Matching = 'Matching'
}

export interface Question {
  questionText: string;
  type: QuestionType;
  options: string[]; // For choice-based questions (MCQ, TrueFalse, etc.)
  correctAnswerIndex?: number;
  correctAnswerValue?: string; // Used for FillInTheBlank
  matchingPairs?: { left: string; right: string }[]; // Used for Matching type
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  subject: Subject;
  chapter: string;
  difficulty: Difficulty;
  /** Phnom Penh date/time, sortable format (e.g. "2026-02-05 16:20") */
  dateTimePhnomPenh: string;
  /** @deprecated Legacy field; only present on old records. New writes use dateTimePhnomPenh only. */
  timestamp?: number;
  /** Number of wrong answers (for penalty calculation) */
  wrongAnswers?: number;
  /** Average time per question in seconds (for anti-cheat validation) */
  averageTimePerQuestion?: number;
  /** Whether this quiz passed anti-cheat validation */
  isValid?: boolean;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  provider: 'email' | 'google';
  createdAt: number;
}

/** One entry for each time the user opened "Play Math Game" (ល្បែងគណិត). */
export interface MathGameVisit {
  dateTimePhnomPenh: string;
}

export interface UserStats {
  totalPoints: number;
  streak: number;
  lastQuizDate: string | null;
  history: QuizResult[];
  /** Log of when the user opened the Math Game (Number Chase). */
  mathGameVisits?: MathGameVisit[];
}

/** Profile/tracking fields stored in Firestore (same document as UserStats). Never store passwords. */
export interface UserProfileTracking {
  email?: string;
  displayName?: string;
  provider?: 'email' | 'google';
  photoURL?: string | null;
  createdAt?: number;

  firstSeenAt?: number;
  lastSeenAt?: number;
  lastSeenUserAgent?: string;
  lastSeenDeviceType?: 'mobile' | 'tablet' | 'desktop';
  lastSeenBrowser?: string;
  lastSeenBrowserVersion?: string | null;
  lastSeenOs?: string;
  lastSeenOsVersion?: string | null;
  lastSeenTimezone?: string;
  lastSeenLanguage?: string;
  lastSeenScreenWidth?: number;
  lastSeenScreenHeight?: number;
  lastSeenPlatform?: string;
  lastSeenTouchSupport?: boolean;
  lastSeenOnLine?: boolean;
  lastSeenHardwareConcurrency?: number | null;
  lastSeenDeviceMemory?: number | null;
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
  /** Track wrong answers for penalty system */
  wrongAnswers?: number;
  /** Track time spent on each question (in seconds) */
  questionTimes?: number[];
  /** Track rapid clicks (answers under 2 seconds) */
  rapidClickCount?: number;
  /** Shuffled answer indices for each question */
  shuffledIndices?: number[][];
}
