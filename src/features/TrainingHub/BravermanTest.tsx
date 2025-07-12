import React, { useState } from 'react';

const gradientBtn = "bg-gradient-to-r from-black via-[#C10801] via-60% to-[#F16001] text-white hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-branding-orange transition-all duration-200";

const BravermanTest: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  // Placeholder for quiz state

  if (!started) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto flex flex-col items-center animate-fade-in">
        <h2 className="text-2xl font-bold text-branding-orange mb-4">Braverman Test</h2>
        <p className="mb-6 text-gray-700 text-center">Discover your neurotransmitter dominance and get personalized recommendations to optimize your productivity and well-being.</p>
        <button
          className={gradientBtn + " px-6 py-3 rounded-lg text-lg mt-2"}
          onClick={() => setStarted(true)}
        >
          Start Test
        </button>
        <style>{`
          @keyframes fade-in { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: none; } }
          .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
        `}</style>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto flex flex-col items-center animate-fade-in">
        <h2 className="text-2xl font-bold text-branding-orange mb-4">Your Results</h2>
        <p className="mb-6 text-gray-700 text-center">(Results and recommendations will appear here.)</p>
        <button
          className={gradientBtn + " px-6 py-2 rounded-lg mt-2 opacity-80"}
          onClick={() => { setStarted(false); setFinished(false); }}
        >
          Retake Test
        </button>
      </div>
    );
  }

  // Placeholder for quiz questions
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto flex flex-col items-center animate-fade-in">
      <h2 className="text-2xl font-bold text-branding-orange mb-4">Braverman Test (In Progress)</h2>
      <p className="mb-6 text-gray-700 text-center">(Quiz questions will appear here.)</p>
      <button
        className={gradientBtn + " px-6 py-2 rounded-lg mt-2"}
        onClick={() => setFinished(true)}
      >
        Finish Test
      </button>
    </div>
  );
};

export default BravermanTest; 