export const CTASection = () => {
  return (
    <section className="w-full py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8">
          Ready to <span className="font-medium">Transform?</span>
        </h2>
        <p className="text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">
          Join the vanguard of physical fitness. Reserve your exclusive membership and start your journey today.
        </p>
        <button className="px-10 py-5 bg-white text-black rounded-full font-medium tracking-wide hover:scale-105 transition-transform duration-300">
          Apply for Membership
        </button>
      </div>
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};
