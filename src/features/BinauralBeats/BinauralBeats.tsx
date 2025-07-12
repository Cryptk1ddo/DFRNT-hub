import React, { useState, useEffect } from 'react';

const gradientBtn = "bg-gradient-to-r from-black via-[#C10801] via-60% to-[#F16001] text-white hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-branding-orange transition-all duration-200";

const frequencyPresets = [
  { name: 'Deep Sleep', frequency: 0.5, description: 'Delta waves for deep restorative sleep' },
  { name: 'Light Sleep', frequency: 4, description: 'Theta waves for light sleep and meditation' },
  { name: 'Relaxation', frequency: 8, description: 'Alpha waves for relaxation and stress relief' },
  { name: 'Focus', frequency: 10, description: 'Alpha waves for enhanced focus and concentration' },
  { name: 'Creativity', frequency: 12, description: 'Alpha waves for creative thinking' },
  { name: 'Alertness', frequency: 16, description: 'Beta waves for alertness and active thinking' },
  { name: 'High Focus', frequency: 20, description: 'Beta waves for high concentration tasks' },
  { name: 'Problem Solving', frequency: 25, description: 'Beta waves for analytical thinking' },
  { name: 'Insight', frequency: 40, description: 'Gamma waves for insight and peak performance' }
];

const BinauralBeats: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(10);
  const [volume, setVolume] = useState(0.5);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillators, setOscillators] = useState<{ left: OscillatorNode | null; right: OscillatorNode | null }>({ left: null, right: null });
  const [gainNodes, setGainNodes] = useState<{ left: GainNode | null; right: GainNode | null }>({ left: null, right: null });

  const startBinauralBeats = async () => {
    try {
      if (!audioContext) {
        const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(newAudioContext);
        if (newAudioContext.state === 'suspended') {
          await newAudioContext.resume();
        }
      }
      if (oscillators.left && oscillators.right) {
        oscillators.left.stop();
        oscillators.right.stop();
      }
      const ctx = audioContext || new (window.AudioContext || (window as any).webkitAudioContext)();
      const leftOsc = ctx.createOscillator();
      const rightOsc = ctx.createOscillator();
      const leftGain = ctx.createGain();
      const rightGain = ctx.createGain();
      const leftPanner = (ctx.createStereoPanner && ctx.createStereoPanner()) || undefined;
      const rightPanner = (ctx.createStereoPanner && ctx.createStereoPanner()) || undefined;
      leftOsc.frequency.setValueAtTime(200, ctx.currentTime);
      leftOsc.connect(leftGain);
      if (leftPanner) {
        leftGain.connect(leftPanner);
        leftPanner.pan.setValueAtTime(-1, ctx.currentTime);
        leftPanner.connect(ctx.destination);
      } else {
        leftGain.connect(ctx.destination);
      }
      leftGain.gain.setValueAtTime(volume, ctx.currentTime);
      rightOsc.frequency.setValueAtTime(200 + currentFrequency, ctx.currentTime);
      rightOsc.connect(rightGain);
      if (rightPanner) {
        rightGain.connect(rightPanner);
        rightPanner.pan.setValueAtTime(1, ctx.currentTime);
        rightPanner.connect(ctx.destination);
      } else {
        rightGain.connect(ctx.destination);
      }
      rightGain.gain.setValueAtTime(volume, ctx.currentTime);
      leftOsc.start();
      rightOsc.start();
      setOscillators({ left: leftOsc, right: rightOsc });
      setGainNodes({ left: leftGain, right: rightGain });
      setIsPlaying(true);
    } catch (error) {
      alert('Please allow audio playback and try again.');
    }
  };

  const stopBinauralBeats = () => {
    if (oscillators.left && oscillators.right) {
      oscillators.left.stop();
      oscillators.right.stop();
      setOscillators({ left: null, right: null });
      setGainNodes({ left: null, right: null });
    }
    if (audioContext && audioContext.state === 'running') {
      audioContext.suspend();
    }
    setIsPlaying(false);
  };

  const updateFrequency = (freq: number) => {
    setCurrentFrequency(freq);
    if (isPlaying && oscillators.left && oscillators.right && audioContext) {
      oscillators.left.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillators.right.frequency.setValueAtTime(200 + freq, audioContext.currentTime);
    }
  };

  const updateVolume = (vol: number) => {
    setVolume(vol);
    if (isPlaying && gainNodes.left && gainNodes.right && audioContext) {
      gainNodes.left.gain.setValueAtTime(vol, audioContext.currentTime);
      gainNodes.right.gain.setValueAtTime(vol, audioContext.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      if (oscillators.left && oscillators.right) {
        oscillators.left.stop();
        oscillators.right.stop();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center p-8 min-h-screen text-gray-100 animate-fade-in">
      <h1 className="text-4xl font-extrabold text-branding-orange mb-8 text-center leading-tight">
        Binaural Beats Generator
      </h1>
      <p className="text-xl text-gray-300 mb-10 text-center max-w-3xl">
        Harness the power of brainwave entrainment to optimize your mental state for different activities.
      </p>
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl w-full border-b-4 border-orange-700">
        <h2 className="text-3xl font-bold text-orange-400 mb-6 border-b pb-4 border-orange-800">
          Frequency Presets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {frequencyPresets.map((preset, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                currentFrequency === preset.frequency
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
              onClick={() => updateFrequency(preset.frequency)}
            >
              <h3 className="font-bold text-lg mb-1">{preset.name}</h3>
              <p className="text-sm opacity-80">{preset.frequency} Hz</p>
              <p className="text-xs mt-2 opacity-70">{preset.description}</p>
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-bold text-orange-400 mb-6 border-b pb-4 border-orange-800">
          Custom Controls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-gray-200 font-semibold mb-2">
              Frequency: {currentFrequency} Hz
            </label>
            <input
              type="range"
              min="0.5"
              max="40"
              step="0.5"
              value={currentFrequency}
              onChange={(e) => updateFrequency(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              title="Frequency"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0.5 Hz</span>
              <span>40 Hz</span>
            </div>
          </div>
          <div>
            <label className="block text-gray-200 font-semibold mb-2">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => updateVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              title="Volume"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-gray-300">
              {isPlaying ? `Playing ${currentFrequency} Hz` : 'Ready to play'}
            </span>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={isPlaying ? stopBinauralBeats : startBinauralBeats}
            className={gradientBtn + ` px-8 py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform ${isPlaying ? 'opacity-90' : ''}`}
          >
            {isPlaying ? '⏹️ Stop' : '▶️ Start'}
          </button>
        </div>
        <div className="mt-8 bg-gray-900 rounded-xl p-6">
          <h3 className="text-xl font-bold text-orange-300 mb-4">How Binaural Beats Work</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Binaural beats occur when two slightly different frequencies are presented to each ear. 
            Your brain perceives a third frequency equal to the difference between the two, 
            which can help entrain your brainwaves to specific states.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-orange-400 mb-2">Brainwave States:</h4>
              <ul className="text-gray-300 space-y-1">
                <li><strong>Delta (0.5-4 Hz):</strong> Deep sleep, healing</li>
                <li><strong>Theta (4-8 Hz):</strong> Meditation, creativity</li>
                <li><strong>Alpha (8-13 Hz):</strong> Relaxation, focus</li>
                <li><strong>Beta (13-30 Hz):</strong> Alertness, concentration</li>
                <li><strong>Gamma (30-100 Hz):</strong> Insight, peak performance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-400 mb-2">Usage Tips:</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Use headphones for best results</li>
                <li>• Start with 10-15 minute sessions</li>
                <li>• Find a quiet, comfortable environment</li>
                <li>• Be patient - effects may take time</li>
                <li>• Don't use while driving or operating machinery</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(24px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
};

export default BinauralBeats; 