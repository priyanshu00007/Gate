import { ChevronRight, Home, Zap, PlayCircle, FileText, FileSearch, Target, Dices, Video, ExternalLink, ArrowRight } from 'lucide-react';
import resources from '../data/resources.json';
import subjects from '../data/subjects.json';

interface ResourceContext {
  category: string | null;
  subject: string | null;
}

interface ResourcesPageProps {
  resourceContext: ResourceContext;
  setResourceContext: (ctx: ResourceContext) => void;
}

export default function ResourcesPage({ resourceContext, setResourceContext }: ResourcesPageProps) {
  const { category, subject } = resourceContext;

  const resetContext = () => setResourceContext({ category: null, subject: null });
  const selectCategory = (cat: string) => setResourceContext({ category: cat, subject: null });
  const selectSubject = (sub: string) => setResourceContext({ category, subject: sub });

  const renderBreadcrumbs = () => (
    <div className="flex items-center gap-2 mb-10 text-xs font-black uppercase tracking-widest text-[#A1A1AA] flex-wrap">
      <button onClick={resetContext} className="hover:text-[#DFE104] flex items-center gap-1 transition-colors">
        <Home size={12} /> RESOURCES
      </button>
      {category && (
        <>
          <ChevronRight size={14} className="text-[#3F3F46]" />
          <button onClick={() => setResourceContext({ category, subject: null })} className="hover:text-[#DFE104] transition-colors">
            {category.toUpperCase()}
          </button>
        </>
      )}
      {subject && (
        <>
          <ChevronRight size={14} className="text-[#3F3F46]" />
          <span className="text-[#DFE104]">{subject}</span>
        </>
      )}
    </div>
  );

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap />;
      case 'PlayCircle': return <PlayCircle />;
      case 'FileText': return <FileText />;
      default: return <Zap />;
    }
  };

  // VIEW 1: Main Category Selection
  if (!category) {
    return (
      <div className="pt-32 pb-20 px-4 max-w-[95vw] mx-auto">
        <h1 className="text-5xl md:text-8xl font-black text-[#FAFAFA] mb-4 tracking-tight uppercase">RESOURCE CORE</h1>
        <p className="text-[#A1A1AA] text-lg font-bold mb-12">CURATED MATERIAL DISCOVERY SHELF. NO FLUFF. NO OVERLOAD.</p>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {resources.categories.map((cat) => (
            <div key={cat.id} className="p-10 bg-[#09090B] border-2 border-[#3F3F46] rounded-none hover:border-[#DFE104] transition-all group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-[#27272A] flex items-center justify-center mb-8 text-[#DFE104] border border-[#3F3F46]">{getCategoryIcon(cat.icon)}</div>
                <h3 className="text-2xl font-black mb-4 tracking-tight text-[#FAFAFA]">{cat.title}</h3>
                <p className="text-[#A1A1AA] text-sm font-bold leading-relaxed mb-8">{cat.desc}</p>
              </div>
              <button onClick={() => selectCategory(cat.id)} className="w-full py-4 bg-[#DFE104] text-black font-black hover:scale-[1.02] active:scale-95 transition-transform border-2 border-black">
                VIEW SUBJECTS
              </button>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-10 bg-[#09090B] border-2 border-[#3F3F46]">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-[#FAFAFA] uppercase">
              <FileSearch className="text-[#DFE104]" /> QUICK STRATEGY CHEATS
            </h3>
            <div className="space-y-3">
              {resources.quickLinks.map((item) => (
                <div key={item} className="flex justify-between items-center p-4 bg-[#27272A]/40 border border-[#3F3F46] hover:border-[#DFE104] cursor-pointer">
                  <span className="font-bold text-sm text-[#FAFAFA]">{item}</span>
                  <ExternalLink size={16} className="text-[#DFE104]" />
                </div>
              ))}
            </div>
          </div>
          <div className="p-10 bg-[#09090B] border-2 border-[#3F3F46]">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-[#FAFAFA] uppercase">
              <Target className="text-[#DFE104]" /> PEER PRACTICE PAPERS
            </h3>
            <div className="space-y-3">
              {resources.peerPapers.map((item) => (
                <div key={item} className="flex justify-between items-center p-4 bg-[#27272A]/40 border border-[#3F3F46] hover:border-[#DFE104] cursor-pointer">
                  <span className="font-bold text-sm text-[#FAFAFA]">{item}</span>
                  <ExternalLink size={16} className="text-[#DFE104]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VIEW 2: Subject selection within Category
  if (category && !subject) {
    return (
      <div className="pt-32 pb-20 px-4 max-w-[95vw] mx-auto">
        {renderBreadcrumbs()}
        <h1 className="text-5xl font-black text-[#FAFAFA] mb-4 tracking-tight uppercase">{category} MODULES</h1>
        <p className="text-[#A1A1AA] text-lg font-bold mb-12">CHOOSE CORE DISCIPLINE TO STREAM RELEVANT LINKS.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {subjects.map((sub) => (
            <button key={sub.id} onClick={() => selectSubject(sub.name)} className="p-8 bg-[#09090B] border-2 border-[#3F3F46] hover:border-[#DFE104] hover:bg-[#27272A]/40 transition-all text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-[#27272A] text-[#DFE104] rounded-none flex items-center justify-center mb-4 border border-[#3F3F46]">
                    <Video size={20} />
              </div>
              <span className="font-black text-sm uppercase text-[#FAFAFA]">{sub.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // VIEW 3: Final Link List
  const matchName = subject?.toUpperCase() ?? '';
  const materials: { title: string; url: string }[] = [];
  const catMaterials = resources.materials[category as keyof typeof resources.materials];
  if (catMaterials && matchName in catMaterials) {
    materials.push(...(catMaterials[matchName as keyof typeof catMaterials] as { title: string; url: string }[]));
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
      {renderBreadcrumbs()}
      <div className="bg-[#09090B] border-2 border-[#3F3F46] overflow-hidden">
        <div className="p-10 bg-[#27272A]/50 border-b-2 border-[#3F3F46] flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-[#FAFAFA] tracking-tighter uppercase">{subject}</h1>
            <p className="text-[#DFE104] font-black text-xs uppercase tracking-widest mt-1">{category} COLLECTION</p>
          </div>
          <div className="p-4 bg-[#09090B] border border-[#3F3F46] text-[#DFE104]">
            <Dices size={24} />
          </div>
        </div>
        <div className="p-10 space-y-8">
          <div className="space-y-4">
            {materials.map((m, i) => (
              <a key={i} href={m.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-[#27272A]/20 border border-[#3F3F46] hover:bg-[#27272A]/60 hover:border-[#DFE104] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-950/40 border border-rose-800 text-rose-500 flex items-center justify-center">
                    <Video size={24} />
                  </div>
                  <span className="font-bold text-[#FAFAFA] text-lg">{m.title}</span>
                </div>
                <div className="flex items-center gap-2 text-[#DFE104] font-black text-sm uppercase">
                  LAUNCH <ArrowRight size={16} />
                </div>
              </a>
            ))}
            {materials.length === 0 && (
              <div className="text-center py-20 bg-[#27272A]/10 border-2 border-dashed border-[#3F3F46]">
                <Dices size={48} className="mx-auto text-[#A1A1AA] mb-4" />
                <p className="text-[#A1A1AA] font-bold">DIGITIZING CURATED MATERIALS FOR THIS SUB-DISCIPLINE.</p>
                <p className="text-xs text-[#3F3F46] mt-2">ALIGNED WITH COGNITIVE SPREAD CRITERIA.</p>
              </div>
            )}
          </div>
          <div className="pt-10 border-t border-[#3F3F46] text-center">
            <button onClick={() => setResourceContext({ category, subject: null })} className="text-[#A1A1AA] font-black text-sm hover:text-[#DFE104] transition-colors uppercase">
              RETURN TO SUBJECT SHELF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
