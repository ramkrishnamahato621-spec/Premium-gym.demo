import { gymConfig, type Trainer } from '../data/gymConfig';

interface TrainersSectionProps {
  onTrainerClick: (trainer: Trainer) => void;
}

export const TrainersSection = ({ onTrainerClick }: TrainersSectionProps) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section id="trainers" className="w-full py-32 px-6 relative z-10">
      {/* Decorative top border glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 backdrop-blur-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-medium">Master Coaches</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-wider text-white">
              Our <span className="text-[#d4af37]">Trainers</span>
            </h2>
          </div>
          <p className="text-gray-400 font-light max-w-md text-base md:text-lg">
            Expert guidance for every fitness goal.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gymConfig.trainers.map((trainer) => {
            const initials = getInitials(trainer.name);

            return (
              <div
                key={trainer.id}
                role="button"
                tabIndex={0}
                onClick={() => onTrainerClick(trainer)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onTrainerClick(trainer);
                  }
                }}
                className="group relative cursor-pointer rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#d4af37]/60 transition-all duration-500 p-6 flex flex-col justify-between overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-[#d4af37]/70"
              >
                {/* Subtle card ambient highlight */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#d4af37]/15 transition-all duration-500" />

                {/* Top: Avatar and Experience */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    {/* Photo or Initials */}
                    <div className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-br from-[#d4af37]/50 via-white/10 to-zinc-900 group-hover:from-[#d4af37] group-hover:to-[#d4af37]/40 transition-all duration-500">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex items-center justify-center shadow-inner overflow-hidden">
                        {trainer.photo ? (
                          <img src={trainer.photo} alt={trainer.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-heading text-xl font-bold tracking-wider text-[#d4af37] group-hover:scale-110 transition-transform duration-300">
                            {initials}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Experience Tag */}
                    <span className="text-[11px] uppercase tracking-wider font-medium text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {trainer.experience}
                    </span>
                  </div>

                  {/* Name and Title */}
                  <h3 className="text-xl font-heading uppercase tracking-wide text-white group-hover:text-[#d4af37] transition-colors duration-300 line-clamp-1">
                    {trainer.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-light mt-1 mb-5 line-clamp-1">
                    {trainer.title}
                  </p>

                  {/* Specializations Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {trainer.specializations.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-gray-300 group-hover:border-white/15 transition-colors duration-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: Monthly Charge */}
                <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                  <span className="text-xs text-gray-400 font-light uppercase tracking-wider">
                    Monthly
                  </span>
                  <div className="text-right">
                    <span className="font-heading text-lg font-medium text-white group-hover:text-[#d4af37] transition-colors duration-300">
                      ₹{trainer.monthlyCharge.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-gray-400 font-sans ml-1">/mo</span>
                  </div>
                </div>

                {/* Subtle 'View Profile' Hover Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-black/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center z-20 pointer-events-none">
                  <div className="w-12 h-12 rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-[#d4af37]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-heading uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
                    View Profile
                  </span>
                  <p className="text-xs text-gray-300 font-light line-clamp-2 px-2 italic">
                    "{trainer.philosophy}"
                  </p>
                  <span className="mt-4 inline-block text-[11px] uppercase tracking-wider text-black bg-[#d4af37] font-medium px-4 py-1.5 rounded-full">
                    Book Session
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
