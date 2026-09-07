import { gymConfig, type Review } from '../data/gymConfig';

interface ReviewsSectionProps {
  onWriteReview: () => void;
}

export const ReviewsSection = ({ onWriteReview }: ReviewsSectionProps) => {
  const approvedReviews: Review[] = gymConfig.reviews.filter(
    (review) => review.status === 'approved'
  );

  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section id="reviews" className="w-full py-32 px-6 relative z-10">
      {/* Decorative top border glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 backdrop-blur-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-medium">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-wider text-white mb-2">
              Member <span className="text-[#d4af37]">Reviews</span>
            </h2>
            <p className="text-gray-400 font-light text-base md:text-lg">
              Real experiences from our community.
            </p>
          </div>

          {/* Write a Review Action Button */}
          <div>
            <button
              onClick={onWriteReview}
              className="px-8 py-4 rounded-full border border-[#d4af37] bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#d4af37] hover:text-black font-heading uppercase tracking-widest text-xs font-semibold transition-all duration-300 shadow-lg shadow-[#d4af37]/10 flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {approvedReviews.map((review) => {
            const initials = getInitials(review.name);

            return (
              <div
                key={review.id}
                className="group relative rounded-3xl bg-black/60 backdrop-blur-md border border-white/10 hover:border-[#d4af37]/40 transition-all duration-500 p-8 sm:p-10 flex flex-col justify-between"
              >
                {/* Subtle card glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#d4af37]/10 transition-all duration-500" />

                <div>
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    {/* Star rating: ★ filled gold, ☆ empty */}
                    <div className="flex items-center gap-1" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg transition-transform duration-300 group-hover:scale-110 ${
                            i < review.rating ? 'text-[#d4af37]' : 'text-zinc-600'
                          }`}
                        >
                          {i < review.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs text-gray-500 font-light">
                      {formatDate(review.date)}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-300 font-light text-base sm:text-lg leading-relaxed mb-8 italic">
                    "{review.review}"
                  </p>
                </div>

                {/* Member Profile Footer */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-[#d4af37]/30 flex items-center justify-center shadow-inner">
                      <span className="font-heading text-xs font-bold text-[#d4af37]">
                        {initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-heading uppercase tracking-wide text-white group-hover:text-[#d4af37] transition-colors duration-300">
                        {review.name}
                      </h4>
                      <span className="text-[11px] text-emerald-400/80 font-light flex items-center gap-1">
                        <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        Verified Member
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[#d4af37]/60">
                    {review.rating}.0 / 5.0
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
