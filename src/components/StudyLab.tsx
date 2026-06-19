import { useState, useEffect, useRef, useCallback } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function StudyLab() {
  const [mode, setMode] = useState<'pomodoro' | 'stopwatch'>('pomodoro');
  const [isActive, setIsActive] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [pomoTime, setPomoTime] = useState(1500);
  const [pomoMode, setPomoMode] = useState<'work' | 'break'>('work');
  const [stopwatchTime, setStopwatchTime] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (mode === 'pomodoro') {
          setPomoTime((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current!);
              setIsActive(false);
              try {
                const context = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
                const osc = context.createOscillator();
                osc.connect(context.destination);
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(440, context.currentTime);
                osc.start();
                osc.stop(context.currentTime + 0.5);
              } catch {
                // audio not available
              }
              return 0;
            }
            return prev - 1;
          });
        } else {
          setStopwatchTime((prev) => prev + 1);
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode]);

  const toggleTimer = useCallback(() => setIsActive((prev) => !prev), []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    if (mode === 'pomodoro') {
      setPomoTime(pomoMode === 'work' ? 1500 : 300);
    } else {
      setStopwatchTime(0);
    }
  }, [mode, pomoMode]);

  const switchPomoMode = useCallback((m: 'work' | 'break') => {
    setPomoMode(m);
    setIsActive(false);
    setPomoTime(m === 'work' ? 1500 : 300);
  }, []);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`pt-32 pb-20 px-4 max-w-[95vw] mx-auto transition-all ${isFocus ? 'bg-black min-h-screen fixed inset-0 z-50 pt-10' : ''}`}>
      {isFocus && (
        <button
          onClick={() => setIsFocus(false)}
          className="fixed top-8 right-8 bg-[#DFE104] text-black border-2 border-black p-4 font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
        >
          <Minimize2 size={20} /> EXIT DEEP FOCUS
        </button>
      )}

      <div className="max-w-4xl mx-auto text-center">
        {!isFocus && (
          <div className="mb-12">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-[#FAFAFA]">STUDY LAB</h1>
            <p className="text-xl text-[#A1A1AA] font-medium max-w-xl mx-auto">Optimize your mental processing clock. Timed metrics prevent syllabus dilution.</p>
          </div>
        )}

        <div className="bg-[#09090B] border-4 border-[#3F3F46] rounded-none p-10 relative overflow-hidden my-8">
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => { setMode('pomodoro'); setIsActive(false); }}
              className={`px-6 py-3 font-bold tracking-tight text-lg border-2 ${mode === 'pomodoro' ? 'bg-[#DFE104] text-black border-black' : 'text-[#FAFAFA] border-[#3F3F46]'}`}
            >
              POMODORO INTERVALS
            </button>
            <button
              onClick={() => { setMode('stopwatch'); setIsActive(false); }}
              className={`px-6 py-3 font-bold tracking-tight text-lg border-2 ${mode === 'stopwatch' ? 'bg-[#DFE104] text-black border-black' : 'text-[#FAFAFA] border-[#3F3F46]'}`}
            >
              STOPWATCH
            </button>
          </div>

          {mode === 'pomodoro' && (
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => switchPomoMode('work')}
                className={`px-4 py-2 font-black tracking-tighter uppercase border-2 text-sm ${pomoMode === 'work' ? 'bg-[#FAFAFA] text-black border-black' : 'text-[#A1A1AA] border-[#3F3F46]'}`}
              >
                DEEP CONCENTRATION (25m)
              </button>
              <button
                onClick={() => switchPomoMode('break')}
                className={`px-4 py-2 font-black tracking-tighter uppercase border-2 text-sm ${pomoMode === 'break' ? 'bg-[#FAFAFA] text-black border-black' : 'text-[#A1A1AA] border-[#3F3F46]'}`}
              >
                COGNITIVE RELIEF (5m)
              </button>
            </div>
          )}

          <div className="text-[7rem] md:text-[12rem] font-black text-[#FAFAFA] tracking-tighter leading-none my-10 select-none animate-pulse">
            {mode === 'pomodoro' ? formatTime(pomoTime) : formatTime(stopwatchTime)}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button
              onClick={toggleTimer}
              className="w-full sm:w-auto bg-[#DFE104] text-black border-2 border-black px-12 py-5 text-2xl font-black tracking-tighter hover:scale-105 active:scale-95 transition-transform"
            >
              {isActive ? 'HALT CLOCK' : 'INITIATE SPRINT'}
            </button>
            <button
              onClick={resetTimer}
              className="w-full sm:w-auto bg-[#27272A] text-[#FAFAFA] border-2 border-[#3F3F46] px-12 py-5 text-2xl font-black tracking-tighter hover:bg-[#3F3F46] transition-all"
            >
              RESET ENGINE
            </button>
            {!isFocus && (
              <button
                onClick={() => setIsFocus(true)}
                className="w-full sm:w-auto bg-black text-[#DFE104] border-2 border-[#DFE104] px-12 py-5 text-2xl font-black tracking-tighter hover:bg-[#DFE104] hover:text-black transition-all"
              >
                <Maximize2 className="inline mr-2" /> FOCUS MODE
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
