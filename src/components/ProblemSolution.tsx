import { X, CheckCircle } from 'lucide-react';
import content from '../data/problemSolution.json';

export default function ProblemSolution() {
  return (
    <section className="py-24 px-4 max-w-[95vw] mx-auto border-t-2 border-[#3F3F46]">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#FAFAFA]">{content.heading}</h2>
        <p className="text-lg text-[#A1A1AA] font-bold mt-4">{content.subheading}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="p-8 md:p-12 border-2 border-[#3F3F46] bg-[#09090B]">
          <h3 className="text-3xl font-black text-rose-500 uppercase tracking-tight mb-8 flex items-center gap-3">
            <X size={28} /> {content.problem.title}
          </h3>
          <ul className="space-y-6 text-[#A1A1AA] text-lg font-medium">
            {content.problem.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-rose-500 font-bold">&#8226;</span> {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 md:p-12 border-2 border-black bg-[#DFE104] text-black">
          <h3 className="text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
            <CheckCircle size={28} /> {content.solution.title}
          </h3>
          <ul className="space-y-6 text-black text-lg font-bold">
            {content.solution.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span>&#10003;</span> {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
