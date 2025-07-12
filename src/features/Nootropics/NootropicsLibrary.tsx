import React from 'react';
import { nootropicsData } from '../../data/nootropics';
import type { Nootropic } from '../../data/nootropics';

const NootropicsLibrary: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-branding-orange mb-6">Nootropics Library</h2>
      <p className="mb-8 text-gray-700 text-lg max-w-2xl">Explore a comprehensive library of nootropics and cognitive enhancers.</p>
      <div className="grid gap-8 md:grid-cols-2">
        {nootropicsData.map((item: Nootropic, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-light hover:shadow-2xl transition-shadow duration-200 animate-fade-in"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div>
              <h3 className="text-xl font-bold text-branding-orange mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
              <p className="text-gray-700 mb-4">{item.description}</p>
            </div>
            <button
              className="mt-auto self-start px-5 py-2 font-semibold rounded-lg shadow transition-all duration-200 bg-gradient-to-r from-black via-[#C10801] via-60% to-[#F16001] text-white hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-branding-orange"
              style={{ background: 'linear-gradient(90deg, #000000 0%, #C10801 40%, #F16001 80%, #D9C3AB 100%)' }}
            >
              Learn More →
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
};

export default NootropicsLibrary; 