import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, FileText, CheckCircle } from 'lucide-react';
import pyqs from '../data/pyqs.json';
import { PAPERS, PAPER_IDS } from '../data/pyqs/index';

interface PaperQ {
  id: string; questionNumber: number; section: string; text: string;
  type: string; options: Record<string, string>; correctAnswer: string;
}

const SUBJECT_FILTERS = ['ALL', 'GA', 'EM', 'DSA', 'ALGO', 'OS', 'DBMS', 'CN', 'TOC', 'CD'];

const SHIFT_LABELS: Record<string, string> = {
  cs: 'CS',
  shift1: 'SHIFT 1',
  shift2: 'SHIFT 2',
  shift3: 'SHIFT 3',
};

export default function PYQPage() {
  const [view, setView] = useState<'list' | 'paper'>('list');
  const [selectedPaper, setSelectedPaper] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<string>('shift1');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState('ALL');

  const paper = selectedPaper ? PAPERS[selectedPaper] : null;

  const paperQuestions = useMemo(() => {
    if (!paper) return [];
    const qs = paper.files[selectedShift] as PaperQ[] | undefined;
    if (!qs) return [];
    if (subjectFilter === 'ALL') return qs;
    return qs.filter((q) => q.section === subjectFilter);
  }, [paper, selectedShift, subjectFilter]);

  const shiftQuestionCounts = useMemo(() => {
    if (!paper) return {} as Record<string, number>;
    const counts: Record<string, number> = {};
    for (const shift of paper.shifts) {
      const qs = paper.files[shift] as PaperQ[] | undefined;
      counts[shift] = qs?.length ?? 0;
    }
    return counts;
  }, [paper]);

  if (view === 'paper' && paper) {
    return (
      <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <button onClick={() => { setView('list'); setSelectedPaper(null); }} className="text-[#DFE104] font-bold text-sm uppercase tracking-widest hover:underline mb-2 flex items-center gap-2">
              ← BACK TO PYQ LIST
            </button>
            <h1 className="text-4xl md:text-6xl font-black text-[#FAFAFA] tracking-tight uppercase">
              GATE {paper.year}
            </h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            {paper.shifts.map((s) => (
              <button key={s} onClick={() => { setSelectedShift(s); setSubjectFilter('ALL'); }} className={`px-4 py-2 text-xs font-black border-2 uppercase tracking-wider ${selectedShift === s ? 'bg-[#DFE104] text-black border-black' : 'bg-[#09090B] text-[#A1A1AA] border-[#3F3F46] hover:border-[#DFE104]'}`}>
                {SHIFT_LABELS[s] ?? s.toUpperCase()} ({shiftQuestionCounts[s] ?? 0})
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {SUBJECT_FILTERS.map((s) => (
            <button key={s} onClick={() => setSubjectFilter(s)} className={`px-3 py-1.5 text-xs font-black border-2 uppercase tracking-wider ${subjectFilter === s ? 'bg-[#DFE104] text-black border-black' : 'bg-[#09090B] text-[#A1A1AA] border-[#3F3F46] hover:border-[#DFE104]'}`}>
              {s}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {paperQuestions.map((q) => (
            <div key={q.id} className="bg-[#09090B] border-2 border-[#3F3F46] hover:border-[#DFE104] transition-colors overflow-hidden">
              <button onClick={() => setExpandedId(expandedId === q.id ? null : q.id)} className="w-full p-6 flex items-start gap-4 text-left">
                <div className="w-10 h-10 bg-[#27272A] border border-[#3F3F46] flex items-center justify-center font-black text-sm text-[#FAFAFA] shrink-0">
                  {q.questionNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 bg-[#27272A] text-[#DFE104] text-[10px] font-bold uppercase tracking-wider">{q.section}</span>
                    <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">{q.type === 'Integer' ? 'NUMERIC' : 'MCQ'}</span>
                  </div>
                  <p className="font-bold text-[#FAFAFA] text-base leading-relaxed">{q.text}</p>
                </div>
                <div className="text-[#A1A1AA] shrink-0 mt-2">
                  {expandedId === q.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {expandedId === q.id && (
                <div className="px-6 pb-6 border-t border-[#3F3F46] pt-4">
                  {q.type === 'Integer' ? (
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-[#A1A1AA] uppercase tracking-widest">Integer / Numeric Answer</p>
                      <div className="inline-flex items-center gap-3 p-4 bg-[#27272A]/20 border border-[#3F3F46]">
                        <CheckCircle size={16} className="text-emerald-500" />
                        <span className="font-bold text-emerald-400">Answer: {q.correctAnswer}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(q.options).map(([key, val]) => {
                        if (!val) return null;
                        const isCorrect = key === q.correctAnswer;
                        return (
                          <div key={key} className={`flex items-center gap-3 p-3 border ${isCorrect ? 'bg-emerald-950/30 border-emerald-700' : 'bg-[#27272A]/20 border-[#3F3F46]'}`}>
                            <div className={`w-8 h-8 flex items-center justify-center font-black text-sm shrink-0 ${isCorrect ? 'bg-emerald-700 text-white' : 'bg-[#27272A] text-[#A1A1AA]'}`}>
                              {key}
                            </div>
                            <span className={`font-bold text-sm ${isCorrect ? 'text-emerald-400' : 'text-[#FAFAFA]'}`}>{val}</span>
                            {isCorrect && <CheckCircle size={16} className="text-emerald-500 shrink-0 ml-auto" />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button onClick={() => { setView('list'); setSelectedPaper(null); }} className="text-[#A1A1AA] font-black text-sm hover:text-[#DFE104] transition-colors uppercase tracking-widest">
            ← RETURN TO PYQ LIST
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-[95vw] mx-auto">
      <div className="mb-12">
        <h1 className="text-5xl md:text-8xl font-black text-[#FAFAFA] mb-4 tracking-tight uppercase">PYQ INTELLIGENCE</h1>
        <p className="text-[#A1A1AA] text-lg font-bold">REAL PROBLEMS FROM PAST SEASONS RESOLVED LOGICALLY.</p>
      </div>

      <div className="mb-12 p-8 bg-[#09090B] border-2 border-[#3F3F46]">
        <h2 className="text-2xl font-black text-[#FAFAFA] mb-6 uppercase tracking-tight flex items-center gap-3">
          <FileText className="text-[#DFE104]" /> FULL PAPER BROWSER
        </h2>
        <p className="text-[#A1A1AA] text-sm font-bold mb-6">Browse complete GATE question papers with answers. Select a year to view all shifts and questions.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PAPER_IDS.map((id) => {
            const p = PAPERS[id];
            const totalQ = p.shifts.reduce((sum, s) => {
              const qs = p.files[s] as PaperQ[] | undefined;
              return sum + (qs?.length ?? 0);
            }, 0);
            return (
              <button key={id} onClick={() => { setSelectedPaper(id); setView('paper'); setSelectedShift(p.shifts[0]); setSubjectFilter('ALL'); }} className="p-6 bg-[#09090B] border-2 border-[#3F3F46] hover:border-[#DFE104] hover:bg-[#27272A]/40 transition-all text-left">
                <h3 className="font-black text-[#FAFAFA] text-lg mb-2 uppercase tracking-tight">GATE {p.year}</h3>
                <p className="text-[#A1A1AA] text-xs font-bold">{p.label} — {totalQ > 0 ? `${totalQ} questions` : 'No questions added yet'}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {pyqs.map((q) => (
          <div key={q.id} className="p-8 bg-[#09090B] border-2 border-[#3F3F46] hover:border-[#DFE104] transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-[#27272A] text-[#DFE104] text-xs font-bold uppercase tracking-wider">{q.subject}</span>
                <span className="px-3 py-1 bg-[#27272A] text-[#FAFAFA] text-xs font-bold uppercase tracking-wider">GATE {q.year}</span>
              </div>
              <span className="text-rose-500 font-bold text-xs uppercase tracking-widest">{q.difficulty}</span>
            </div>
            <h3 className="text-2xl font-black text-[#FAFAFA] tracking-tight mb-2 uppercase">{q.title}</h3>
            <p className="text-[#A1A1AA] text-sm font-bold mb-6">{q.snippet}</p>
            <a href={q.driveUrl} target="_blank" rel="noopener noreferrer" className="text-[#DFE104] font-black text-sm uppercase flex items-center gap-2 hover:underline">
              TRACE CALCULATION MAP <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
