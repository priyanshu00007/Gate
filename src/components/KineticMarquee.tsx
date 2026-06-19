import { Zap } from 'lucide-react';

interface KineticMarqueeProps {
  text: string;
  direction?: "left" | "right";
}

export default function KineticMarquee({ text, direction = "left" }: KineticMarqueeProps) {
  return (
    <div className="w-full overflow-hidden bg-[#DFE104] py-4 border-y-2 border-black my-12">
      <div className={direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}>
        {Array(10).fill(text).map((chunk, idx) => (
          <span key={idx} className="text-black font-black text-2xl md:text-3xl tracking-tighter uppercase mx-4 flex items-center gap-4">
            {chunk} <Zap size={24} fill="black" />
          </span>
        ))}
      </div>
    </div>
  );
}
