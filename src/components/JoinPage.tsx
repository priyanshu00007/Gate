import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="pt-40 pb-20 px-4 max-w-xl mx-auto text-center">
        <div className="w-24 h-24 bg-[#DFE104] text-black border-2 border-black flex items-center justify-center mx-auto mb-8 shadow-lg">
          <CheckCircle size={48} />
        </div>
        <h1 className="text-4xl font-black text-[#FAFAFA] tracking-tighter mb-4 uppercase">SPRINT CONFIRMED.</h1>
        <p className="text-[#A1A1AA] text-lg font-bold mb-10">THE STARTER PROTOCOL AND PEER KEY ACCESS HAVE BEEN SENT TO YOUR INBOX. LOCK SENSORS AND PREPARE FOR SESSIONS.</p>
        <button onClick={() => setSubmitted(false)} className="bg-[#DFE104] text-black font-black border-2 border-black py-4 px-8 tracking-tight hover:scale-105 transition-transform">REGISTER NEW CANDIDATE</button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-2xl mx-auto">
      <div className="bg-[#09090B] border-2 border-[#3F3F46] p-10 relative overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-black text-[#FAFAFA] tracking-tighter mb-4 uppercase">LOCK TARGET SPRINT</h1>
        <p className="text-[#A1A1AA] text-sm font-bold mb-10 uppercase">PROVIDE ACCREDITATION VECTORS TO ENABLE INTERFACES.</p>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <div className="space-y-3">
            <label className="text-xs font-black tracking-widest text-[#DFE104] uppercase block">TARGET YEAR INDEX</label>
            <div className="grid grid-cols-3 gap-4">
              {['2027', '2028', '2029'].map(year => (
                <button key={year} type="button" className="py-4 border-2 border-[#3F3F46] hover:border-[#DFE104] font-black text-lg transition-all focus:border-[#DFE104] text-[#FAFAFA]">
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black tracking-widest text-[#DFE104] uppercase block">ACTIVE COMMUNICATION VECTOR (EMAIL)</label>
            <input type="email" placeholder="CANDIDATE@COGNITIVE.COM" className="w-full p-5 bg-[#27272A]/40 border-2 border-[#3F3F46] focus:border-[#DFE104] text-[#FAFAFA] outline-none font-bold uppercase transition-colors" required />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black tracking-widest text-[#DFE104] uppercase block">CURRENT CONCEPTUAL VELOCITY</label>
            <select className="w-full p-5 bg-[#09090B] border-2 border-[#3F3F46] focus:border-[#DFE104] text-[#FAFAFA] outline-none font-bold uppercase cursor-pointer">
              <option>starting from absolute zero</option>
              <option>partial curriculum integration done</option>
              <option>revision loops active</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-[#DFE104] text-black py-6 border-2 border-black font-black text-2xl tracking-tighter hover:scale-[1.02] transition-transform">
            INITIATE ENLISTMENT PROTOCOL &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
