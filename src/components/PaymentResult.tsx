import React, { useState, useEffect, useMemo } from 'react';

export interface PaymentResultProps {
  status: 'success' | 'failed' | 'pending';
  onClose: () => void;
  planName?: string;
  amount?: number;
  isOpen?: boolean;
  onTryAgain?: () => void;
  onChangePaymentMethod?: () => void;
  onViewMembership?: () => void;
}

export const PaymentResult: React.FC<PaymentResultProps> = ({
  status,
  onClose,
  planName,
  amount,
  isOpen = true,
  onTryAgain,
  onChangePaymentMethod,
  onViewMembership,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  // Generate random Membership ID once per mount (e.g. AURA-8X42K)
  const membershipId = useMemo(() => {
    const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `AURA-${randomChars}`;
  }, []);

  // Mounting and unmounting animations
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

  if (!isRendered) return null;

  const formattedAmount = amount !== undefined
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount)
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-result-title"
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8 transition-all duration-300 transform ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (X) button top-right */}
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* State: SUCCESS */}
        {status === 'success' && (
          <div className="text-center py-4 space-y-6">
            {/* Green checkmark */}
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block">
                Transaction Successful
              </span>
              <h2
                id="payment-result-title"
                className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide text-white"
              >
                MEMBERSHIP CONFIRMED
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Welcome to Aura Fitness. Your pass is now active and ready for club access.
              </p>
            </div>

            {/* Plan Details & Membership ID */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left space-y-2.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-gray-400 uppercase tracking-wider text-[10px]">
                  Membership ID
                </span>
                <span className="font-mono text-sm font-bold text-[#d4af37] tracking-wider">
                  Membership ID: {membershipId}
                </span>
              </div>

              {planName && (
                <div className="flex justify-between text-gray-300">
                  <span className="text-gray-400">Plan Tier:</span>
                  <span className="font-medium text-white">{planName}</span>
                </div>
              )}

              {formattedAmount && (
                <div className="flex justify-between text-gray-300">
                  <span className="text-gray-400">Amount Paid:</span>
                  <span className="font-mono text-white font-semibold">{formattedAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-300">
                <span className="text-gray-400">Access Status:</span>
                <span className="text-emerald-400 font-medium">All Facilities Unlocked</span>
              </div>
            </div>

            {/* CTA Buttons: VIEW MEMBERSHIP + BACK TO HOME */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onViewMembership || onClose}
                className="flex-1 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e5be48] active:scale-[0.99] text-black font-semibold tracking-wider uppercase text-xs font-heading shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer"
              >
                VIEW MEMBERSHIP
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-[0.99] text-white font-semibold tracking-wider uppercase text-xs font-heading transition-colors duration-200 cursor-pointer"
              >
                BACK TO HOME
              </button>
            </div>
          </div>
        )}

        {/* State: FAILED */}
        {status === 'failed' && (
          <div className="text-center py-4 space-y-6">
            {/* Red X Icon */}
            <div className="w-20 h-20 mx-auto rounded-full bg-red-500/15 border-2 border-red-500/40 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.25)]">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-red-400 font-semibold block">
                Transaction Incomplete
              </span>
              <h2
                id="payment-result-title"
                className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide text-white"
              >
                PAYMENT FAILED
              </h2>
              <p className="text-sm text-gray-300 font-medium pt-1">
                Your payment could not be completed.
              </p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed pt-1">
                No funds were deducted. Your card issuer or UPI switch may have declined the request. Please verify details or choose an alternate option.
              </p>
            </div>

            {/* Error detail placeholder */}
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15 text-left text-xs space-y-1.5">
              {planName && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Attempted Plan:</span>
                  <span className="text-white">{planName}</span>
                </div>
              )}
              {formattedAmount && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Attempted Amount:</span>
                  <span className="font-mono text-white">{formattedAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Error Code:</span>
                <span className="font-mono text-red-400">ERR_AUTH_DECLINED</span>
              </div>
            </div>

            {/* Buttons: TRY AGAIN + CHANGE PAYMENT METHOD */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onTryAgain || onClose}
                className="flex-1 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e5be48] active:scale-[0.99] text-black font-semibold tracking-wider uppercase text-xs font-heading shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer"
              >
                TRY AGAIN
              </button>
              <button
                type="button"
                onClick={onChangePaymentMethod || onClose}
                className="flex-1 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-[0.99] text-white font-semibold tracking-wider uppercase text-xs font-heading transition-colors duration-200 cursor-pointer"
              >
                CHANGE PAYMENT METHOD
              </button>
            </div>
          </div>
        )}

        {/* State: PENDING */}
        {status === 'pending' && (
          <div className="text-center py-6 space-y-6">
            {/* Yellow / Golden Spinner */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
                Verification in Progress
              </span>
              <h2
                id="payment-result-title"
                className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide text-white"
              >
                PAYMENT PENDING
              </h2>
              <p className="text-sm text-gray-300 font-medium pt-1">
                Your payment is being verified.
              </p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed pt-1">
                We are synchronizing with your payment provider. Do not close or refresh this tab while confirmation is pending.
              </p>
            </div>

            {/* Pending card info */}
            {(planName || formattedAmount) && (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-1.5">
                {planName && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order:</span>
                    <span className="text-white">{planName}</span>
                  </div>
                )}
                {formattedAmount && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount:</span>
                    <span className="font-mono text-white">{formattedAmount}</span>
                  </div>
                )}
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer"
              >
                Dismiss / Check Later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
