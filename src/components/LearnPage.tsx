import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PlayCircle, Zap, FileText, Layout, Code, Brain, Monitor, Database, Network, Layers, Terminal } from 'lucide-react';
import subjects from '../data/subjects.json';
import type { LucideIcon } from 'lucide-react';

interface LearnPageProps {
  setResourceContext: (ctx: { category: string; subject: string }) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Code, Brain, Monitor, Database, Network, Layers, Terminal, Zap
};

export default function LearnPage({ setResourceContext }: LearnPageProps) {
  const [selectedSub, setSelectedSub] = useState(subjects[0]);
  const navigate = useNavigate();

  const handleResourceNavigation = (category: string) => {
    setResourceContext({ category, subject: selectedSub.name });
    navigate('/resources');
  };

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon size={20} /> : null;
  };

  return (
    <div className="pt-32 pb-20 px-4 max-w-[95vw] mx-auto flex flex-col lg:flex-row gap-12">
      <div className="lg:w-1/3">
        <h1 className="text-5xl font-black text-[#FAFAFA] mb-8 uppercase tracking-tighter">LEARN HUB</h1>

        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
          {subjects.map(sub => (
            <button
              key={sub.id}
              onClick={() => setSelectedSub(sub)}
              className={`whitespace-nowrap flex items-center gap-4 p-5 border-2 min-w-[220px] lg:min-w-0 transition-all text-left ${selectedSub.id === sub.id ? 'bg-[#DFE104] text-black border-black scale-[1.02]' : 'bg-[#09090B] text-[#FAFAFA] border-[#3F3F46] hover:border-[#DFE104]'}`}
            >
              <div className={selectedSub.id === sub.id ? 'text-black' : 'text-[#DFE104]'}>
                {getIcon(sub.icon)}
              </div>
              <span className="font-black tracking-tight text-sm uppercase">{sub.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:w-2/3">
        <div className="bg-[#09090B] border-2 border-[#3F3F46] overflow-hidden">
          <div className="p-10 bg-[#27272A]/40 border-b-2 border-[#3F3F46] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-4xl font-black uppercase text-[#FAFAFA] tracking-tighter">{selectedSub.name}</h2>
              <p className="text-[#DFE104] font-black text-xs uppercase tracking-widest mt-1">VELOCITY TARGET: {selectedSub.targets}</p>
            </div>
            <span className="px-4 py-2 border-2 border-[#3F3F46] bg-[#09090B] text-xs font-black text-[#FAFAFA] tracking-widest uppercase">STAGE: ADVANCED</span>
          </div>

          <div className="p-10 space-y-12">
            <div>
              <h3 className="font-black text-2xl uppercase tracking-tight text-[#FAFAFA] mb-6 flex items-center gap-3">
                <Layout size={24} className="text-[#DFE104]" /> SYLLABUS BREAKDOWN
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {selectedSub.syllabus.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-[#27272A]/20 border border-[#3F3F46] hover:border-[#DFE104] transition-colors">
                    <div className="w-2.5 h-2.5 bg-[#DFE104]"></div>
                    <span className="font-bold text-sm text-[#A1A1AA] uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black text-2xl uppercase tracking-tight text-[#FAFAFA] mb-6">INTELLIGENCE ASSETS</h3>
              <div className="grid gap-4">
                <button
                  onClick={() => handleResourceNavigation('Full Playlist')}
                  className="w-full flex items-center justify-between p-6 bg-[#09090B] border-2 border-[#3F3F46] hover:border-black hover:bg-[#DFE104] hover:text-black group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <PlayCircle size={28} className="text-[#DFE104] group-hover:text-black" />
                    <div className="text-left">
                      <span className="block font-black text-lg group-hover:text-black uppercase">FULL COURSE PLAYLISTS</span>
                      <span className="text-xs font-bold text-[#A1A1AA] group-hover:text-black uppercase">NPTEL, TOPPERS & CORE CHANNELS</span>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-[#A1A1AA] group-hover:text-black" />
                </button>

                <button
                  onClick={() => handleResourceNavigation('One Shot')}
                  className="w-full flex items-center justify-between p-6 bg-[#09090B] border-2 border-[#3F3F46] hover:border-black hover:bg-[#DFE104] hover:text-black group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Zap size={28} className="text-[#DFE104] group-hover:text-black" />
                    <div className="text-left">
                      <span className="block font-black text-lg group-hover:text-black uppercase">ONE SHOT REVISIONS</span>
                      <span className="text-xs font-bold text-[#A1A1AA] group-hover:text-black uppercase">RAPID 6H SPRINTS</span>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-[#A1A1AA] group-hover:text-black" />
                </button>

                <button
                  onClick={() => handleResourceNavigation('Notes')}
                  className="w-full flex items-center justify-between p-6 bg-[#09090B] border-2 border-[#3F3F46] hover:border-black hover:bg-[#DFE104] hover:text-black group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <FileText size={28} className="text-[#DFE104] group-hover:text-black" />
                    <div className="text-left">
                      <span className="block font-black text-lg group-hover:text-black uppercase">SHORT HANDWRITTEN NOTES</span>
                      <span className="text-xs font-bold text-[#A1A1AA] group-hover:text-black uppercase">AIR 42 HANDWRITTEN PDF CHEAT SHEETS</span>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-[#A1A1AA] group-hover:text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
