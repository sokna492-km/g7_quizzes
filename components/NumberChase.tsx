import React, { useState, useEffect, useCallback } from 'react';

const ROUNDS_TOTAL = 10;
const TIME_PER_ROUND = 15;

interface RoundOption {
  expr: string;
  correct: boolean;
}

interface RoundData {
  target: number;
  numbers: number[];
  options: RoundOption[];
}

/** Safe eval: digits and ×, *, +, -, ÷, /, ^. Returns NaN if invalid. */
function evalExpr(expr: string): number {
  const s = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**').replace(/\s/g, '');
  if (!/^[\d+\-*/.()**]+$/.test(s)) return NaN;
  try {
    const v = Function(`"use strict"; return (${s})`)();
    return typeof v === 'number' && isFinite(v) ? v : NaN;
  } catch {
    return NaN;
  }
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

type Op = 'add' | 'sub' | 'mul' | 'div' | 'pow';

const OPS: Op[] = ['add', 'sub', 'mul', 'div', 'pow'];

function formatExpr(a: number, b: number, op: Op): string {
  switch (op) {
    case 'add': return `${a}+${b}`;
    case 'sub': return `${a}-${b}`;
    case 'mul': return `${a}×${b}`;
    case 'div': return `${a}÷${b}`;
    case 'pow': return `${a}^${b}`;
    default: return `${a}×${b}`;
  }
}

function applyOp(a: number, b: number, op: Op): number {
  switch (op) {
    case 'add': return a + b;
    case 'sub': return a - b;
    case 'mul': return a * b;
    case 'div': return b === 0 ? NaN : a / b;
    case 'pow': return a ** b;
    default: return a * b;
  }
}

function generateRound(): RoundData {
  const op = OPS[Math.floor(Math.random() * OPS.length)];
  let target: number;
  let a: number;
  let b: number;
  const pool = new Set<number>();

  switch (op) {
    case 'add':
      target = 8 + Math.floor(Math.random() * 35);
      a = 2 + Math.floor(Math.random() * Math.min(10, target - 4));
      b = target - a;
      if (b < 2) b = 2; a = target - b;
      pool.add(a).add(b);
      break;
    case 'sub':
      target = 2 + Math.floor(Math.random() * 12);
      b = 2 + Math.floor(Math.random() * 8);
      a = target + b;
      if (a > 24) a = 24; b = a - target;
      pool.add(a).add(b);
      break;
    case 'mul':
      target = 12 + Math.floor(Math.random() * 37);
      const factors: [number, number][] = [];
      for (let x = 2; x <= 12; x++) {
        if (target % x === 0) {
          const y = target / x;
          if (y >= 2 && y <= 12) factors.push([x, y]);
        }
      }
      [a, b] = factors.length > 0 ? factors[Math.floor(Math.random() * factors.length)] : [Math.max(2, Math.floor(target / 10)), Math.max(2, target % 10 || 2)];
      pool.add(a).add(b);
      break;
    case 'div':
      target = 2 + Math.floor(Math.random() * 8);
      b = 2 + Math.floor(Math.random() * 6);
      a = target * b;
      if (a > 72) a = 72; b = a / target;
      pool.add(a).add(b);
      break;
    case 'pow':
      const pairs: [number, number][] = [[2, 2], [2, 3], [2, 4], [3, 2], [3, 3], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2]];
      [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
      target = applyOp(a, b, 'pow');
      pool.add(a).add(b);
      break;
    default:
      target = 24; a = 6; b = 4;
      pool.add(a).add(b);
  }

  while (pool.size < 4) {
    pool.add(2 + Math.floor(Math.random() * 11));
  }
  const numbers = Array.from(pool);

  const correctExpr = formatExpr(a, b, op);
  const wrongOptions: string[] = [];
  const used = new Set<string>([correctExpr]);

  const addWrong = (expr: string) => {
    const val = evalExpr(expr);
    if (used.has(expr)) return;
    if (val !== target && Number.isInteger(val) && val >= 0 && val <= 200) {
      used.add(expr);
      wrongOptions.push(expr);
    }
  };

  for (const o of OPS) {
    for (let i = 0; i < numbers.length && wrongOptions.length < 3; i++) {
      for (let j = 0; j < numbers.length && wrongOptions.length < 3; j++) {
        if (i === j) continue;
        const x = numbers[i];
        const y = numbers[j];
        if (o === 'div' && y === 0) continue;
        if (o === 'pow' && (y > 4 || x > 9)) continue;
        const expr = formatExpr(x, y, o);
        addWrong(expr);
      }
    }
  }

  while (wrongOptions.length < 3) {
    const o = OPS[Math.floor(Math.random() * OPS.length)];
    const x = 2 + Math.floor(Math.random() * 11);
    let y = 2 + Math.floor(Math.random() * 11);
    if (o === 'div' && y === 0) y = 2;
    if (o === 'pow') y = 2 + Math.floor(Math.random() * 2);
    const expr = formatExpr(x, y, o);
    addWrong(expr);
  }

  const options: RoundOption[] = [
    { expr: correctExpr, correct: true },
    ...wrongOptions.slice(0, 3).map(expr => ({ expr, correct: false })),
  ];
  return {
    target,
    numbers,
    options: shuffle(options),
  };
}

interface NumberChaseProps {
  onBack: () => void;
}

const NumberChase: React.FC<NumberChaseProps> = ({ onBack }) => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_ROUND);
  const [roundData, setRoundData] = useState<RoundData | null>(() => generateRound());
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'timeup' | null>(null);

  const isGameOver = round >= ROUNDS_TOTAL;
  const isResults = isGameOver && roundData === null;

  const startNewGame = useCallback(() => {
    setRound(0);
    setScore(0);
    setTimeLeft(TIME_PER_ROUND);
    setRoundData(generateRound());
    setIsAnswered(false);
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (!isGameOver && roundData === null && !isResults) {
      setRoundData(generateRound());
      setTimeLeft(TIME_PER_ROUND);
      setIsAnswered(false);
      setFeedback(null);
    }
  }, [round, isGameOver, isResults]);

  useEffect(() => {
    if (isAnswered || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(t);
  }, [timeLeft, isAnswered]);

  useEffect(() => {
    if (timeLeft > 0 || !roundData) return;
    if (isAnswered) return;
    setFeedback('timeup');
    setIsAnswered(true);
    setTimeout(() => advanceRound(), 1500);
  }, [timeLeft, isAnswered, roundData]);

  const advanceRound = () => {
    if (round + 1 >= ROUNDS_TOTAL) {
      setRoundData(null);
      setRound(ROUNDS_TOTAL);
    } else {
      setRound(r => r + 1);
      setRoundData(generateRound());
      setTimeLeft(TIME_PER_ROUND);
      setIsAnswered(false);
      setFeedback(null);
    }
  };

  const handleChoice = (opt: RoundOption) => {
    if (isAnswered) return;
    setIsAnswered(true);
    if (opt.correct) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    setTimeout(advanceRound, 1500);
  };

  if (isResults) {
    const pct = (score / ROUNDS_TOTAL) * 100;
    const message = pct >= 80 ? 'អស្ចារ្យណាស់!' : pct >= 50 ? 'ល្អណាស់!' : 'ព្យាយាមម្តងទៀត!';
    return (
      <div className="max-w-lg mx-auto p-6 md:p-10 bg-white rounded-3xl shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
        <h2 className="khmer-font text-2xl font-bold text-slate-800 mb-2">ល្បែងគណិត - Number Chase</h2>
        <p className="khmer-font text-slate-500 mb-8">លទ្ធផល</p>
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-indigo-100 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-indigo-600 khmer-font">{score}/{ROUNDS_TOTAL}</span>
            <span className="text-sm text-slate-500 khmer-font">ពិន្ទុ</span>
          </div>
        </div>
        <p className="khmer-font text-xl font-semibold text-slate-700 text-center mb-8">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={startNewGame}
            className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold khmer-font hover:bg-indigo-700 transition-all"
          >
            លេងម្តងទៀត
          </button>
          <button
            onClick={onBack}
            className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold khmer-font hover:border-indigo-200 hover:bg-slate-50 transition-all"
          >
            ត្រលប់ទៅផ្ទះ
          </button>
        </div>
      </div>
    );
  }

  if (!roundData) {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
        <p className="khmer-font text-slate-500 mt-4">កំពុងរៀបចំ...</p>
      </div>
    );
  }

  const progress = (timeLeft / TIME_PER_ROUND) * 100;

  return (
    <div className="max-w-lg mx-auto p-4 md:p-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-slate-500 hover:text-slate-700 khmer-font text-sm font-medium flex items-center gap-1"
          aria-label="Back to home"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ត្រលប់
        </button>
        <div className="flex items-center gap-4">
          <span className="khmer-font text-slate-500 text-sm">ពិន្ទុ <strong className="text-slate-800">{score}</strong></span>
          <span className="khmer-font text-slate-500 text-sm" aria-live="polite">ជុំ {round + 1}/{ROUNDS_TOTAL}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
        <h1 className="khmer-font text-xl font-bold text-slate-800 text-center mb-2">ល្បែងគណិត - Number Chase</h1>
        <p className="khmer-font text-slate-500 text-center text-sm mb-6">រកចម្លើយដែលស្មើនឹងចំនួនគោលដៅ</p>

        <div className="text-center mb-6">
          <span className="text-slate-400 khmer-font text-sm">ចំនួនគោលដៅ</span>
          <p className="text-5xl font-black text-indigo-600 khmer-font mt-1" aria-label={`Target ${roundData.target}`}>{roundData.target}</p>
        </div>

        <div className="flex justify-center gap-2 flex-wrap mb-6">
          {roundData.numbers.map((n, i) => (
            <span key={i} className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-bold khmer-font">
              {n}
            </span>
          ))}
        </div>

        <div className="mb-6">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs text-slate-400 mt-1 khmer-font">{timeLeft} វិនាទី</p>
        </div>

        {feedback && (
          <div
            className={`mb-4 py-3 rounded-xl text-center font-bold khmer-font ${
              feedback === 'correct' ? 'bg-emerald-100 text-emerald-700' :
              feedback === 'wrong' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            {feedback === 'correct' && 'រកឃើញហើយ! Got it!'}
            {feedback === 'wrong' && 'អត់ទេ! Nope!'}
            {feedback === 'timeup' && "Time's up! អស់ពេលហើយ!"}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {roundData.options.map((opt, idx) => {
            let btnClass = 'py-4 rounded-2xl border-2 font-bold khmer-font transition-all ';
            if (isAnswered) {
              if (opt.correct) btnClass += 'border-emerald-500 bg-emerald-50 text-emerald-700';
              else if (feedback === 'wrong') btnClass += 'border-slate-100 bg-slate-50 text-slate-400';
              else btnClass += 'border-slate-100 bg-white text-slate-600';
            } else {
              btnClass += 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 active:scale-[0.98]';
            }
            return (
              <button
                key={idx}
                onClick={() => handleChoice(opt)}
                disabled={isAnswered}
                className={btnClass}
                aria-pressed={isAnswered && opt.correct}
              >
                {opt.expr}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NumberChase;
