import { useState, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { TrainersSection } from './sections/TrainersSection';
import { MembershipSection } from './sections/MembershipSection';
import { GymTimingsSection } from './sections/GymTimingsSection';
import { ShowcaseSection } from './sections/ShowcaseSection';
import { ReviewsSection } from './sections/ReviewsSection';
import { CTASection } from './sections/CTASection';
import { Footer } from './components/Footer';
import { ImageSequenceCanvas } from './components/ImageSequenceCanvas';
import { TrainerModal } from './components/TrainerModal';
import { BookingModal } from './components/BookingModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ReviewModal } from './components/ReviewModal';
import { PaymentResult } from './components/PaymentResult';
import type { Trainer } from './data/gymConfig';

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const totalFrames = 100;

  // ── Modal states ──
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [trainerModalOpen, setTrainerModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingTrainerId, setBookingTrainerId] = useState<string | undefined>();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutPlanId, setCheckoutPlanId] = useState<string | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [paymentResultOpen, setPaymentResultOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'pending'>('pending');
  const [paymentPlanName, setPaymentPlanName] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);

  const imagePath = (index: number) =>
    `/sequence/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;

  // ── Handlers ──
  const handleTrainerClick = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setTrainerModalOpen(true);
  };

  const handleBookTraining = (trainerId: string) => {
    setTrainerModalOpen(false);
    setBookingTrainerId(trainerId);
    setBookingModalOpen(true);
  };

  const handleJoinNow = (planId: string) => {
    setCheckoutPlanId(planId);
    setCheckoutModalOpen(true);
  };

  // This is where a real payment gateway callback would trigger
  // For now, we just expose the result screen structure
  const _showPaymentResult = (status: 'success' | 'failed' | 'pending', planName: string, amount: number) => {
    setPaymentStatus(status);
    setPaymentPlanName(planName);
    setPaymentAmount(amount);
    setCheckoutModalOpen(false);
    setPaymentResultOpen(true);
  };

  // Suppress unused variable warning — this is intentionally ready for backend integration
  void _showPaymentResult;

  return (
    <div ref={appRef} className="relative w-full min-h-[100dvh] text-white selection:bg-white/30 selection:text-white font-sans overflow-x-hidden bg-black">

      {/* Full Page Fixed Animation Background */}
      <ImageSequenceCanvas
        frameCount={totalFrames}
        imagePath={imagePath}
        scrollContainerRef={appRef}
        onFrameUpdate={(frame) => setCurrentFrame(frame)}
      />

      <Navigation />

      <div className="relative z-10">
        <HeroSection currentFrame={currentFrame} totalFrames={totalFrames} />
        <AboutSection />
        <FeaturesSection />
        <TrainersSection onTrainerClick={handleTrainerClick} />
        <MembershipSection onJoinNow={handleJoinNow} />
        <GymTimingsSection />
        <ShowcaseSection />
        <ReviewsSection onWriteReview={() => setReviewModalOpen(true)} />
        <CTASection />
        <Footer />
      </div>

      {/* ── Modals ── */}
      <TrainerModal
        trainer={selectedTrainer}
        isOpen={trainerModalOpen}
        onClose={() => setTrainerModalOpen(false)}
        onBookTraining={handleBookTraining}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedTrainerId={bookingTrainerId}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        planId={checkoutPlanId}
      />

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
      />

      {/* PaymentResult visibility controlled by state */}
      {paymentResultOpen && (
        <PaymentResult
          status={paymentStatus}
          onClose={() => setPaymentResultOpen(false)}
          planName={paymentPlanName}
          amount={paymentAmount}
          onTryAgain={() => {
            setPaymentResultOpen(false);
            setCheckoutModalOpen(true);
          }}
          onChangePaymentMethod={() => {
            setPaymentResultOpen(false);
            setCheckoutModalOpen(true);
          }}
          onViewMembership={() => setPaymentResultOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
