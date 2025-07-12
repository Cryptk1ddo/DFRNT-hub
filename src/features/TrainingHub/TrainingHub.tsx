import React, { useState } from "react";
import BravermanTest from "./BravermanTest";

const gradientBtn = "bg-gradient-to-r from-black via-[#C10801] via-60% to-[#F16001] text-white hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-branding-orange transition-all duration-200";

const TrainingHub: React.FC = () => {
  const [showBraverman, setShowBraverman] = useState(false);

  if (showBraverman) {
    return <BravermanTest />;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cognitive Training Hub</h2>
      <p className="mb-6 text-gray-600">
        Welcome to the Cognitive Training Hub! Here you can access neuroscience-based cognitive training programs to boost your productivity and mental performance.
      </p>
      <div className="grid gap-4">
        {/* Braverman Test Card */}
        <div className="bg-white rounded shadow p-4 animate-fade-in" style={{ animationDelay: '0ms' }}>
          <h3 className="font-semibold text-lg mb-2 text-branding-orange">Braverman Test</h3>
          <p className="text-gray-500 mb-2">Discover your neurotransmitter dominance and get personalized recommendations.</p>
          <button className={gradientBtn + " px-4 py-2 rounded mt-2"} onClick={() => setShowBraverman(true)}>
            Start Test
          </button>
        </div>
        {/* Cognitive Games Card */}
        <div className="bg-white rounded shadow p-4 animate-fade-in" style={{ animationDelay: '80ms' }}>
          <h3 className="font-semibold text-lg mb-2 text-branding-orange">Cognitive Games</h3>
          <p className="text-gray-500 mb-2">Sharpen your mind with scientifically designed games.</p>
          <button className={gradientBtn + " px-4 py-2 rounded mt-2 opacity-60 cursor-not-allowed"} disabled>
            Coming Soon
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
};

export default TrainingHub; 