import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, Clock, Calendar } from 'lucide-react';
import heroData from '../data/hero.json';

const GATE_2027 = new Date('2027-02-06T00:00:00');

function getTimeRemaining() {
  const now = new Date();
  const diff = GATE_2027.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 };

  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days: totalDays, hours, minutes, seconds, totalDays };
}

function getOrdinal(n: number) {
  if (n > 3 && n < 21) return 'th';
  switch (n % 10) { case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th'; }
}

export default function HeroSection() {
  const navigate = useNavigate();
  const [showClock, setShowClock] = useState(() => !localStorage.getItem('gateit_seen'));
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeRemaining()), 1000);
    const loadTimer = setTimeout(() => setLoading(false), 2500);
    return () => { clearInterval(timer); clearTimeout(loadTimer); };
  }, []);

  const dismiss = () => {
    localStorage.setItem('gateit_seen', '1');
    setShowClock(false);
  };

  const t = time.totalDays;
  const months = Math.floor(t / 30);
  const remDays = t % 30;

  const countdownContent = (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-3 text-[#DFE104] text-sm font-black uppercase tracking-widest">
        <Clock size={20} /> COUNTDOWN TO GATE 2027
      </div>

      <div className="flex gap-4 md:gap-8">
        {[
          { val: time.days, lbl: 'DAYS' },
          { val: time.hours, lbl: 'HOURS' },
          { val: time.minutes, lbl: 'MIN' },
          { val: time.seconds, lbl: 'SEC' },
        ].map((unit) => (
          <div key={unit.lbl} className="text-center">
            <div className="text-5xl md:text-7xl font-black text-[#FAFAFA] tracking-tighter leading-none tabular-nums">
              {unit.val.toString().padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mt-2">{unit.lbl}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-[#A1A1AA] text-xs md:text-sm font-bold">
        <Calendar size={14} />
        GATE 2027: FEB 6{getOrdinal(6)}, 7{getOrdinal(7)}, 13{getOrdinal(13)}, 14{getOrdinal(14)} &mdash; approx. {months} months {remDays} days left
      </div>
    </div>
  );

  return (
    <>
      {showClock && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#09090B] transition-opacity duration-500 opacity-100">
          <div className={`transition-all duration-700 ${loading ? 'scale-110 opacity-60' : 'scale-100 opacity-100'}`}>
            {loading ? (
              <div className="flex flex-col items-center gap-6">
                <div className="text-[#DFE104] font-black text-sm uppercase tracking-[0.3em] animate-pulse">LOADING</div>
                <div className="w-16 h-16 border-4 border-[#DFE104] border-t-transparent rounded-full animate-spin"></div>
                <div className="text-[#A1A1AA] text-xs font-bold uppercase tracking-widest animate-pulse">Initializing Sprint Interface...</div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto px-6 text-center">
                {countdownContent}
                <button
                  onClick={dismiss}
                  className="mt-10 bg-[#DFE104] text-black border-2 border-black px-10 py-4 font-black text-lg tracking-tighter hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
                >
                  <X size={20} /> ENTER PLATFORM
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <section className="relative pt-36 pb-20 px-4 max-w-[95vw] mx-auto overflow-hidden">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#DFE104] text-[#DFE104] text-xs font-bold tracking-widest mb-10 bg-[#27272A]/40 uppercase">
            <Sparkles size={14} /> {heroData.badge}
          </div>

          <h1 className="text-[clamp(2.5rem,8vw,9rem)] font-black uppercase tracking-tighter leading-[0.8] mb-10 text-[#FAFAFA]">
            BUILD GATE RANK. <br />
            <span className="text-[#DFE104]">NOT ALONE.</span>
          </h1>

          <p className="text-xl md:text-2xl text-[#A1A1AA] max-w-4xl mx-auto leading-relaxed font-medium mb-12">
            {heroData.subheadline}
          </p>

          <div className="mb-12 p-6 md:p-8 bg-[#09090B] border-2 border-[#3F3F46] max-w-2xl mx-auto">
            {countdownContent}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <button
              onClick={() => navigate('/join')}
              className="w-full sm:w-auto bg-[#DFE104] text-black border-2 border-black py-5 px-10 text-xl font-bold tracking-tighter hover:scale-105 active:scale-95 transition-transform duration-150"
            >
              {heroData.ctaPrimary}
            </button>
            <button
              onClick={() => navigate('/roadmap')}
              className="w-full sm:w-auto bg-[#09090B] text-[#FAFAFA] border-2 border-[#3F3F46] py-5 px-10 text-xl font-bold tracking-tighter hover:bg-[#27272A] transition-all"
            >
              {heroData.ctaSecondary}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
