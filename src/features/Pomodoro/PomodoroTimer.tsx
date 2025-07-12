import React, { useState, useRef } from 'react';

const gradientBtn = "bg-gradient-to-r from-black via-[#C10801] via-60% to-[#F16001] text-white hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-branding-orange transition-all duration-200";

const POMODORO = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

const PomodoroTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(POMODORO);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
  const intervalRef = useRef<number | null>(null);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const start = () => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = window.setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
  };

  const pause = () => {
    setIsActive(false);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  };

  const reset = (newMode: typeof mode = mode) => {
    pause();
    setMode(newMode);
    setSeconds(newMode === 'work' ? POMODORO : newMode === 'short' ? SHORT_BREAK : LONG_BREAK);
  };

  React.useEffect(() => {
    if (seconds === 0) pause();
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [seconds]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto flex flex-col items-center animate-fade-in">
      <h2 className="text-2xl font-bold text-branding-orange mb-4">Pomodoro Timer</h2>
      <div className="flex space-x-2 mb-6">
        <button
          className={gradientBtn + ` px-4 py-2 rounded-full text-sm font-bold ${mode === 'work' ? 'opacity-100' : 'opacity-70'}`}
          onClick={() => reset('work')}
        >Work</button>
        <button
          className={gradientBtn + ` px-4 py-2 rounded-full text-sm font-bold ${mode === 'short' ? 'opacity-100' : 'opacity-70'}`}
          onClick={() => reset('short')}
        >Short Break</button>
        <button
          className={gradientBtn + ` px-4 py-2 rounded-full text-sm font-bold ${mode === 'long' ? 'opacity-100' : 'opacity-70'}`}
          onClick={() => reset('long')}
        >Long Break</button>
      </div>
      <div className="text-6xl font-mono text-gray-900 mb-6 tracking-widest">{formatTime(seconds)}</div>
      <div className="flex space-x-4">
        <button
          className={gradientBtn + " px-6 py-2 rounded-lg text-lg"}
          onClick={isActive ? pause : start}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          className={gradientBtn + " px-6 py-2 rounded-lg text-lg opacity-80"}
          onClick={() => reset(mode)}
        >
          Reset
        </button>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
};

export default PomodoroTimer; 