import React, { useState } from "react";
import BravermanTest from "./BravermanTest";

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
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold text-lg mb-2 text-branding-orange">Braverman Test</h3>
          <p className="text-gray-500 mb-2">Discover your neurotransmitter dominance and get personalized recommendations.</p>
          <button className="bg-branding-orange text-white px-4 py-2 rounded hover:bg-orange-700" onClick={() => setShowBraverman(true)}>
            Start Test
          </button>
        </div>
        {/* Cognitive Games Card */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold text-lg mb-2 text-branding-orange">Cognitive Games</h3>
          <p className="text-gray-500 mb-2">Sharpen your mind with scientifically designed games.</p>
          <button className="bg-branding-orange text-white px-4 py-2 rounded hover:bg-orange-700" disabled>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingHub; 