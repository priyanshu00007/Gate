import { useState } from 'react';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import roadmaps from '../data/roadmaps.json';

type PlanKey = 'gate-2027' | 'gate-2028';

export default function RoadmapPage() {
  const [plan, setPlan] = useState<PlanKey>('gate-2027');
  const current = roadmaps[plan];

  return (
    <div className="pt-32 pb-20 px-4 max-w-[95vw] mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-8xl font-black text-[#FAFAFA] mb-4 tracking-tighter uppercase">
          SUCCESS HORIZONS
        </h1>
        <p className="text-lg text-[#A1A1AA] font-bold mb-4">
          SELECT YOUR TARGET GATE YEAR AND FOLLOW THE LEVEL-BASED PATH.
        </p>
        <div className="flex items-center justify-center gap-4 text-[#A1A1AA] text-sm font-bold mb-10">
          <Calendar size={16} /> {current.startDate}
          <ArrowRight size={16} />
          <Calendar size={16} /> {current.endDate}
        </div>
        <div className="inline-flex gap-2 bg-[#27272A] p-2 border border-[#3F3F46]">
          {Object.entries(roadmaps).map(([key, rm]) => (
            <button
              key={key}
              onClick={() => setPlan(key as PlanKey)}
              className={`px-8 py-3 font-black transition-all text-sm ${plan === key ? 'bg-[#DFE104] text-black' : 'text-[#A1A1AA]'}`}
            >
              {rm.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-24">
        {current.levels.map((lvl) => (
          <div key={lvl.level} className="bg-[#09090B] border-2 border-[#3F3F46] p-6 flex flex-col">
            <div className="bg-[#DFE104] text-black text-xs font-black px-3 py-1 self-start mb-4 tracking-wider">
              LEVEL {lvl.level}
            </div>
            <h3 className="text-lg font-black text-[#FAFAFA] uppercase tracking-tight mb-1">{lvl.name}</h3>
            <p className="text-[10px] text-[#A1A1AA] font-bold uppercase tracking-wider mb-6">{lvl.subtitle}</p>
            <div className="space-y-3 flex-1">
              {lvl.subjects.map((subj) => (
                <div key={subj.name} className="bg-[#27272A]/40 border border-[#3F3F46] p-3 group hover:border-[#DFE104] transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-[#FAFAFA] uppercase tracking-tight leading-tight">{subj.name}</span>
                    <span className="text-[10px] font-black text-[#DFE104] whitespace-nowrap shrink-0">
                      <Clock size={10} className="inline mr-1" />{subj.time}
                    </span>
                  </div>
                  {'requires' in subj && (
                    <p className="text-[9px] text-[#A1A1AA]/60 font-bold uppercase tracking-wider mt-1">
                      Requires: {subj.requires}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-[#FAFAFA] mb-12 uppercase tracking-tight text-center">
          MONTHLY BATTLE PLAN
        </h2>
        <div className="space-y-6 relative">
          {current.timeline.map((step, idx) => (
            <div key={idx} className="flex items-stretch gap-6 group">
              <div className="hidden md:flex flex-col items-center w-24 shrink-0">
                <div className="bg-[#DFE104] text-black font-black text-xs px-3 py-2 text-center leading-tight tracking-wider">
                  {step.month}
                </div>
                {idx < current.timeline.length - 1 && <div className="w-0.5 flex-1 bg-[#3F3F46] mt-2"></div>}
              </div>
              <div className="bg-[#09090B] border-2 border-[#3F3F46] p-6 flex-1 hover:border-[#DFE104] transition-colors">
                <span className="md:hidden text-[#DFE104] font-black text-xs tracking-widest uppercase block mb-2">{step.month}</span>
                <h3 className="text-xl font-black text-[#FAFAFA] mb-4 uppercase tracking-tight">{step.focus}</h3>
                <div className="flex flex-wrap gap-2">
                  {step.subjects.map((t, i) => (
                    <span key={i} className="bg-[#27272A] text-[#FAFAFA] px-3 py-1.5 border border-[#3F3F46] text-[10px] font-bold uppercase tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
