import { Link } from 'react-router-dom';
import footerData from '../data/footer.json';

export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-[#3F3F46] py-20 px-4 mt-20">
      <div className="max-w-[95vw] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div>
          <Link to="/" className="text-3xl font-black tracking-tighter uppercase text-[#FAFAFA] mb-4 inline-block">
            GATE <span className="text-[#DFE104]">it</span>
          </Link>
          <p className="text-[#A1A1AA] text-sm font-bold max-w-sm uppercase leading-relaxed">{footerData.tagline}</p>
        </div>
        <div className="flex gap-12 flex-wrap">
          {footerData.sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-black text-xs text-[#3F3F46] uppercase tracking-widest mb-4">{section.title}</h4>
              <ul className="text-sm font-bold text-[#A1A1AA] space-y-2 uppercase">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.page ? (
                      <Link to={`/${link.page}`} className="hover:text-[#FAFAFA] transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <span>{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-[95vw] mx-auto border-t border-[#27272A] mt-16 pt-8 text-center text-[#3F3F46] text-xs font-black uppercase tracking-widest">
        &copy; {footerData.copyright}
      </div>
    </footer>
  );
}
