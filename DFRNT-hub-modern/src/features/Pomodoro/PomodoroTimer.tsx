import React, { useState, useEffect } from 'react';

const WORK_DURATION = 25 * 60; // 25 minutes
const SHORT_BREAK = 5 * 60; // 5 minutes
const LONG_BREAK = 15 * 60; // 15 minutes

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === 'work') {
        setSessions((s) => s + 1);
        if ((sessions + 1) % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(LONG_BREAK);
        } else {
          setMode('shortBreak');
          setTimeLeft(SHORT_BREAK);
        }
      } else {
        setMode('work');
        setTimeLeft(WORK_DURATION);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, sessions]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 to-black min-h-screen text-gray-100">
      <h1 className="text-4xl font-extrabold text-orange-400 mb-8 text-center leading-tight">
        Pomodoro Timer
      </h1>
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full border-b-4 border-orange-700 flex flex-col items-center">
        <div className="text-6xl font-bold text-orange-400 mb-4">{formatTime(timeLeft)}</div>
        <div className="text-lg text-gray-300 mb-6 capitalize">{mode === 'work' ? 'Work' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}</div>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setMode('work')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${mode === 'work' ? 'bg-orange-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
          >
            Work
          </button>
          <button
            onClick={() => setMode('shortBreak')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${mode === 'shortBreak' ? 'bg-orange-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
          >
            Short Break
          </button>
          <button
            onClick={() => setMode('longBreak')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${mode === 'longBreak' ? 'bg-orange-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
          >
            Long Break
          </button>
        </div>
        <div className="flex space-x-4">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              ▶️ Start
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              ⏸️ Pause
            </button>
          )}
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(mode === 'work' ? WORK_DURATION : mode === 'shortBreak' ? SHORT_BREAK : LONG_BREAK);
            }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            🔄 Reset
          </button>
        </div>
        <div className="mt-8 text-center text-gray-400">Sessions completed: {sessions}</div>
      </div>
    </div>
  );
};

export default PomodoroTimer; 