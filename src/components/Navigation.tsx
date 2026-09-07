import { useState } from 'react';
import { gymConfig } from '../data/gymConfig';

export const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Membership', href: '#membership' },
    { label: 'Timings', href: '#timings' },
    { label: 'Reviews', href: '#reviews' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex flex-col drop-shadow-2xl">
        {/* Main Nav Bar */}
        <nav className="w-full transition-all duration-500 bg-black/20 backdrop-blur-xl border-b border-[#d4af37]/20 relative z-20">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img 
                src="/logo.jpg" 
                alt="Aura Fitness Logo" 
                className="w-12 h-12 rounded-full border border-[#d4af37]/30 group-hover:border-[#d4af37] transition-all duration-300 object-cover"
              />
              <span className="text-white text-xl font-heading font-bold tracking-widest uppercase hidden sm:block group-hover:text-[#d4af37] transition-colors duration-300">
                {gymConfig.gymName}
              </span>
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8 text-sm text-gray-300 tracking-wide font-medium">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="hover:text-[#d4af37] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer uppercase text-xs"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollTo('#membership')}
                className="px-6 py-2 bg-[#d4af37] hover:bg-white text-black rounded-sm text-xs uppercase font-bold tracking-widest transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 z-50 relative"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Premium Animated Welcome Line below Nav */}
        <div className="w-full bg-[#d4af37]/10 backdrop-blur-sm border-b border-[#d4af37]/20 py-1.5 overflow-hidden flex items-center justify-center relative z-10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <p className="text-[#d4af37] text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium whitespace-nowrap animate-pulse">
            Welcome to Aura Fitness — Designing the next generation of physical excellence.
          </p>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-2xl text-white font-heading font-bold tracking-widest uppercase hover:text-[#d4af37] transition-colors duration-300 cursor-pointer"
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo('#membership')}
          className="mt-4 px-10 py-4 bg-[#d4af37] text-black font-bold tracking-widest uppercase text-sm hover:bg-white transition-colors duration-300 cursor-pointer"
        >
          Join Now
        </button>
      </div>
    </>
  );
};
