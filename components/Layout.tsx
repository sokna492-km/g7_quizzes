
import React, { useState, useEffect } from 'react';
import { UserStats, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  stats: UserStats;
  user: User | null;
  onLogoClick?: () => void;
  onAuthClick?: () => void;
  onDashboardClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, stats, user, onLogoClick, onAuthClick, onDashboardClick }) => {


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-[60] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 hover:opacity-75 transition-opacity focus:outline-none group"
            aria-label="Go to home"
          >
            <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-200 group-active:scale-95 transition-transform">
              K7
            </div>
            <div className="hidden sm:block text-left">
              <h1 className="text-lg font-bold text-slate-800 leading-none">KhmerGrade7</h1>
              <span className="text-xs text-indigo-500 font-medium tracking-wide uppercase">AI Quiz Master</span>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-4">


            {user ? (
              <button
                onClick={onDashboardClick}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-full border border-slate-200 transition-all active:scale-95 group"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-transform">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-slate-700 khmer-font">{user.displayName.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="group px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold rounded-full shadow-lg shadow-indigo-200 hover:shadow-indigo-400/30 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2 khmer-font"
              >
                <svg className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>ចូលប្រើ</span>
              </button>
            )}

            {user && (
              <>
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                  <span className="text-xl">🔥</span>
                  <span className="font-bold text-amber-700">{stats.streak}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                  <span className="text-xl">⭐</span>
                  <span className="font-bold text-indigo-700">{stats.totalPoints}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 md:py-10 flex-grow w-full">
        {children}
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-100 bg-white/50">

        <p>© 2026 KhmerGrade7 AI - For a brighter future.</p>
      </footer>
    </div>
  );
};

export default Layout;
