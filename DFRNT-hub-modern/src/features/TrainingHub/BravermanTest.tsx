import React, { useState } from 'react';

const BravermanTest: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  // Placeholder for quiz state

  if (!started) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-bold text-branding-orange mb-4">Braverman Test</h2>
        <p className="mb-6 text-gray-700 text-center">Discover your neurotransmitter dominance and get personalized recommendations to optimize your productivity and well-being.</p>
        <button
          className="px-6 py-3 bg-branding-orange text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition-colors duration-200 text-lg"
          onClick={() => setStarted(true)}
        >
          Start Test
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-bold text-branding-orange mb-4">Your Results</h2>
        <p className="mb-6 text-gray-700 text-center">(Results and recommendations will appear here.)</p>
        <button
          className="px-6 py-2 bg-gray-light text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition-colors duration-200"
          onClick={() => { setStarted(false); setFinished(false); }}
        >
          Retake Test
        </button>
      </div>
    );
  }

  // Placeholder for quiz questions
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-bold text-branding-orange mb-4">Braverman Test (In Progress)</h2>
      <p className="mb-6 text-gray-700 text-center">(Quiz questions will appear here.)</p>
      <button
        className="px-6 py-2 bg-branding-orange text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition-colors duration-200"
        onClick={() => setFinished(true)}
      >
        Finish Test
      </button>
    </div>
  );
};

export default BravermanTest; 