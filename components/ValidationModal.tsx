import React from 'react';

interface ValidationModalProps {
    isOpen: boolean;
    onClose: () => void;
    failureReasons: string[];
}

const ValidationModal: React.FC<ValidationModalProps> = ({ isOpen, onClose, failureReasons }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header with gradient */}
                <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

                    <div className="relative flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl animate-bounce">
                            ❌
                        </div>
                        <div>
                            <h2 className="text-2xl font-black khmer-font">មិនទទួលបានរង្វាន់</h2>
                            <p className="text-rose-100 text-sm font-medium mt-1">Quiz Validation Failed</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="bg-rose-50 border-2 border-rose-100 rounded-2xl p-4">
                        <p className="text-sm font-bold text-rose-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            មូលហេតុ (Reasons)
                        </p>
                        <ul className="space-y-2">
                            {failureReasons.map((reason, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-rose-800 khmer-font text-base leading-relaxed"
                                >
                                    <span className="flex-shrink-0 w-6 h-6 bg-rose-200 rounded-full flex items-center justify-center text-rose-700 font-bold text-sm mt-0.5">
                                        {index + 1}
                                    </span>
                                    <span className="flex-1">{reason}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-indigo-50 border-2 border-indigo-100 rounded-2xl p-4">
                        <p className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            ការណែនាំ (Suggestion)
                        </p>
                        <p className="text-indigo-800 khmer-font text-base leading-relaxed">
                            សូមព្យាយាមអានសំណួរឱ្យបានល្អិតល្អន់! ការយល់ដឹងពិតប្រាកដគឺសំខាន់ជាងការឆ្លើយលឿន។
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 khmer-font text-lg"
                    >
                        យល់ព្រម (OK)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ValidationModal;
