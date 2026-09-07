import { gymConfig } from '../data/gymConfig';

export const Footer = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full pt-20 pb-10 px-6 border-t border-white/5 relative z-10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        {/* Branding */}
        <div className="md:col-span-1">
          <div className="text-white text-2xl font-bold tracking-widest uppercase mb-4 font-heading">
            {gymConfig.gymName}
          </div>
          <p className="text-gray-500 font-light text-sm leading-relaxed mb-4">
            {gymConfig.tagline}
          </p>
          <p className="text-gray-600 text-xs">{gymConfig.address}</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3 text-sm font-light">
          <span className="text-white/40 font-medium tracking-widest uppercase mb-2 text-xs">Navigate</span>
          <button onClick={() => scrollTo('#about')} className="text-gray-400 hover:text-[#d4af37] transition-colors text-left cursor-pointer">About</button>
          <button onClick={() => scrollTo('#trainers')} className="text-gray-400 hover:text-[#d4af37] transition-colors text-left cursor-pointer">Trainers</button>
          <button onClick={() => scrollTo('#membership')} className="text-gray-400 hover:text-[#d4af37] transition-colors text-left cursor-pointer">Membership</button>
          <button onClick={() => scrollTo('#timings')} className="text-gray-400 hover:text-[#d4af37] transition-colors text-left cursor-pointer">Gym Hours</button>
          <button onClick={() => scrollTo('#reviews')} className="text-gray-400 hover:text-[#d4af37] transition-colors text-left cursor-pointer">Reviews</button>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-3 text-sm font-light">
          <span className="text-white/40 font-medium tracking-widest uppercase mb-2 text-xs">Connect</span>
          <a href={gymConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors">Instagram</a>
          <a href={gymConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors">Twitter</a>
          <a href={gymConfig.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition-colors">YouTube</a>
          <a href={`mailto:${gymConfig.email}`} className="text-gray-400 hover:text-[#d4af37] transition-colors">{gymConfig.email}</a>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3 text-sm font-light">
          <span className="text-white/40 font-medium tracking-widest uppercase mb-2 text-xs">Contact</span>
          <a href={`tel:${gymConfig.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-[#d4af37] transition-colors">{gymConfig.phone}</a>
          <p className="text-gray-600 text-xs leading-relaxed">{gymConfig.address}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-gray-600 font-light">
        <p>© {new Date().getFullYear()} {gymConfig.gymName}. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Forged with precision.</p>
      </div>
    </footer>
  );
};
