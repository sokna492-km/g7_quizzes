
import React from 'react';
import { Subject } from '../types';
import { SUBJECTS_CONFIG } from '../constants';

interface SubjectCardProps {
  subject: Subject;
  isSelected: boolean;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, isSelected, onClick }) => {
  const config = SUBJECTS_CONFIG[subject];
  
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-200 border-2 text-center group ${
        isSelected 
          ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]' 
          : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:shadow-lg'
      }`}
    >
      <span className="text-4xl mb-3 block transform group-hover:scale-110 transition-transform">
        {config.icon}
      </span>
      <span className={`khmer-font font-semibold text-lg ${isSelected ? 'text-white' : 'text-slate-800'}`}>
        {subject}
      </span>
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default SubjectCard;
