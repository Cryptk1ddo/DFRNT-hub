import React, { useState } from 'react';
import NootropicsLibrary from './features/Nootropics/NootropicsLibrary';
import PomodoroTimer from './features/Pomodoro/PomodoroTimer';
import TrainingHub from './features/TrainingHub/TrainingHub';
import BinauralBeats from './features/BinauralBeats/BinauralBeats';
import { UserProvider, useTelegramAuth } from './context/UserContext';

const NAV = [
  { key: 'nootropics', label: 'Nootropics', icon: '🧠' },
  { key: 'pomodoro', label: 'Pomodoro', icon: '⏰' },
  { key: 'binaural', label: 'Binaural Beats', icon: '🎵' },
  { key: 'training', label: 'Training', icon: '🎯' },
];

function App() {
  const [view, setView] = useState('nootropics');
  const [showLanding, setShowLanding] = useState(true);

  useTelegramAuth();

  if (showLanding) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <main className="hero flex-1 flex flex-col items-center justify-center min-h-[80vh] p-4 text-center animate-fadeIn">
          <div className="logotype mb-6">DFRNT Tools</div>
          <h1 className="title mb-4">DFRNT Productivity Hub</h1>
          <p className="subtitle mb-8">
            Neuroscience-based productivity tools: Nootropics Navigator, Binaural Beats Generator, Pomodoro Timer, and Cognitive Training Programs.<br />
            <span style={{ color: '#D9C3AB' }}>Unlock your brain’s full potential.</span>
          </p>
          <button
            className="cta-btn"
            tabIndex={0}
            onClick={() => setShowLanding(false)}
          >
            Launch App
          </button>
        </main>
        <footer className="footer text-center text-gray-400 py-6 text-sm">&copy; 2024 DFRNT. All rights reserved.</footer>
      </div>
    );
  }

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-branding-gradient1 via-branding-gradient2 via-60% to-branding-gradient3">
        <nav className="bg-primary border-b-2 border-branding-orange sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-branding-orange tracking-tight">Productivity Hub</h1>
              </div>
              <div className="flex space-x-1">
                {NAV.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setView(item.key)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-branding-orange focus:ring-offset-2 focus:ring-offset-primary ${
                      view === item.key
                        ? 'bg-branding-orange text-white shadow-lg'
                        : 'text-white hover:text-branding-orange hover:bg-gray-dark'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto py-10 px-4 sm:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 min-h-[400px] border border-gray-light">
            {view === 'nootropics' && <NootropicsLibrary />}
            {view === 'pomodoro' && <PomodoroTimer />}
            {view === 'binaural' && <BinauralBeats />}
            {view === 'training' && <TrainingHub />}
          </div>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
