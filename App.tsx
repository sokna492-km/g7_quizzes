
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import SubjectCard from './components/SubjectCard';
import QuizPlayer from './components/QuizPlayer';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import NumberChase from './components/NumberChase';
import { Subject, Difficulty, Question, UserStats, QuizResult, Chapter, QuizSession, User } from './types';
import { SUBJECTS_CONFIG } from './constants';
import { generateQuiz } from './geminiService';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
  onSnapshot
} from 'firebase/firestore';
import { getLastSeenTracking } from './clientContext';
import { formatPhnomPenhDateTime } from './utils/dateUtils';
import {
  generateShuffledIndices,
  validateQuizResults,
  calculateFinalPayout
} from './utils/antiCheatUtils';

/** Seconds per question by difficulty: Easy 30s, Medium 45s, Hard 60s */
function getTimePerQuestion(d: Difficulty): number {
  switch (d) {
    case Difficulty.Easy: return 30;
    case Difficulty.Medium: return 45;
    case Difficulty.Hard: return 60;
    default: return 30;
  }
}

type AppStep = 'setup' | 'loading' | 'quiz' | 'result' | 'dashboard' | 'math-game';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const [stats, setStats] = useState<UserStats>({
    totalPoints: 0,
    streak: 0,
    lastQuizDate: null,
    history: []
  });

  const [activeSession, setActiveSession] = useState<QuizSession | null>(() => {
    const saved = localStorage.getItem('k7_active_session');
    if (saved) return JSON.parse(saved);
    return null;
  });

  const [step, setStep] = useState<AppStep>('setup');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedUnitTitle, setSelectedUnitTitle] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);

  const [isLoading, setIsLoading] = useState(false);
  const [lastScore, setLastScore] = useState(0);
  const [lastTotalQuestions, setLastTotalQuestions] = useState(5);
  const [redoQuestions, setRedoQuestions] = useState<Question[]>([]);
  const [loadingMessageIdx, setLoadingMessageIdx] = useState(0);
  const [quotaError, setQuotaError] = useState<boolean>(false);

  const loadingMessages = [
    "កំពុងអានសៀវភៅសិក្សារបស់អ្នក...",
    "កំពុងរៀបចំសំណួរឆ្លាតវៃ...",
    "រង់ចាំបន្តិច ជិតរួចរាល់ហើយ!",
    "កំពុងផ្ទៀងផ្ទាត់មេរៀនជាមួយ Ai...",
    "ត្រៀមខ្លួនសម្រាប់បញ្ហាប្រឈមថ្មី!"
  ];

  // Listen for real Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Enforce email verification for email provider
        const isEmailProvider = firebaseUser.providerData.some(p => p.providerId === 'password');

        if (isEmailProvider && !firebaseUser.emailVerified) {
          setUser(null);
          return;
        }

        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'Student',
          provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
          createdAt: Date.now()
        });
      } else {
        setUser(null);
      }
      setIsInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen for stats in Firestore
  useEffect(() => {
    if (!user) {
      setStats({
        totalPoints: 0,
        streak: 0,
        lastQuizDate: null,
        history: []
      });
      return;
    }

    const statsRef = doc(db, 'users', user.id);
    const unsubscribe = onSnapshot(statsRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStats({
          totalPoints: data.totalPoints ?? 0,
          streak: data.streak ?? 0,
          lastQuizDate: data.lastQuizDate ?? null,
          history: Array.isArray(data.history) ? data.history : [],
          mathGameVisits: Array.isArray(data.mathGameVisits) ? data.mathGameVisits : []
        });
      } else {
        // Initialize user document with stats + profile + tracking (never store password)
        const now = Date.now();
        const lastSeen = getLastSeenTracking();
        setDoc(statsRef, {
          totalPoints: 0,
          streak: 0,
          lastQuizDate: null,
          history: [],
          mathGameVisits: [],
          email: user.email || null,
          displayName: user.displayName || null,
          provider: user.provider || null,
          photoURL: user.photoURL || null,
          createdAt: now,
          firstSeenAt: now,
          ...lastSeen
        });
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Update lastSeen + client context once per session when user is present
  useEffect(() => {
    if (!user) return;
    const statsRef = doc(db, 'users', user.id);
    const t = setTimeout(async () => {
      try {
        const snap = await getDoc(statsRef);
        if (snap.exists()) {
          await updateDoc(statsRef, getLastSeenTracking());
        }
      } catch (_) { }
    }, 800);
    return () => clearTimeout(t);
  }, [user?.id]);

  const navigateTo = useCallback((newStep: AppStep) => {
    const path = newStep === 'setup' ? '/' : `/${newStep}`;
    window.history.pushState({ step: newStep }, '', path);
    setStep(newStep);
  }, []);

  /** Record in Firestore when the user opens "Play Math Game" (ល្បែងគណិត). Activity only — do not add math game score to totalPoints; the game is for fun. */
  const trackMathGameVisit = useCallback(async () => {
    if (!user) return;
    const statsRef = doc(db, 'users', user.id);
    const entry = { dateTimePhnomPenh: formatPhnomPenhDateTime(Date.now()) };
    try {
      await updateDoc(statsRef, { mathGameVisits: arrayUnion(entry) });
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === 'not-found') {
        const lastSeen = getLastSeenTracking();
        await setDoc(statsRef, {
          totalPoints: 0,
          streak: 0,
          lastQuizDate: null,
          history: [],
          mathGameVisits: [entry],
          email: user.email || null,
          displayName: user.displayName || null,
          provider: user.provider || null,
          photoURL: user.photoURL || null,
          createdAt: Date.now(),
          firstSeenAt: Date.now(),
          ...lastSeen
        });
      } else {
        throw err;
      }
    }
  }, [user]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Try to get step from state, otherwise fallback to parsing pathname
      const newStep = event.state?.step || window.location.pathname.replace('/', '');
      const validSteps: AppStep[] = ['setup', 'loading', 'quiz', 'result', 'dashboard', 'math-game'];

      if (validSteps.includes(newStep as AppStep)) {
        setStep(newStep as AppStep);
      } else {
        setStep('setup');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial path parsing
    const currentPath = window.location.pathname.replace('/', '') || 'setup';
    const validSteps: AppStep[] = ['setup', 'loading', 'quiz', 'result', 'dashboard', 'math-game'];
    if (validSteps.includes(currentPath as AppStep)) {
      setStep(currentPath as AppStep);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    localStorage.setItem('k7_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    if (activeSession) {
      localStorage.setItem('k7_active_session', JSON.stringify(activeSession));
    } else {
      localStorage.removeItem('k7_active_session');
    }
  }, [activeSession]);

  const handleStartQuiz = async () => {
    if (!selectedSubject || !selectedChapter) return;
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    setIsLoading(true);
    setQuotaError(false);
    navigateTo('loading');

    try {
      const isPython = selectedSubject === Subject.Python;
      const q = await generateQuiz(
        selectedSubject,
        selectedChapter.title,
        selectedChapter.summary,
        difficulty,
        isPython ? { numQuestions: 10, inEnglish: true } : {}
      );
      const newSession: QuizSession = {
        subject: selectedSubject,
        chapter: selectedChapter,
        difficulty,
        questions: q,
        currentIdx: 0,
        score: 0,
        timeLeft: getTimePerQuestion(difficulty),
        lastUpdated: Date.now(),
        wrongAnswers: 0,
        questionTimes: [],
        rapidClickCount: 0,
        shuffledIndices: generateShuffledIndices(q)
      };

      setRedoQuestions(q);
      setActiveSession(newSession);
      setLastTotalQuestions(q.length);
      setIsLoading(false);

      setTimeout(() => navigateTo('quiz'), 50);
    } catch (err: any) {
      console.error("Quiz generation failed:", err);
      setIsLoading(false);
      if (err?.status === 429 || err?.message?.includes('429') || err?.message?.includes('quota')) {
        setQuotaError(true);
      } else {
        alert("មានបញ្ហាក្នុងការបង្កើតកម្រងសំណួរ។ សូមព្យាយាមម្តងទៀត!");
      }
      navigateTo('setup');
    }
  };

  const handleRedoQuiz = () => {
    const targetQuestions = activeSession?.questions || redoQuestions;
    const targetSubject = activeSession?.subject || selectedSubject;
    const targetChapter = activeSession?.chapter || selectedChapter;

    if (!targetSubject || !targetChapter || targetQuestions.length === 0) {
      navigateTo('setup');
      return;
    }

    const newSession: QuizSession = {
      subject: targetSubject,
      chapter: targetChapter,
      difficulty,
      questions: targetQuestions,
      currentIdx: 0,
      score: 0,
      timeLeft: getTimePerQuestion(difficulty),
      lastUpdated: Date.now(),
      wrongAnswers: 0,
      questionTimes: [],
      rapidClickCount: 0,
      shuffledIndices: generateShuffledIndices(targetQuestions)
    };
    setActiveSession(newSession);
    navigateTo('quiz');
  };

  const handleProgressUpdate = (idx: number, score: number, timeLeft: number) => {
    setActiveSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentIdx: idx,
        score: score,
        timeLeft: timeLeft,
        lastUpdated: Date.now()
      };
    });
  };

  /** Lesson quiz completion. totalPoints and history are for lesson quizzes only; Math Game (Number Chase) score is never added here. */
  const handleQuizFinish = async (score: number, wrongAnswers: number, questionTimes: number[], rapidClickCount: number) => {
    const total = (activeSession?.questions.length || redoQuestions.length || 5);
    setLastTotalQuestions(total);
    setLastScore(score);
    const today = new Date().toDateString();

    // PHASE 1 & 2: Anti-Cheat Validation using centralized utilities
    const validation = validateQuizResults(score, total, questionTimes);
    const finalPoints = calculateFinalPayout(score, wrongAnswers, total, questionTimes);

    if (user) {
      const statsRef = doc(db, 'users', user.id);
      let newStreak = stats.streak;
      if (stats.lastQuizDate !== today) {
        newStreak = stats.streak + 1;
      }

      const newResult: QuizResult = {
        score,
        totalQuestions: total,
        subject: activeSession?.subject || selectedSubject!,
        chapter: activeSession?.chapter.title || selectedChapter!.title,
        difficulty: activeSession?.difficulty || difficulty,
        dateTimePhnomPenh: formatPhnomPenhDateTime(Date.now()),
        wrongAnswers,
        averageTimePerQuestion: validation.averageTime,
        isValid: validation.isValid
      };

      const lastSeen = getLastSeenTracking();
      await updateDoc(statsRef, {
        totalPoints: increment(finalPoints),
        streak: newStreak,
        lastQuizDate: today,
        history: arrayUnion(newResult),
        ...lastSeen
      }).catch(async (err) => {
        // If document doesn't exist, create it
        if (err.code === 'not-found') {
          const now = Date.now();
          await setDoc(statsRef, {
            totalPoints: finalPoints,
            streak: newStreak,
            lastQuizDate: today,
            history: [newResult],
            email: user.email || null,
            displayName: user.displayName || null,
            provider: user.provider || null,
            photoURL: user.photoURL || null,
            createdAt: now,
            firstSeenAt: now,
            ...lastSeen
          });
        }
      });

      // Show validation feedback if quiz failed anti-cheat
      if (!validation.isValid && validation.failureReasons.length > 0) {
        alert(`❌ មិនទទួលបានរង្វាន់\n\n${validation.failureReasons.join('\n')}\n\nសូមព្យាយាមអានសំណួរឱ្យបានល្អិតល្អន់!`);
      }
    }

    // Keep history length capped at 20 in the UI (local state will be updated by onSnapshot)
    // The Firestore array can grow, or we can manage it. For now, union is fine.

    setActiveSession(null);
    navigateTo('result');
  };

  const reset = () => {
    setSelectedSubject(null);
    setSelectedUnitTitle('');
    setSelectedChapter(null);
    setActiveSession(null);
    setRedoQuestions([]);
    navigateTo('setup');
  };

  const handleClearHistory = useCallback(async () => {
    if (!user) return;
    const statsRef = doc(db, 'users', user.id);
    const clearedStats = {
      totalPoints: 0,
      streak: 0,
      lastQuizDate: null,
      history: [] as QuizResult[],
      ...getLastSeenTracking()
    };
    try {
      await updateDoc(statsRef, clearedStats);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === 'not-found') {
        const now = Date.now();
        await setDoc(statsRef, {
          ...clearedStats,
          email: user.email || null,
          displayName: user.displayName || null,
          provider: user.provider || null,
          photoURL: user.photoURL || null,
          createdAt: now,
          firstSeenAt: now
        });
      } else {
        throw err;
      }
    }
  }, [user]);

  const groupedChapters = selectedSubject ? (() => {
    const chapters = SUBJECTS_CONFIG[selectedSubject].chapters;
    const groups: { title: string; items: Chapter[] }[] = [];

    chapters.forEach(ch => {
      let unitTitle = "មេរៀនទូទៅ";
      let displayTitle = ch.title;

      // Handle "Chapter - Lesson" format (e.g. Moral/Civic, Chemistry, English)
      if (ch.title.includes(' - ')) {
        const parts = ch.title.split(' - ');
        unitTitle = parts[0].trim();
        displayTitle = parts[1].trim();
      } else {
        // Handle "Chapter-Lesson" format (e.g. Physics)
        const match = ch.title.match(/^(ជំពូកទី\s?(\d+|[១២៣៤៥៦៧៨៩០]+))([\-៖]\s?)(.*)/);
        if (match) {
          unitTitle = match[1].trim();
          displayTitle = match[4].trim();
        } else {
          // Fallback regex for other patterns
          const chapterMatch = ch.title.match(/^(ជំពូកទី\s?(\d+|[១២៣៤៥៦៧៨៩០]+)(៖\s?[^មេរៀន]+)?)/) ||
            ch.title.match(/^(ជំពូក\s?(\d+|[១២៣៤៥៦៧៨៩០]+)(៖\s?[^មេរៀន]+)?)/) ||
            ch.title.match(/^(Chapter\s?\d+)/i);
          if (chapterMatch) {
            unitTitle = chapterMatch[1].trim();
            // Optional: further cleanup displayTitle if starts with unitTitle
          }
        }
      }

      // Remove the previous cleanup lines that stripped "មេរៀន" and "Unit"
      const item: Chapter = {
        id: ch.id,
        title: ch.title, // Keep original title for AI/DB logic
        displayTitle: displayTitle || ch.title,
        summary: ch.summary
      };

      const existingGroup = groups.find(g => g.title.toLowerCase() === unitTitle.toLowerCase());
      if (existingGroup) existingGroup.items.push(item);
      else groups.push({ title: unitTitle, items: [item] });
    });
    return groups;
  })() : [];

  const currentUnit = groupedChapters.find(g => g.title === selectedUnitTitle) || (groupedChapters.length > 0 ? groupedChapters[0] : null);

  useEffect(() => {
    if (selectedSubject && groupedChapters.length > 0 && !groupedChapters.some(g => g.title === selectedUnitTitle)) {
      setSelectedUnitTitle(groupedChapters[0].title);
    }
  }, [selectedSubject, groupedChapters, selectedUnitTitle]);

  useEffect(() => {
    if (step === 'loading') {
      const interval = setInterval(() => setLoadingMessageIdx(prev => (prev + 1) % loadingMessages.length), 2500);
      return () => clearInterval(interval);
    }
  }, [step]);

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Layout
      stats={stats}
      user={user}
      onLogoClick={reset}
      onAuthClick={() => setIsAuthOpen(true)}
      onDashboardClick={() => navigateTo('dashboard')}
      hideFooter={step === 'loading' || step === 'quiz'}
    >
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onUserUpdate={(updatedUser) => setUser(updatedUser)}
      />

      {step === 'setup' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">


          <section>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2 khmer-font">សួស្តី {user ? user.displayName.split(' ')[0] : 'មិត្តអ្នករៀន'}! 👋</h2>
            <p className="text-slate-500 text-lg mb-8 khmer-font">ជ្រើសរើសមុខវិជ្ជា និងមេរៀន ដើម្បីចាប់ផ្តើមបង្កើតលំហាត់ដោយ Ai ។</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(Object.values(Subject) as Subject[]).filter(sub => sub !== Subject.Python || user?.email === 'binglomole@gmail.com').map(sub => (
                <SubjectCard
                  key={sub}
                  subject={sub}
                  isSelected={selectedSubject === sub}
                  onClick={() => {
                    setSelectedSubject(sub);
                    setSelectedUnitTitle('');
                    setSelectedChapter(null);
                  }}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  setSelectedSubject(null);
                  setSelectedUnitTitle('');
                  setSelectedChapter(null);
                  trackMathGameVisit();
                  navigateTo('math-game');
                }}
                className="relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-200 border-2 border-slate-100 text-center group bg-white text-slate-600 hover:border-indigo-200 hover:shadow-lg"
              >
                <span className="text-4xl mb-3 block transform group-hover:scale-110 transition-transform">🎯</span>
                <span className="khmer-font font-semibold text-lg text-slate-800">ល្បែងគណិត</span>
              </button>
            </div>
          </section>

          {selectedSubject && (
            <section className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100 animate-in zoom-in-95 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="khmer-font text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <span className="bg-indigo-100 p-1.5 rounded-lg">🏷️</span> ជ្រើសរើសជំពូក
                    </h3>
                    <div className="relative">
                      <select
                        value={selectedUnitTitle}
                        onChange={(e) => { setSelectedUnitTitle(e.target.value); setSelectedChapter(null); }}
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl khmer-font text-slate-700 font-semibold appearance-none focus:border-indigo-500 outline-none transition-all pr-12 shadow-sm"
                      >
                        {groupedChapters.map(group => (
                          <option key={group.title} value={group.title}>{group.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col h-full">
                  <h3 className="khmer-font text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="bg-indigo-100 p-1.5 rounded-lg">📚</span> ជ្រើសរើសមេរៀន
                  </h3>
                  <div className="flex-1 space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar bg-slate-50/50 p-3 rounded-2xl border border-slate-100 mb-6">
                    {currentUnit?.items.map(chapter => (
                      <button
                        key={chapter.id}
                        onClick={() => setSelectedChapter(chapter)}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all khmer-font text-base flex items-center gap-4 ${selectedChapter?.id === chapter.id
                          ? 'border-indigo-500 bg-white text-indigo-700 font-bold shadow-md scale-[1.01]'
                          : 'border-white hover:border-indigo-100 text-slate-600 bg-white/80'
                          }`}
                      >
                        <span className="flex-1 line-clamp-2 leading-snug">{chapter.displayTitle}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-end gap-6 mt-10 pt-8 border-t border-slate-100">
                <div className="flex-1 w-full">
                  <h3 className="khmer-font text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><span className="bg-indigo-100 p-1.5 rounded-lg">🔥</span> កម្រិតពិបាក</h3>
                  <div className="flex gap-2">
                    {Object.values(Difficulty).map(d => (
                      <button key={d} onClick={() => setDifficulty(d)} className={`flex-1 py-3.5 px-2 rounded-xl border-2 khmer-font text-xs md:text-sm font-bold transition-all ${difficulty === d ? 'bg-slate-800 border-slate-800 text-white shadow-lg scale-[1.02]' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-[1.4] w-full">
                  <button
                    disabled={!selectedChapter || isLoading}
                    onClick={handleStartQuiz}
                    className="group relative w-full py-5 bg-indigo-600 text-white text-xl font-bold rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 overflow-hidden active:scale-[0.99]"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <span className="khmer-font">ចាប់ផ្ដើមបង្កើតលំហាត់</span>
                      <svg className="w-6 h-6 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {step === 'dashboard' && user && (
        <UserDashboard
          user={user}
          stats={stats}
          onUpdateProfile={(name) => setUser({ ...user, displayName: name })}
          onClearHistory={handleClearHistory}
        />
      )}

      {step === 'loading' && (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-12 py-12 animate-in fade-in duration-500">
          <div className="relative">
            <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center animate-bounce duration-[1500ms]"><span className="text-6xl">🧠</span></div>
            <div className="absolute -inset-4 border-4 border-dashed border-indigo-200 rounded-full animate-spin duration-[10s]"></div>
          </div>
          <div className="text-center space-y-4 max-w-sm">
            <h2 className="text-2xl font-black text-slate-800 khmer-font animate-pulse">{loadingMessages[loadingMessageIdx]}</h2>
            <div className="flex justify-center gap-1">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      )}

      {step === 'quiz' && (activeSession || redoQuestions.length > 0) && (
        <QuizPlayer
          questions={activeSession?.questions || redoQuestions}
          initialIdx={activeSession?.currentIdx || 0}
          initialScore={activeSession?.score || 0}
          initialTime={activeSession?.timeLeft ?? getTimePerQuestion(activeSession?.difficulty ?? difficulty)}
          timePerQuestion={getTimePerQuestion(activeSession?.difficulty ?? difficulty)}
          onFinish={handleQuizFinish}
          onProgressUpdate={handleProgressUpdate}
          initialShuffledIndices={activeSession?.shuffledIndices}
          initialWrongAnswers={activeSession?.wrongAnswers || 0}
          initialQuestionTimes={activeSession?.questionTimes || []}
          initialRapidClickCount={activeSession?.rapidClickCount || 0}
        />
      )}

      {step === 'result' && (
        <div className="max-w-md mx-auto text-center space-y-4 animate-in fade-in zoom-in-95 duration-500 py-0">
          <div className="relative">
            {/* Decorative background pulse for high scores */}
            {lastScore / lastTotalQuestions >= 0.8 && (
              <div className="absolute inset-0 bg-indigo-400/20 rounded-full blur-3xl animate-pulse scale-110"></div>
            )}

            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              {/* SVG Progress Circle */}
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="45"
                  className="stroke-slate-100 fill-white"
                  strokeWidth="8"
                />
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  className={`${lastScore / lastTotalQuestions >= 0.8 ? 'stroke-indigo-600' : lastScore / lastTotalQuestions >= 0.5 ? 'stroke-amber-500' : 'stroke-rose-500'} transition-all duration-1000 ease-out`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="282.7"
                  strokeDashoffset={282.7 - (282.7 * (lastScore / lastTotalQuestions))}
                />
              </svg>

              <div className="absolute flex flex-col items-center">
                <span className={`text-5xl font-black leading-none ${lastScore / lastTotalQuestions >= 0.8 ? 'text-indigo-600' : lastScore / lastTotalQuestions >= 0.5 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {lastScore}
                </span>
                <span className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                  ពិន្ទុសរុប {lastTotalQuestions}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-800 khmer-font">
              {lastScore / lastTotalQuestions === 1 ? 'អស្ចារ្យណាស់! ✨' :
                lastScore / lastTotalQuestions >= 0.8 ? 'ល្អណាស់! 🌟' :
                  lastScore / lastTotalQuestions >= 0.5 ? 'ល្អគួរសម! 👍' : 'មិនអីទេ ព្យាយាមបន្ត! 💪'}
            </h2>
            <p className="text-sm text-slate-500 font-medium khmer-font">
              {lastScore / lastTotalQuestions === 1 ? 'អ្នកធ្វើបានល្អឥតខ្ចោះ គ្រប់សំណួរទាំងអស់!' :
                lastScore / lastTotalQuestions >= 0.8 ? 'អ្នកយល់ដឹងច្រើនលើមេរៀននេះ!' :
                  lastScore / lastTotalQuestions >= 0.5 ? 'អ្នកធ្វើបានល្អ ប៉ុន្តែនៅមានចំនុចត្រូវរៀនបន្ថែម។' : 'កុំបោះបង់! ការព្យាយាមគង់បានសម្រេច។'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 text-center">
              <div className="w-9 h-9 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-lg mb-2 mx-auto">📚</div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 khmer-font">មុខវិជ្ជា</p>
              <p className="font-bold text-slate-800 khmer-font line-clamp-1 text-sm">{activeSession?.subject || selectedSubject}</p>
            </div>

            <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 text-center">
              <div className="w-9 h-9 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-lg mb-2 mx-auto">🔥</div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 khmer-font">កម្រិត</p>
              <p className="font-bold text-slate-800 khmer-font text-sm">{activeSession?.difficulty || difficulty}</p>
            </div>

            <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 text-center">
              <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-lg mb-2 mx-auto khmer-font font-bold">៛</div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 khmer-font">រង្វាន់</p>
              <p className="font-bold text-emerald-600 text-sm">+{(lastScore * 250).toLocaleString()} ៛</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-0">
            <button
              onClick={handleRedoQuiz}
              className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all khmer-font active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              សាកល្បងម្ដងទៀត
            </button>
            <button
              onClick={reset}
              className="w-full py-3 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all khmer-font active:scale-95"
            >
              ត្រឡប់ទៅដើម
            </button>
          </div>
        </div>
      )}

      {step === 'math-game' && <NumberChase onBack={() => navigateTo('setup')} />}
    </Layout>
  );
};

export default App;
