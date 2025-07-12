import React from 'react';
import { nootropicsData } from '../../data/nootropics';
import type { Nootropic } from '../../data/nootropics';

const NootropicsLibrary: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-branding-orange mb-6">Nootropics Library</h2>
      <p className="mb-8 text-gray-700 text-lg max-w-2xl">Explore a comprehensive library of nootropics and cognitive enhancers.</p>
      <div className="grid gap-8 md:grid-cols-2">
        {nootropicsData.map((item: Nootropic) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-light hover:shadow-2xl transition-shadow duration-200"
          >
            <div>
              <h3 className="text-xl font-bold text-branding-orange mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
              <p className="text-gray-700 mb-4">{item.description}</p>
            </div>
            <button
              className="mt-auto self-start px-5 py-2 bg-branding-orange text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition-colors duration-200"
            >
              Learn More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NootropicsLibrary; 