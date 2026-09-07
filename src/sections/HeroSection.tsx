// Helper to calculate smooth cinematic styles
const getStageStyles = (progress: number, start: number, end: number) => {
  if (progress < start) return { opacity: 0, transform: 'translateY(40px)', filter: 'blur(10px)', pointerEvents: 'none' as 'auto' | 'none' };
  if (progress > end) return { opacity: 0, transform: 'translateY(-30px)', filter: 'blur(8px)', pointerEvents: 'none' as 'auto' | 'none' };

  const range = end - start;
  const localP = (progress - start) / range; // 0 to 1

  let opacity = 1;
  let y = 0;
  let blur = 0;
  let scale = 1;

  if (localP < 0.2) { // Fade in
    const inP = localP / 0.2;
    opacity = inP;
    y = 40 * (1 - inP);
    blur = 10 * (1 - inP);
    scale = 0.95 + (0.05 * inP);
  } else if (localP > 0.8) { // Fade out
    const outP = (localP - 0.8) / 0.2;
    opacity = 1 - outP;
    y = -30 * outP;
    blur = 8 * outP;
    scale = 1 + (0.05 * outP);
  }

  return {
    opacity,
    transform: `translateY(${y}px) scale(${scale})`,
    filter: `blur(${blur}px)`,
    transition: 'opacity 0.1s, transform 0.1s, filter 0.1s',
    pointerEvents: (opacity > 0.5 ? 'auto' : 'none') as 'auto' | 'none'
  };
};

interface HeroSectionProps {
  currentFrame: number;
  totalFrames: number;
}

export const HeroSection = ({ currentFrame, totalFrames }: HeroSectionProps) => {
  // We calculate progress relative to the entire page, but for the Hero text, 
  // we might want it to complete its 5 stages within the first X% of the page.
  // Since the entire page is the scroll trigger, progress goes 0 to 1 over the ENTIRE website.
  const globalProgress = currentFrame / (totalFrames - 1); 
  
  // We map the first 40% of the entire website scroll to the 5 stages of the Hero section.
  const progress = Math.min(1, globalProgress * 2.5); 

  return (
    <section className="relative w-full h-[300vh] font-sans pointer-events-none">
      
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden">
        
        {/* Global Dark Gradient for Mobile Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:hidden"></div>

        {/* Content Container */}
        <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center">
          
          {/* Left/Right Text Alignment constraint */}
          <div className="w-full h-full md:w-[40%] flex flex-col justify-end pb-24 md:pb-0 md:justify-center relative pointer-events-auto">
            
            {/* STAGE 1: 0 - 20% */}
            <div className="absolute left-0 right-0 md:top-1/2 md:-translate-y-1/2 flex flex-col" style={getStageStyles(progress, 0, 0.22)}>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05] uppercase mb-4">
                Your<br/>
                <span className="text-[#d4af37]">Strongest</span><br/>
                Version
              </h1>
              <p className="font-light tracking-[0.3em] text-sm md:text-base uppercase bg-gradient-to-r from-white/50 via-[#d4af37] to-white/50 bg-[length:200%_auto] text-transparent bg-clip-text animate-pulse">
                It starts with one decision.
              </p>
            </div>

            {/* STAGE 2: 20 - 40% */}
            <div className="absolute left-0 right-0 md:top-1/2 md:-translate-y-1/2 flex flex-col" style={getStageStyles(progress, 0.20, 0.42)}>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05] uppercase mb-4">
                Built For<br/>
                <span className="text-[#d4af37]">Performance</span>
              </h1>
              <div className="flex flex-col gap-2 border-l-2 border-[#d4af37] pl-4 text-white/70 font-light text-sm md:text-base">
                <p>Premium equipment.</p>
                <p>Purpose-built training zones.</p>
                <p>Everything you need to train harder.</p>
              </div>
            </div>

            {/* STAGE 3: 40 - 60% */}
            <div className="absolute left-0 right-0 md:top-1/2 md:-translate-y-1/2 flex flex-col" style={getStageStyles(progress, 0.40, 0.62)}>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05] uppercase mb-6">
                Train<br/>
                Without<br/>
                Limits
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-4 py-2 rounded border border-white/10 w-max">
                  <span className="text-[#d4af37] font-heading font-bold text-lg">01</span>
                  <span className="text-white font-medium tracking-wide uppercase text-sm">Strength</span>
                </div>
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-4 py-2 rounded border border-white/10 w-max">
                  <span className="text-[#d4af37] font-heading font-bold text-lg">02</span>
                  <span className="text-white font-medium tracking-wide uppercase text-sm">Cardio</span>
                </div>
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-4 py-2 rounded border border-white/10 w-max">
                  <span className="text-[#d4af37] font-heading font-bold text-lg">03</span>
                  <span className="text-white font-medium tracking-wide uppercase text-sm">Functional</span>
                </div>
              </div>
            </div>

            {/* STAGE 4: 60 - 85% */}
            <div className="absolute left-0 right-0 md:top-1/2 md:-translate-y-1/2 flex flex-col" style={getStageStyles(progress, 0.60, 0.86)}>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05] uppercase mb-4">
                More Than<br/>
                A Gym.<br/>
                <span className="text-white/60">A Space To</span><br/>
                <span className="text-[#d4af37]">Evolve.</span>
              </h1>
              <p className="text-white/70 font-light tracking-wide text-sm md:text-base leading-relaxed max-w-xs">
                Designed for focus.<br/>
                Built for consistency.<br/>
                Made for progress.
              </p>
            </div>

          </div>

          {/* STAGE 5 (Centered): 85 - 100% */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-auto" style={getStageStyles(progress, 0.85, 1.05)}>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white uppercase mb-4 drop-shadow-2xl">
              Ready To<br/>
              <span className="text-[#d4af37]">Level Up?</span>
            </h1>
            <p className="tracking-[0.3em] uppercase font-medium mb-10 text-sm md:text-base drop-shadow-md bg-gradient-to-r from-white/50 via-[#d4af37] to-white/50 bg-[length:200%_auto] text-transparent bg-clip-text animate-pulse">
              Your journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="px-10 py-4 bg-[#d4af37] text-black hover:bg-white transition-colors duration-300 font-bold tracking-widest uppercase text-sm w-full sm:w-auto">
                Join Now →
              </button>
              <button className="px-10 py-4 bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 transition-colors duration-300 font-bold tracking-widest uppercase text-sm w-full sm:w-auto">
                Explore Membership
              </button>
            </div>
          </div>

        </div>

        {/* Scroll / Progress Indicator */}
        <div className="absolute bottom-8 right-8 z-20 flex flex-col items-end gap-2 pointer-events-none hidden md:flex">
          <div className="text-white/50 font-heading tracking-widest text-sm flex items-center gap-4">
            {progress < 0.05 ? (
              <span className="animate-pulse text-[#d4af37]">SCROLL TO EXPLORE ↓</span>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-xl">0{Math.min(5, Math.max(1, Math.ceil(progress * 5)))}</span>
                <span className="text-white/30 text-lg">/ 05</span>
              </div>
            )}
          </div>
          {/* Progress Bar */}
          <div className="w-32 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <div 
              className="h-full bg-[#d4af37]" 
              style={{ width: `${progress * 100}%` }}
            ></div>
          </div>
        </div>

      </div>
    </section>
  );
};
