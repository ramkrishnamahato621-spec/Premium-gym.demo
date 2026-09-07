import { gymConfig, type Plan } from '../data/gymConfig';

interface MembershipSectionProps {
  onJoinNow: (planId: string) => void;
}

export const MembershipSection = ({ onJoinNow }: MembershipSectionProps) => {
  return (
    <section id="membership" className="w-full py-32 px-6 relative z-10">
      {/* Decorative gradient divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 backdrop-blur-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-medium">Commit To Greatness</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-wider text-white mb-4">
            Membership <span className="text-[#d4af37]">Plans</span>
          </h2>
          <p className="text-gray-400 font-light text-base md:text-lg">
            Choose your path to transformation.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {gymConfig.plans.map((plan: Plan) => {
            const isBestValue = plan.tag === 'BEST VALUE';

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 ${
                  isBestValue
                    ? 'bg-black/75 backdrop-blur-md border-2 border-[#d4af37] shadow-2xl shadow-[#d4af37]/15 lg:-translate-y-4 lg:scale-[1.03] z-20'
                    : 'bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/25 z-10'
                }`}
              >
                {/* Floating Best Value Badge */}
                {isBestValue && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#d4af37] text-black text-xs font-heading font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    Best Value
                  </div>
                )}

                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span
                      className={`text-xs font-heading font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${
                        isBestValue
                          ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40'
                          : 'bg-white/5 text-gray-300 border border-white/10'
                      }`}
                    >
                      {plan.tag}
                    </span>
                    <span className="text-xs text-gray-400 font-light uppercase tracking-wider">
                      {plan.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-heading uppercase tracking-wide text-white mb-4">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg md:text-xl font-heading text-[#d4af37]">₹</span>
                      <span className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-white">
                        {plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-gray-400 font-light text-sm ml-2">
                        / {plan.duration}
                      </span>
                    </div>

                    {/* Registration fee note */}
                    <p className="text-xs text-gray-500 font-light mt-2">
                      + ₹{gymConfig.registrationFee.toLocaleString('en-IN')} one-time registration fee
                    </p>
                  </div>

                  <div className="w-full h-[1px] bg-white/10 my-6" />

                  {/* Benefits List */}
                  <div className="space-y-3.5 mb-8">
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-3">
                      Included Privileges:
                    </p>
                    {plan.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#d4af37]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#d4af37]/30">
                          <svg
                            className="w-2.5 h-2.5 text-[#d4af37]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-300 font-light leading-relaxed">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom: CTA Button */}
                <div className="pt-4">
                  <button
                    onClick={() => onJoinNow(plan.id)}
                    className={`w-full py-4 rounded-full font-heading font-semibold text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group ${
                      isBestValue
                        ? 'bg-[#d4af37] text-black hover:bg-white hover:shadow-xl hover:shadow-white/20'
                        : 'bg-white/10 hover:bg-white hover:text-black text-white border border-white/15'
                    }`}
                  >
                    <span>Join Now</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
