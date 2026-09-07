import React, { useState, useEffect } from 'react';

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');

  // Status State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Mounting and unmounting transitions
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => setIsVisible(true), 15);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
        // Reset state on close
        setName('');
        setRating(0);
        setHoverRating(0);
        setReviewText('');
        setIsSubmitted(false);
        setErrors({});
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  // Sanitize helper: strip any HTML tags
  const sanitize = (val: string): string => {
    return val.replace(/<[^>]*>?/gm, '').trim();
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const cleanName = sanitize(name);
    const cleanReview = sanitize(reviewText);

    if (!cleanName) {
      newErrors.name = 'Your name is required.';
    } else if (cleanName.length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters.';
    }

    if (rating < 1) {
      newErrors.rating = 'Please choose a rating of at least 1 star.';
    }

    if (!cleanReview) {
      newErrors.reviewText = 'Review text is required.';
    } else if (cleanReview.length > 500) {
      newErrors.reviewText = 'Review cannot exceed 500 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Sanitize before submitting
    const sanitizedName = sanitize(name);
    const sanitizedReview = sanitize(reviewText);

    // Ready for API or state update with sanitized data:
    // { name: sanitizedName, rating, review: sanitizedReview }
    void sanitizedName;
    void sanitizedReview;

    setIsSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-all duration-300 transform ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (X) button top-right */}
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="p-6 md:p-8 pb-4 border-b border-white/5">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
            Member Experience
          </span>
          <h2
            id="review-modal-title"
            className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide text-white"
          >
            Leave Your Review
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Share your transformation story and feedback with the Aura Fitness community.
          </p>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 md:p-8 pt-4">
          {isSubmitted ? (
            /* Submission Confirmation Screen */
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide text-white">
                  Feedback Received
                </h3>
                <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for your feedback! Your review is pending approval.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Review Submission Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Star Rating (1-5 clickable gold stars) */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                  Overall Rating <span className="text-[#d4af37]">*</span>
                </label>
                <div
                  className="flex items-center gap-2"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isActive = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        className="p-1 text-3xl sm:text-4xl transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                      >
                        <span
                          className={`transition-colors duration-200 ${
                            isActive
                              ? 'text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]'
                              : 'text-zinc-700 hover:text-zinc-500'
                          }`}
                        >
                          ★
                        </span>
                      </button>
                    );
                  })}
                  <span className="text-xs text-gray-400 font-medium ml-2">
                    {rating > 0 ? `${rating} of 5 Stars` : 'Select rating'}
                  </span>
                </div>
                {errors.rating && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.rating}</p>
                )}
              </div>

              {/* Name Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="review-name"
                    className="block text-xs uppercase tracking-wider text-gray-300 font-semibold"
                  >
                    Your Name <span className="text-[#d4af37]">*</span>
                  </label>
                  <span className="text-[11px] text-gray-500">
                    {name.length}/50
                  </span>
                </div>
                <input
                  id="review-name"
                  type="text"
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul K."
                  className={`w-full px-4 py-2.5 bg-white/5 border ${
                    errors.name ? 'border-red-500' : 'border-white/10'
                  } rounded-xl text-white text-sm placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Review Textarea with Counter */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    htmlFor="review-text"
                    className="block text-xs uppercase tracking-wider text-gray-300 font-semibold"
                  >
                    Your Review <span className="text-[#d4af37]">*</span>
                  </label>
                  <span
                    className={`text-[11px] ${
                      reviewText.length > 480 ? 'text-[#d4af37]' : 'text-gray-500'
                    }`}
                  >
                    {reviewText.length} / 500
                  </span>
                </div>
                <textarea
                  id="review-text"
                  rows={4}
                  maxLength={500}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about your fitness journey, the equipment, coaching quality, or facility ambiance..."
                  className={`w-full px-4 py-2.5 bg-white/5 border ${
                    errors.reviewText ? 'border-red-500' : 'border-white/10'
                  } rounded-xl text-white text-sm placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all resize-none`}
                />
                {errors.reviewText && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.reviewText}</p>
                )}
              </div>

              {/* Submit Review CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e5be48] active:scale-[0.99] text-black font-semibold tracking-wider uppercase text-sm font-heading shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer"
                >
                  SUBMIT REVIEW
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
