
// Import React to resolve namespace issues for React.FC in TypeScript
import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';
import {
  shuffleArray,
  isRapidClick,
  VALIDATION_THRESHOLDS
} from '../utils/antiCheatUtils';

interface QuizPlayerProps {
  questions: Question[];
  initialIdx?: number;
  initialScore?: number;
  initialTime?: number;
  /** Max seconds per question (used for countdown and next-question reset). Default 30. */
  timePerQuestion?: number;
  onFinish: (score: number, wrongAnswers: number, questionTimes: number[], rapidClickCount: number) => void;
  onProgressUpdate: (idx: number, score: number, timeLeft: number) => void;
  initialShuffledIndices?: number[][];
  initialWrongAnswers?: number;
  initialQuestionTimes?: number[];
  initialRapidClickCount?: number;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({
  questions,
  initialIdx = 0,
  initialScore = 0,
  initialTime = 30,
  timePerQuestion = 30,
  onFinish,
  onProgressUpdate,
  initialShuffledIndices,
  initialWrongAnswers = 0,
  initialQuestionTimes = [],
  initialRapidClickCount = 0
}) => {
  const [currentIdx, setCurrentIdx] = useState(initialIdx);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(initialScore);
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Anti-cheat state
  const [wrongAnswers, setWrongAnswers] = useState(initialWrongAnswers);
  const [questionTimes, setQuestionTimes] = useState<number[]>(initialQuestionTimes);
  const [rapidClickCount, setRapidClickCount] = useState(initialRapidClickCount);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showNextButton, setShowNextButton] = useState(false);

  // Generate shuffled indices for all questions on mount (or use initial)
  const [shuffledIndices] = useState<number[][]>(() => {
    if (initialShuffledIndices && initialShuffledIndices.length === questions.length) {
      return initialShuffledIndices;
    }
    return questions.map(q => shuffleArray([...Array(q.options.length).keys()]));
  });

  const [inputValue, setInputValue] = useState('');
  const [matchingSelections, setMatchingSelections] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentIdx];
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Helper to initialize AudioContext on first user interaction
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Synthesized sound effects (correct/incorrect only)
  const playSound = (type: 'correct' | 'incorrect') => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.linearRampToValueAtTime(110, now + 0.2); // A2
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  };

  // Store current state in a ref to allow the stable 30s interval to access latest values
  const stateRef = useRef({ currentIdx, score, timeLeft });
  useEffect(() => {
    stateRef.current = { currentIdx, score, timeLeft };
  }, [currentIdx, score, timeLeft]);

  // Periodic Auto-save effect (exactly every 30 seconds) — silent, no toast/sound
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      const { currentIdx, score, timeLeft } = stateRef.current;
      onProgressUpdate(currentIdx, score, timeLeft);
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [onProgressUpdate]);

  // Countdown timer effect
  useEffect(() => {
    if (isAnswered) return;
    if (timeLeft <= 0) {
      handleAnswer(-1); // Timeout
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  // Handle user answer selection (Syncs immediately on interaction)
  const handleAnswer = (idx: number, textValue?: string) => {
    if (isAnswered) return;
    initAudio(); // Ensure audio context is ready

    // Calculate time spent on this question
    const timeSpent = (Date.now() - questionStartTime) / 1000; // in seconds
    const newQuestionTimes = [...questionTimes, timeSpent];
    setQuestionTimes(newQuestionTimes);

    // Detect rapid clicking using utility function
    let newRapidClickCount = rapidClickCount;
    if (isRapidClick(timeSpent)) {
      newRapidClickCount = rapidClickCount + 1;
      setRapidClickCount(newRapidClickCount);
    }

    let isCorrect = false;
    if (currentQuestion.type === 'FillInTheBlank') {
      const finalInput = textValue ?? inputValue;
      isCorrect = (finalInput?.trim() === currentQuestion.correctAnswerValue?.trim());
      setSelectedIdx(null);
    } else if (currentQuestion.type === 'Matching') {
      // Check if all pairs match exactly
      isCorrect = currentQuestion.matchingPairs?.every((pair, i) =>
        matchingSelections[i] === pair.right
      ) || false;
      setSelectedIdx(null);
    } else {
      // Map shuffled index back to original index
      if (idx === -1) {
        isCorrect = false;
      } else {
        const originalIdx = shuffledIndices[currentIdx][idx];
        setSelectedIdx(idx); // Store the displayed index for UI
        isCorrect = originalIdx === currentQuestion.correctAnswerIndex;
      }
    }

    setIsAnswered(true);
    const newScore = isCorrect ? score + 1 : score;
    const newWrongAnswers = isCorrect ? wrongAnswers : wrongAnswers + 1;

    if (isCorrect) {
      setScore(newScore);
      playSound('correct');
    } else {
      setWrongAnswers(newWrongAnswers);
      playSound('incorrect');
    }

    // Delay showing Next button (anti-rapid-click)
    setShowNextButton(false);
    setTimeout(() => setShowNextButton(true), VALIDATION_THRESHOLDS.NEXT_BUTTON_DELAY);

    // Critical update: sync state immediately when user makes a choice
    onProgressUpdate(currentIdx, newScore, timeLeft);
  };

  // Move to the next question (Syncs immediately)
  const nextQuestion = () => {
    initAudio();
    if (currentIdx + 1 < questions.length) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setSelectedIdx(null);
      setInputValue('');
      setMatchingSelections({});
      setIsAnswered(false);
      setShowNextButton(false);
      const nextTime = timePerQuestion;
      setTimeLeft(nextTime);
      setQuestionStartTime(Date.now()); // Reset timer for next question
      onProgressUpdate(nextIdx, score, nextTime);
    } else {
      // Quiz finished - pass anti-cheat data
      onFinish(score, wrongAnswers, questionTimes, rapidClickCount);
    }
  };

  const progress = ((currentIdx + 1) / (questions.length || 1)) * 100;

  // Timer Circle Calculation (based on timePerQuestion)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / timePerQuestion) * circumference;

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center bg-white rounded-3xl shadow-xl border border-slate-100">
        <p className="khmer-font text-lg text-slate-500">កំពុងរៀបចំសំណួរ...</p>
      </div>
    );
  }

  const isSelectedCorrect = currentQuestion.type === 'FillInTheBlank'
    ? (inputValue.trim() === currentQuestion.correctAnswerValue?.trim())
    : currentQuestion.type === 'Matching'
      ? currentQuestion.matchingPairs?.every((pair, i) => matchingSelections[i] === pair.right)
      : (selectedIdx !== null && shuffledIndices[currentIdx][selectedIdx] === currentQuestion.correctAnswerIndex);

  return (
    <div className="max-w-2xl mx-auto px-2 relative" onClick={initAudio}>
      {/* Header Info: Progress and Timer */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-3">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest khmer-font mb-1">
              សមិទ្ធផលបច្ចុប្បន្ន
            </span>
            <span className="text-lg font-extrabold text-slate-700 khmer-font">
              សំណួរ {currentIdx + 1} <span className="text-slate-300 font-normal">/</span> {questions.length}
            </span>
            <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit mt-1 uppercase ${currentQuestion.type === 'FillInTheBlank' ? 'bg-amber-100 text-amber-700' :
              currentQuestion.type === 'TrueFalse' ? 'bg-blue-100 text-blue-700' :
                currentQuestion.type === 'Matching' ? 'bg-purple-100 text-purple-700' :
                  'bg-slate-100 text-slate-600'
              }`}>
              {currentQuestion.type}
            </div>
          </div>

          {/* Circular Countdown Timer */}
          <div className="w-14 h-14 relative flex items-center justify-center">
            <svg className="w-14 h-14" viewBox="0 0 56 56">
              {/* Background Circle */}
              <circle
                cx="28"
                cy="28"
                r={radius}
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-slate-200"
              />
              {/* Progress Circle (Rotated -90deg via class) */}
              <circle
                cx="28"
                cy="28"
                r={radius}
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={circumference}
                style={{
                  strokeDashoffset: isAnswered ? 0 : strokeDashoffset,
                  transition: 'stroke-dashoffset 1s linear, color 0.3s'
                }}
                strokeLinecap="round"
                className={`-rotate-90 origin-center transform ${timeLeft < 10 ? 'text-rose-500' : 'text-indigo-500'}`}
              />
              {/* Timer Text (Perfectly centered using SVG attributes) */}
              <text
                x="28"
                y="28"
                textAnchor="middle"
                dominantBaseline="central"
                className={`font-black text-sm transition-colors ${timeLeft < 10 ? 'fill-rose-600' : 'fill-indigo-600'}`}
              >
                {timeLeft}
              </text>
            </svg>
          </div>
        </div>
        <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-5 md:p-7 shadow-2xl border border-slate-100 transition-all">
        <h2 className="khmer-font text-xl md:text-2xl font-bold text-slate-800 mb-5 leading-relaxed">
          {currentQuestion.questionText}
        </h2>

        {currentQuestion.type === 'FillInTheBlank' ? (
          <div className="space-y-4">
            <input
              type="number"
              value={inputValue}
              disabled={isAnswered}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="បញ្ចូលលេខចម្លើយនៅទីនេះ..."
              className={`w-full p-6 text-center text-3xl font-black rounded-2xl border-4 transition-all outline-none ${isAnswered
                ? (isSelectedCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-rose-50 border-rose-500 text-rose-800')
                : 'bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white'
                }`}
            />
            {!isAnswered && (
              <button
                onClick={() => handleAnswer(0)}
                disabled={!inputValue.trim()}
                className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all khmer-font text-xl"
              >
                បញ្ជាក់ចម្លើយ
              </button>
            )}
            {isAnswered && !isSelectedCorrect && (
              <p className="text-center font-bold text-rose-600 khmer-font text-lg">
                ចម្លើយត្រឹមត្រូវគឺ៖ <span className="text-2xl font-black">{currentQuestion.correctAnswerValue}</span>
              </p>
            )}
          </div>
        ) : currentQuestion.type === 'Matching' ? (
          <div className="space-y-4">
            <p className="text-sm font-bold text-indigo-600 khmer-font mb-4">ភ្ជាប់ជួរខាងឆ្វេងជាមួយជួរខាងស្តាំ</p>
            {currentQuestion.matchingPairs?.map((pair, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl khmer-font text-sm md:text-base text-slate-700 font-bold shadow-sm">
                  {pair.left}
                </div>
                <span className="text-slate-300 font-bold">→</span>
                <div className="flex-1 relative">
                  <select
                    value={matchingSelections[i] || ''}
                    disabled={isAnswered}
                    onChange={(e) => setMatchingSelections(prev => ({ ...prev, [i]: e.target.value }))}
                    className={`w-full p-4 appearance-none rounded-2xl border-2 khmer-font text-sm md:text-base focus:outline-none transition-all pr-10 ${isAnswered
                        ? (matchingSelections[i] === pair.right ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-rose-50 border-rose-500 text-rose-800')
                        : 'bg-white border-slate-200 focus:border-indigo-500 shadow-sm text-slate-700'
                      }`}
                  >
                    <option value="">-- ជ្រើសរើស --</option>
                    {currentQuestion.options.map((opt, optIdx) => (
                      <option key={optIdx} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {!isAnswered && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {!isAnswered && (
              <button
                onClick={() => handleAnswer(0)}
                disabled={Object.keys(matchingSelections).length < (currentQuestion.matchingPairs?.length || 0)}
                className="w-full mt-6 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 disabled:opacity-50 transition-all khmer-font text-xl"
              >
                បញ្ជាក់ចម្លើយ
              </button>
            )}
          </div>
        ) : (
          <div className={`grid gap-3 ${currentQuestion.type === 'TrueFalse' ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {shuffledIndices[currentIdx].map((originalIdx, displayIdx) => {
              const option = currentQuestion.options[originalIdx];
              if (!option && currentQuestion.type !== 'TrueFalse') return null;

              let stateClass = "border-slate-100 bg-slate-50/50 hover:border-indigo-200 hover:bg-indigo-50/30 text-slate-700";

              if (isAnswered) {
                if (originalIdx === currentQuestion.correctAnswerIndex) {
                  stateClass = "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-md ring-4 ring-emerald-50";
                } else if (displayIdx === selectedIdx) {
                  stateClass = "bg-rose-50 border-rose-500 text-rose-800 shadow-md ring-4 ring-rose-50";
                } else {
                  stateClass = "opacity-40 border-slate-50 text-slate-400 grayscale-[0.5]";
                }
              }

              return (
                <button
                  key={displayIdx}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(displayIdx)}
                  className={`w-full p-3 md:p-4 text-left rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 group active:scale-[0.98] ${stateClass}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black flex-shrink-0 transition-all ${isAnswered && originalIdx === currentQuestion.correctAnswerIndex
                    ? 'bg-emerald-500 text-white rotate-6'
                    : isAnswered && displayIdx === selectedIdx
                      ? 'bg-rose-500 text-white -rotate-6'
                      : 'bg-white text-slate-400 group-hover:bg-indigo-600 group-hover:text-white shadow-sm'
                    }`}>
                    {String.fromCharCode(64 + (displayIdx + 1))}
                  </div>
                  <span className="khmer-font text-base md:text-lg font-semibold flex-1 break-words">
                    {String(option || '').trim() || '...'}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {isAnswered && (
          <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className={`p-4 rounded-3xl mb-4 border-2 ${isSelectedCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-100' : 'bg-rose-50 text-rose-900 border-rose-100'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm bg-white`}>
                  {isSelectedCorrect ? '✨' : '🧐'}
                </div>
                <h4 className="font-bold khmer-font text-xl">
                  {isSelectedCorrect ? 'ចម្លើយត្រឹមត្រូវ!' : 'មិនអីទេ ព្យាយាមម្តងទៀត!'}
                </h4>
              </div>

              <div className="space-y-2 bg-white/50 p-3 rounded-xl border border-white/80">
                <p className="font-bold khmer-font text-slate-500 text-xs uppercase tracking-widest mb-1">ការពន្យល់បន្ថែម</p>
                <p className="khmer-font leading-relaxed text-lg">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>

            {showNextButton ? (
              <button
                onClick={nextQuestion}
                className="group relative w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-700 transition-all active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 khmer-font text-xl flex items-center justify-center gap-2">
                  សំណួរបន្ទាប់
                  <svg className="w-6 h-6 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            ) : (
              <div className="w-full py-4 bg-slate-200 text-slate-500 font-bold rounded-2xl text-center khmer-font text-lg">
                សូមរង់ចាំ... ⏳
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPlayer;
