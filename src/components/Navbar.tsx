import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import navItems from '../data/navbar.json';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const activePage = pathname === '/' ? 'home' : pathname.slice(1);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#09090B] border-b-2 border-[#3F3F46]">
      <div className="max-w-[95vw] mx-auto px-4 lg:px-8 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-[#DFE104] p-2 border-2 border-black text-black scale-95 hover:scale-105 transition-transform duration-150">
            <BookOpen size={24} strokeWidth={3} />
          </div>
          <span className="font-bold text-3xl tracking-tighter text-[#FAFAFA]">
            GATE <span className="text-[#DFE104]">it</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id === 'home' ? '/' : `/${item.id}`}
              className={`px-4 py-2 text-sm font-bold tracking-tight transition-all duration-150 ${activePage === item.id ? 'bg-[#DFE104] text-black border-2 border-black' : 'text-[#FAFAFA] hover:bg-[#27272A] border-2 border-transparent'}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/join"
            className="ml-4 bg-[#DFE104] text-black border-2 border-black px-6 py-2 text-sm font-bold tracking-tighter hover:scale-105 active:scale-95 transition-all duration-150"
          >
            JOIN SPRINT
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-3 bg-[#27272A] border-2 border-[#3F3F46] text-[#FAFAFA] active:bg-[#DFE104] active:text-black transition-all"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#09090B] border-t-2 border-[#3F3F46] p-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id === 'home' ? '/' : `/${item.id}`}
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-5 py-4 font-bold tracking-tight text-lg border-2 ${activePage === item.id ? 'bg-[#DFE104] text-black border-black' : 'text-[#FAFAFA] border-[#3F3F46] hover:bg-[#27272A]'}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/join"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-[#DFE104] text-black py-4 font-bold text-lg border-2 border-black"
          >
            JOIN SPRINT
          </Link>
        </div>
      )}
    </nav>
  );
}
