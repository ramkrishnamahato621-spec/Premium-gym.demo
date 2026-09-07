import React, { useState, useEffect } from 'react';
import { gymConfig, type Trainer } from '../data/gymConfig';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTrainerId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedTrainerId,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  // Form State
  const defaultTrainerId =
    preselectedTrainerId ||
    (gymConfig.trainers.length > 0 ? gymConfig.trainers[0].id : '');
  const [trainerId, setTrainerId] = useState<string>(defaultTrainerId);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [trainingGoal, setTrainingGoal] = useState('');

  // Status state: 'idle' | 'submitted'
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitted'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Sync preselected trainer on open or prop change
  useEffect(() => {
    if (preselectedTrainerId) {
      setTrainerId(preselectedTrainerId);
    } else if (gymConfig.trainers.length > 0 && !trainerId) {
      setTrainerId(gymConfig.trainers[0].id);
    }
  }, [preselectedTrainerId, isOpen]);

  // Current selected trainer object
  const selectedTrainer: Trainer | undefined = gymConfig.trainers.find(
    (t) => t.id === trainerId
  ) || gymConfig.trainers[0];

  // Auto-select first slot when trainer changes or when opening
  useEffect(() => {
    if (selectedTrainer && selectedTrainer.slots.length > 0) {
      if (!selectedTrainer.slots.includes(preferredTime)) {
        setPreferredTime(selectedTrainer.slots[0]);
      }
    }
  }, [selectedTrainer, preferredTime]);

  // Handle mounting and unmounting animations
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => setIsVisible(true), 15);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
        setSubmissionStatus('idle');
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

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^[0-9+-\s()]{7,15}$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!preferredDate) newErrors.preferredDate = 'Please select a preferred date.';
    if (!preferredTime) newErrors.preferredTime = 'Please select a preferred time.';
    if (!trainingGoal.trim()) newErrors.trainingGoal = 'Please state your training goal.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Show pending state (do NOT fake a successful booking)
    setSubmissionStatus('submitted');
  };

  const resetAndClose = () => {
    onClose();
  };

  // Get today's date formatted as YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const formattedFee = selectedTrainer
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(selectedTrainer.monthlyCharge)
    : '—';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={resetAndClose}
    >
      <div
        className={`relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-all duration-300 transform ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (X) button top-right */}
        <button
          type="button"
          aria-label="Close modal"
          onClick={resetAndClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="p-6 md:p-8 pb-4 border-b border-white/5">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
            Personal Coaching
          </span>
          <h2
            id="booking-modal-title"
            className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide text-white"
          >
            Schedule Training Session
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Reserve your consultation and tailored session with our elite coaches.
          </p>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 md:p-8 pt-4">
          {submissionStatus === 'submitted' ? (
            /* Pending State Display (Do NOT fake successful booking) */
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase">
                  Pending Confirmation
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide text-white">
                  Booking Request Received
                </h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Booking request submitted. Our team will contact you to confirm.
                </p>
              </div>

              {/* Request Summary Card */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Coach:</span>
                  <span className="text-white font-medium">{selectedTrainer?.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Preferred Date:</span>
                  <span className="text-white font-medium">{preferredDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Preferred Time Slot:</span>
                  <span className="text-white font-medium">{preferredTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-gray-400">Client:</span>
                  <span className="text-white font-medium">{fullName} ({phone})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Coaching Fee:</span>
                  <span className="text-[#d4af37] font-semibold">{formattedFee}/mo</span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Trainer Dropdown */}
              <div>
                <label
                  htmlFor="trainer-select"
                  className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5"
                >
                  Select Coach
                </label>
                <div className="relative">
                  <select
                    id="trainer-select"
                    value={trainerId}
                    onChange={(e) => setTrainerId(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none appearance-none transition-all cursor-pointer"
                  >
                    {gymConfig.trainers.map((t) => (
                      <option key={t.id} value={t.id} className="bg-zinc-900 text-white">
                        {t.name} — {t.title}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Selected Trainer Banner & Fee */}
              {selectedTrainer && (
                <div className="p-3.5 rounded-xl bg-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                      {selectedTrainer.name}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {selectedTrainer.specializations.slice(0, 2).join(' • ')}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 uppercase block">Monthly Fee</span>
                    <span className="font-heading text-lg font-bold text-white tracking-wide">
                      {formattedFee}
                      <span className="text-xs font-sans text-gray-400">/mo</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5"
                  >
                    Full Name <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                      errors.fullName ? 'border-red-500' : 'border-white/10'
                    } rounded-xl text-white text-sm placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5"
                  >
                    Phone Number <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 62015 91947"
                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                      errors.phone ? 'border-red-500' : 'border-white/10'
                    } rounded-xl text-white text-sm placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Preferred Date & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5"
                  >
                    Preferred Date <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    min={todayStr}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                      errors.preferredDate ? 'border-red-500' : 'border-white/10'
                    } rounded-xl text-white text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all [color-scheme:dark]`}
                  />
                  {errors.preferredDate && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-time"
                    className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5"
                  >
                    Preferred Time Slot <span className="text-[#d4af37]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="booking-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className={`w-full px-4 py-2.5 bg-white/5 border ${
                        errors.preferredTime ? 'border-red-500' : 'border-white/10'
                      } rounded-xl text-white text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none appearance-none transition-all cursor-pointer`}
                    >
                      {selectedTrainer?.slots.map((slot) => (
                        <option key={slot} value={slot} className="bg-zinc-900 text-white">
                          {slot}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.preferredTime && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              {/* Training Goal Textarea */}
              <div>
                <label
                  htmlFor="booking-goal"
                  className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1.5"
                >
                  Training Goal / Notes <span className="text-[#d4af37]">*</span>
                </label>
                <textarea
                  id="booking-goal"
                  rows={3}
                  value={trainingGoal}
                  onChange={(e) => setTrainingGoal(e.target.value)}
                  placeholder="Describe your primary fitness goal, health considerations, or target milestones..."
                  className={`w-full px-4 py-2.5 bg-white/5 border ${
                    errors.trainingGoal ? 'border-red-500' : 'border-white/10'
                  } rounded-xl text-white text-sm placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all resize-none`}
                />
                {errors.trainingGoal && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.trainingGoal}</p>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e5be48] active:scale-[0.99] text-black font-semibold tracking-wider uppercase text-sm font-heading shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer"
                >
                  BOOK TRAINING
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
