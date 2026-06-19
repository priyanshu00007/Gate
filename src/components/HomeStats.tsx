import stats from '../data/stats.json';

export default function HomeStats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#3F3F46] border-2 border-[#3F3F46] max-w-[95vw] mx-auto my-20">
      {stats.map((stat, i) => (
        <div key={i} className="bg-[#09090B] p-10 text-center hover:bg-[#27272A]/40 transition-colors">
          <div className="text-[5rem] font-black text-[#DFE104] tracking-tighter leading-none mb-3">{stat.value}</div>
          <div className="text-[#A1A1AA] text-sm font-bold tracking-wider">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
