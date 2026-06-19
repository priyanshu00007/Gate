import { useNavigate } from 'react-router-dom';
import { Code, Brain, Monitor, Database, Network, Layers, Terminal, Zap } from 'lucide-react';
import subjects from '../data/subjects.json';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code, Brain, Monitor, Database, Network, Layers, Terminal, Zap
};

export default function SubjectsGrid() {
  const navigate = useNavigate();
  return (
    <section className="py-20 max-w-[95vw] mx-auto border-t-2 border-[#3F3F46]">
      <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-center mb-16 text-[#FAFAFA]">CURRICULUM GRID</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjects.map((sub) => {
          const Icon = iconMap[sub.icon];
          return (
            <div
              key={sub.id}
              onClick={() => navigate('/learn')}
              className="group border-2 border-[#3F3F46] p-8 bg-[#09090B] hover:bg-[#DFE104] hover:border-black cursor-pointer transition-all duration-150"
            >
              <div className="w-12 h-12 bg-[#27272A] text-[#DFE104] group-hover:bg-black group-hover:text-[#DFE104] flex items-center justify-center mb-6 transition-all">
                {Icon && <Icon size={20} />}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#FAFAFA] group-hover:text-black mb-3">{sub.name}</h3>
              <p className="text-sm text-[#A1A1AA] group-hover:text-black font-bold">Syllabus overview & notes &rarr;</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
