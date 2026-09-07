import loopVideo from '../assets/loop-videou.mp4';

export const ShowcaseSection = () => {
  return (
    <section id="showcase" className="w-full py-32 px-6 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Premium Heading Section */}
        <div className="text-center mb-20 relative">
          {/* Huge background watermark text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] md:text-[8rem] font-heading font-black uppercase text-white/[0.03] tracking-[0.2em] whitespace-nowrap pointer-events-none select-none z-0">
            THE ARENA
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="text-[#d4af37] font-medium text-xs md:text-sm uppercase tracking-[0.4em] mb-4 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/60"></span>
              Enter the Zone
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/60"></span>
            </span>
            <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase tracking-wider text-white drop-shadow-2xl">
              The Main <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-white/70">Floor</span>
            </h2>
          </div>
        </div>
        
        {/* Cinematic Video Container */}
        <div className="w-full aspect-[4/5] md:aspect-[21/9] rounded-2xl bg-zinc-950 border border-white/10 relative overflow-hidden group shadow-[0_0_40px_rgba(212,175,55,0.05)] hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] hover:border-[#d4af37]/30 transition-all duration-700">
          
          {/* Dynamic Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10 pointer-events-none opacity-80"></div>
          
          {/* Showcase Video */}
          <div className="absolute inset-0">
             <video 
               src={loopVideo}
               autoPlay 
               loop 
               muted 
               playsInline 
               className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-1000 group-hover:scale-105"
             />
          </div>

          {/* Motivational Overlay - Always Visible, Enhanced on Hover */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 transform translate-y-2 group-hover:translate-y-0 transition-all duration-700 ease-out">
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase text-white mb-4 tracking-widest drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
                The Iron <span className="text-[#d4af37]">Sanctuary</span>
              </h3>
              
              <div className="border-l-2 border-[#d4af37] pl-5 py-2 backdrop-blur-sm bg-black/20 rounded-r-lg group-hover:bg-black/40 transition-colors duration-500">
                <p className="text-white font-medium tracking-[0.1em] md:tracking-[0.15em] uppercase text-sm md:text-base leading-relaxed drop-shadow-md">
                  Forge your legacy where shadows meet iron.
                </p>
                <p className="text-[#d4af37] font-light tracking-wide text-xs md:text-sm mt-2 opacity-90">
                  Every rep is a step toward elite mastery. Push limits. Break boundaries. Evolve.
                </p>
              </div>
            </div>
            
            <button className="w-14 h-14 shrink-0 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md hover:bg-[#d4af37] hover:border-[#d4af37] text-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L13 1M13 1H4.6M13 1V9.4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
