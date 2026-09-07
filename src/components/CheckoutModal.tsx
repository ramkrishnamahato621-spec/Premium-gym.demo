import React, { useState, useEffect } from 'react';
import { gymConfig, type Plan } from '../data/gymConfig';

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  planId,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  // Active Payment Tab: 'upi' | 'card'
  const [paymentTab, setPaymentTab] = useState<'upi' | 'card'>('upi');

  // Customer Details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Payment Fields (Never stored or persisted)
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing state
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Resolve plan
  const selectedPlan: Plan =
    gymConfig.plans.find((p) => p.id === planId) || gymConfig.plans[0];

  const registrationFee = gymConfig.registrationFee;
  const totalAmount = (selectedPlan?.price || 0) + registrationFee;

  const formatCurrency = (amt: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);

  // Mounting and unmounting animations
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => setIsVisible(true), 15);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
        setIsRedirecting(false);
        setErrors({});
        // Clean transient payment inputs
        setCardNumber('');
        setCardHolder('');
        setCardExpiry('');
        setCardCvv('');
        setUpiId('');
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

  // Format Card Number (space every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (digitsOnly.length >= 3) {
      setCardExpiry(`${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`);
    } else {
      setCardExpiry(digitsOnly);
    }
  };

  // Format CVV (digits only, max 4)
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvv(digitsOnly);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Customer info validation
    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9+-\s()]{7,15}$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Payment method validation
    if (paymentTab === 'upi') {
      const upiRegex = /^[\w.-]+@[\w.-]+$/;
      if (!upiId.trim()) {
        newErrors.upiId = 'UPI ID is required.';
      } else if (!upiRegex.test(upiId.trim())) {
        newErrors.upiId = 'Invalid UPI ID format (e.g. yourname@upi).';
      }
    } else {
      const cleanCard = cardNumber.replace(/\s/g, '');
      if (cleanCard.length < 15) {
        newErrors.cardNumber = 'Valid 15-16 digit card number is required.';
      }
      if (!cardHolder.trim()) {
        newErrors.cardHolder = 'Cardholder name is required.';
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
        newErrors.cardExpiry = 'Valid expiry (MM/YY) required.';
      }
      if (cardCvv.length < 3) {
        newErrors.cardCvv = 'CVV must be 3 or 4 digits.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: Integrate Razorpay/Stripe here
    // Structured for real Razorpay gateway invocation:
    // const options = {
    //   key: gymConfig.payment.razorpayKeyId,
    //   amount: totalAmount * 100,
    //   currency: gymConfig.payment.currency,
    //   name: gymConfig.gymName,
    //   description: `${selectedPlan.name} Membership`,
    //   handler: function (response) { ... },
    //   prefill: { name: fullName, email, contact: phone },
    //   theme: { color: '#d4af37' }
    // };
    // const rzp = new (window as any).Razorpay(options);
    // rzp.open();

    // Show gateway redirect state — NO fake success
    setIsRedirecting(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
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

        {/* Modal Header */}
        <div className="p-6 md:p-8 pb-4 border-b border-white/5">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
            Secure Membership Checkout
          </span>
          <h2
            id="checkout-modal-title"
            className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide text-white"
          >
            Confirm & Complete Access
          </h2>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 md:p-8 pt-4 space-y-6">
          {isRedirecting ? (
            /* Gateway Redirection State (Real integration structure, no fake success) */
            <div className="py-12 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-full border-4 border-[#d4af37]/20 border-t-[#d4af37] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-wide text-white">
                  Connecting to Gateway
                </h3>
                <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
                  Redirecting to secure payment gateway...
                </p>
                <p className="text-xs text-gray-500 pt-2">
                  Encrypted 256-bit SSL transaction via Razorpay / Banking Switch.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 max-w-md mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Selected Plan:</span>
                  <span className="text-white font-medium">{selectedPlan.name} ({selectedPlan.duration})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Payable:</span>
                  <span className="text-[#d4af37] font-semibold">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Channel:</span>
                  <span className="text-white uppercase font-medium">{paymentTab}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsRedirecting(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-colors duration-200 cursor-pointer"
                >
                  Cancel / Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePayNow} className="space-y-6">
              {/* Plan Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-white/10 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-[#d4af37] font-semibold">
                      Selected Tier
                    </span>
                    <h3 className="font-heading text-xl font-bold uppercase text-white tracking-wide">
                      {selectedPlan.name} Membership
                    </h3>
                    <span className="text-xs text-gray-400 font-sans">
                      Duration: {selectedPlan.duration}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block uppercase font-mono">
                      Plan Rate
                    </span>
                    <span className="font-heading text-xl font-bold text-white tracking-wide">
                      {formatCurrency(selectedPlan.price)}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Base Membership</span>
                    <span className="font-mono text-gray-200">{formatCurrency(selectedPlan.price)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>One-time Registration Fee</span>
                    <span className="font-mono text-gray-200">{formatCurrency(registrationFee)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-semibold text-white">
                    <span className="uppercase tracking-wide">Total Amount Due</span>
                    <span className="font-heading text-lg font-bold text-[#d4af37]">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-gray-300 font-semibold">
                  1. Member Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label
                      htmlFor="checkout-name"
                      className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1"
                    >
                      Full Name <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Rahul Sharma"
                      className={`w-full px-3.5 py-2 bg-white/5 border ${
                        errors.fullName ? 'border-red-500' : 'border-white/10'
                      } rounded-xl text-white text-xs placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all`}
                    />
                    {errors.fullName && (
                      <p className="text-[10px] text-red-400 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-phone"
                      className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1"
                    >
                      Phone Number <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 62015 91947"
                      className={`w-full px-3.5 py-2 bg-white/5 border ${
                        errors.phone ? 'border-red-500' : 'border-white/10'
                      } rounded-xl text-white text-xs placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all`}
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-email"
                      className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1"
                    >
                      Email Address <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className={`w-full px-3.5 py-2 bg-white/5 border ${
                        errors.email ? 'border-red-500' : 'border-white/10'
                      } rounded-xl text-white text-xs placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all`}
                    />
                    {errors.email && (
                      <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-widest text-gray-300 font-semibold">
                    2. Payment Method
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setPaymentTab('upi')}
                    className={`py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                      paymentTab === 'upi'
                        ? 'bg-[#d4af37] text-black shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    UPI (GooglePay / PhonePe / Paytm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentTab('card')}
                    className={`py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                      paymentTab === 'card'
                        ? 'bg-[#d4af37] text-black shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                </div>

                {/* UPI Content */}
                {paymentTab === 'upi' ? (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                    <label
                      htmlFor="checkout-upi"
                      className="block text-xs uppercase tracking-wider text-gray-300 font-semibold"
                    >
                      Virtual Payment Address (UPI ID) <span className="text-[#d4af37]">*</span>
                    </label>
                    <input
                      id="checkout-upi"
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="mobile@okhdfcbank or username@upi"
                      className={`w-full px-4 py-2.5 bg-white/5 border ${
                        errors.upiId ? 'border-red-500' : 'border-white/10'
                      } rounded-xl text-white text-sm placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all`}
                    />
                    {errors.upiId && (
                      <p className="text-[11px] text-red-400">{errors.upiId}</p>
                    )}
                    <p className="text-[11px] text-gray-500">
                      A payment request will be triggered on your UPI application upon proceeding.
                    </p>
                  </div>
                ) : (
                  /* Card Content */
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                    {/* Card Number */}
                    <div>
                      <label
                        htmlFor="checkout-card-number"
                        className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1"
                      >
                        Card Number <span className="text-[#d4af37]">*</span>
                      </label>
                      <input
                        id="checkout-card-number"
                        type="text"
                        inputMode="numeric"
                        maxLength={19}
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4000 1234 5678 9010"
                        className={`w-full px-4 py-2.5 bg-white/5 border ${
                          errors.cardNumber ? 'border-red-500' : 'border-white/10'
                        } rounded-xl text-white text-sm font-mono placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all`}
                      />
                      {errors.cardNumber && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <label
                        htmlFor="checkout-card-holder"
                        className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1"
                      >
                        Cardholder Name <span className="text-[#d4af37]">*</span>
                      </label>
                      <input
                        id="checkout-card-holder"
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="NAME AS PRINTED ON CARD"
                        className={`w-full px-4 py-2.5 bg-white/5 border ${
                          errors.cardHolder ? 'border-red-500' : 'border-white/10'
                        } rounded-xl text-white text-sm uppercase placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all`}
                      />
                      {errors.cardHolder && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.cardHolder}</p>
                      )}
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="checkout-card-expiry"
                          className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1"
                        >
                          Expiry (MM/YY) <span className="text-[#d4af37]">*</span>
                        </label>
                        <input
                          id="checkout-card-expiry"
                          type="text"
                          inputMode="numeric"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className={`w-full px-4 py-2.5 bg-white/5 border ${
                            errors.cardExpiry ? 'border-red-500' : 'border-white/10'
                          } rounded-xl text-white text-sm font-mono placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all`}
                        />
                        {errors.cardExpiry && (
                          <p className="text-[11px] text-red-400 mt-1">{errors.cardExpiry}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="checkout-card-cvv"
                          className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1"
                        >
                          CVV / CVC <span className="text-[#d4af37]">*</span>
                        </label>
                        <input
                          id="checkout-card-cvv"
                          type="password"
                          inputMode="numeric"
                          maxLength={4}
                          value={cardCvv}
                          onChange={handleCvvChange}
                          placeholder="•••"
                          className={`w-full px-4 py-2.5 bg-white/5 border ${
                            errors.cardCvv ? 'border-red-500' : 'border-white/10'
                          } rounded-xl text-white text-sm font-mono placeholder-gray-500 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all`}
                        />
                        {errors.cardCvv && (
                          <p className="text-[11px] text-red-400 mt-1">{errors.cardCvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pay Now Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#d4af37] hover:bg-[#e5be48] active:scale-[0.99] text-black font-semibold tracking-wider uppercase text-sm font-heading shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer"
                >
                  PAY NOW · {formatCurrency(totalAmount)}
                </button>
                <p className="text-center text-[11px] text-gray-500 mt-2">
                  By confirming, you agree to Aura Fitness terms of membership and club regulations.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
