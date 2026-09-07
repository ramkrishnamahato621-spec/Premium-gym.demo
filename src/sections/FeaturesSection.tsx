export const FeaturesSection = () => {
  const features = [
    {
      title: 'Elite Equipment',
      description: 'Hand-selected biomechanically perfect machines and custom free-weight stations.',
    },
    {
      title: 'Ambient Lighting',
      description: 'Cinematic, mood-enhancing illumination that reduces fatigue and sharpens focus.',
    },
    {
      title: 'Recovery Spa',
      description: 'Cold plunges, infrared saunas, and hydrotherapy designed for rapid muscle recovery.',
    },
    {
      title: 'Bespoke Training',
      description: 'Private pods and expert coaching tailored entirely to your personal physiology.',
    }
  ];

  return (
    <section id="features" className="w-full py-32 px-6 relative z-10">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-white mb-4">
              Uncompromising <br className="hidden md:block" />
              <span className="font-medium text-[#d4af37]">Amenities</span>
            </h2>
          </div>
          <p className="text-gray-400 font-light max-w-md">
            Built on a foundation of modern luxury, prioritizing performance, 
            privacy, and aesthetic brilliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative p-10 rounded-2xl bg-black/60 backdrop-blur-md border border-white/5 hover:border-[#d4af37]/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.2)]"
            >
              {/* Premium Inner Glow */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/10 group-hover:to-transparent transition-colors duration-700 pointer-events-none"></div>
              
              <div className="relative z-10 w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-[#d4af37]/10 border border-transparent group-hover:border-[#d4af37]/30 transition-all duration-500 group-hover:scale-110">
                <span className="text-white/50 font-heading text-lg font-bold tracking-widest group-hover:text-[#d4af37] transition-colors duration-500">
                  {`0${idx + 1}`}
                </span>
              </div>
              
              <h3 className="relative z-10 text-2xl text-white font-medium mb-4 tracking-wide group-hover:text-[#d4af37] transition-colors duration-500 font-heading uppercase">
                {feature.title}
              </h3>
              
              <p className="relative z-10 text-gray-400 font-light leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
