import { WeightRackModel } from '../components/WeightRackModel';

export const AboutSection = () => {
  return (
    <section id="about" className="w-full min-h-[100dvh] flex items-center py-24 px-6 relative z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-[#050505] overflow-hidden">
      
      {/* Premium Architectural Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

      {/* Volumetric Cyan Lighting Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-cyan-900/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
        
        {/* Antigravity Glassmorphic Container */}
        <div className="order-2 md:order-1 relative animate-float">
          <div className="aspect-[4/5] w-full rounded-3xl overflow-hidden bg-white/[0.02] backdrop-blur-3xl border border-white/10 relative shadow-[inset_0_0_40px_rgba(255,255,255,0.03),0_20px_50px_rgba(0,0,0,0.8)]">
            {/* 3D Model Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <WeightRackModel />
            </div>
            {/* Edge reflection for acrylic feel */}
            <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none mix-blend-overlay"></div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="order-1 md:order-2 flex flex-col justify-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-900/50 bg-cyan-900/10 backdrop-blur-md mb-6 w-max shadow-[0_0_15px_rgba(8,145,178,0.2)]">
            <span className="text-[10px] font-medium tracking-[0.2em] text-cyan-400 uppercase">Next-Gen Oasis</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold tracking-tight text-white mb-8 uppercase leading-[1.05] drop-shadow-xl">
            Experience <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Weightless</span><br />
            Excellence
          </h2>
          
          {/* Soft Dark Semi-Transparent Card for Text Legibility */}
          <div className="bg-black/40 backdrop-blur-[12px] p-8 rounded-2xl border border-white/5 shadow-2xl relative mb-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-transparent"></div>
            <p className="text-lg text-gray-200 font-medium leading-relaxed mb-6">
              We believe the environment dictates the outcome. Every material, lighting fixture, 
              and training zone has been meticulously engineered to inspire focus and drive results.
            </p>
            <div className="w-full h-[1px] bg-white/10 mb-6"></div>
            <p className="text-gray-300 font-medium leading-relaxed">
              Experience a dark, cinematic space where industrial perfection meets warm ambient lighting, 
              creating the ultimate sanctuary for elite physical conditioning.
            </p>
          </div>

          {/* Magnetic Neon Hover CTA Button */}
          <button 
            className="group relative w-max px-10 py-4 bg-black border border-[#d4af37]/50 rounded-full font-heading font-bold uppercase tracking-widest text-[#d4af37] overflow-hidden transition-all duration-500 hover:text-black hover:border-transparent hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] focus:outline-none"
            onClick={() => {
              const el = document.querySelector('#membership');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="absolute inset-0 bg-[#d4af37] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
            <span className="relative z-10 transition-colors duration-500">Join Now</span>
          </button>
        </div>
      </div>
    </section>
  );
};
