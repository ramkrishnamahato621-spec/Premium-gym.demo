import React, { useEffect, useState } from 'react';
import { type Trainer } from '../data/gymConfig';

export interface TrainerModalProps {
  trainer: Trainer | null;
  isOpen: boolean;
  onClose: () => void;
  onBookTraining: (trainerId: string) => void;
}

export const TrainerModal: React.FC<TrainerModalProps> = ({
  trainer,
  isOpen,
  onClose,
  onBookTraining,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  // Handle mounting and unmounting animations
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => setIsVisible(true), 15);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
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

  if (!isRendered || !trainer) return null;

  // Extract initials for placeholder
  const initials = trainer.name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const formattedCharge = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(trainer.monthlyCharge);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trainer-modal-title"
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-all duration-300 transform ${
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

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Header Section with Photo Placeholder & Identity */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2">
            {/* Large Photo Placeholder */}
            <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border-2 border-[#d4af37]/40 shadow-[0_0_25px_rgba(212,175,55,0.2)] flex items-center justify-center overflow-hidden">
              {trainer.photo ? (
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center select-none">
                  <span className="font-heading text-4xl sm:text-5xl font-bold tracking-wider text-[#d4af37]">
                    {initials}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-gray-400 font-sans mt-1">
                    Coach
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Name, Title, Experience */}
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-block px-2.5 py-1 mb-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-medium tracking-wider uppercase">
                {trainer.experience} Experience
              </div>
              <h2
                id="trainer-modal-title"
                className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white"
              >
                {trainer.name}
              </h2>
              <p className="text-sm uppercase tracking-widest text-[#d4af37] font-medium mt-1">
                {trainer.title}
              </p>
              <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-400">
                <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{trainer.availability}</span>
              </div>
            </div>
          </div>

          {/* About Paragraph */}
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">
              About Coach
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {trainer.about}
            </p>
          </div>

          {/* Training Philosophy Quote */}
          <div className="relative pl-4 border-l-2 border-[#d4af37] bg-[#d4af37]/5 rounded-r-xl p-4">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
              Training Philosophy
            </span>
            <p className="text-white italic text-sm sm:text-base leading-relaxed">
              &ldquo;{trainer.philosophy}&rdquo;
            </p>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">
              Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              {trainer.specializations.map((spec) => (
                <span
                  key={spec}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs font-medium text-gray-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Skills List */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">
              Key Skills & Methodologies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {trainer.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Qualifications / Certifications Tags */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">
              Certifications & Credentials
            </h3>
            <div className="flex flex-wrap gap-2">
              {trainer.certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#d4af37] text-xs font-medium"
                >
                  <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Available Slots */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">
              Available Daily Training Slots
            </h3>
            <div className="flex flex-wrap gap-2">
              {trainer.slots.map((slot) => (
                <span
                  key={slot}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/10 text-xs text-gray-300 font-mono"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bar: Monthly Charge & Golden CTA */}
        <div className="p-4 sm:p-6 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs text-gray-400 uppercase tracking-wider block">
              Personal Coaching
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-wide">
                {formattedCharge}
              </span>
              <span className="text-xs text-gray-400 font-sans">/ month</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onBookTraining(trainer.id)}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e5be48] active:scale-[0.99] text-black font-semibold tracking-wider uppercase text-sm font-heading shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer"
          >
            BOOK PERSONAL TRAINING
          </button>
        </div>
      </div>
    </div>
  );
};
