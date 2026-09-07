// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CENTRAL GYM CONFIGURATION
// Change ALL business information from this file.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const gymConfig = {
  // ── Branding ──
  gymName: 'AURA FITNESS',
  tagline: 'Designing the next generation of physical excellence.',
  phone: '+91 62015 91947',
  email: 'info@aurafitness.com',
  address: 'Near 56-1, Nimta Rd, Kolkata',

  // ── Timings ──
  timings: {
    monday:    { open: '05:00', close: '23:00' },
    tuesday:   { open: '05:00', close: '23:00' },
    wednesday: { open: '05:00', close: '23:00' },
    thursday:  { open: '05:00', close: '23:00' },
    friday:    { open: '05:00', close: '23:00' },
    saturday:  { open: '06:00', close: '22:00' },
    sunday:    { open: '07:00', close: '20:00' },
  } as Record<string, { open: string; close: string }>,

  // ── Membership Plans ──
  registrationFee: 500,
  plans: [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 1999,
      duration: '1 Month',
      tag: 'POPULAR',
      benefits: [
        'Full gym access',
        'Locker facility',
        'Cardio zone access',
        'Free weight area',
        'Group classes',
      ],
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      price: 4999,
      duration: '3 Months',
      tag: 'BEST VALUE',
      benefits: [
        'Everything in Monthly',
        'Personal locker',
        'Towel service',
        'Guest pass (1/month)',
        'Nutrition guidance',
        'Body composition analysis',
      ],
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: 14999,
      duration: '12 Months',
      tag: 'PREMIUM',
      benefits: [
        'Everything in Quarterly',
        'Priority equipment access',
        'Recovery spa access',
        'Free personal training (2 sessions/month)',
        'Diet plan consultation',
        'Merchandise kit',
        'Freeze membership (up to 30 days)',
      ],
    },
  ],

  // ── Trainers ──
  trainers: [
    {
      id: 'trainer-1',
      name: 'Arjun Mehta',
      title: 'Head Strength Coach',
      photo: '/trainers/arjun.jpg',
      experience: '8+ Years',
      specializations: ['Strength Training', 'Powerlifting', 'Olympic Weightlifting'],
      skills: ['Periodization', 'Biomechanics', 'Injury Prevention', 'Competition Prep'],
      certifications: ['NSCA-CSCS', 'ACE-CPT', 'Precision Nutrition Level 1'],
      about: 'Arjun transforms raw potential into elite performance. With 8 years of coaching competitive powerlifters and everyday athletes, he designs programs that build strength from the ground up.',
      philosophy: 'Progressive overload with intelligent recovery. Every rep has a purpose.',
      availability: 'Mon–Sat, 6:00 AM – 12:00 PM',
      monthlyCharge: 5999,
      slots: ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'],
    },
    {
      id: 'trainer-2',
      name: 'Priya Sharma',
      title: 'Certified Fitness & Nutrition Specialist',
      photo: '/trainers/priya.jpg',
      experience: '6+ Years',
      specializations: ['Weight Loss', 'Functional Fitness', 'HIIT', 'Women\'s Fitness'],
      skills: ['Body Recomposition', 'Metabolic Conditioning', 'Mobility Training', 'Stress Management'],
      certifications: ['ACE-CPT', 'ISSA Nutritionist', 'TRX Certified'],
      about: 'Priya specializes in body transformation journeys. She combines science-based training with mindful nutrition to help members achieve sustainable results.',
      philosophy: 'Fitness is not a punishment — it\'s a celebration of what your body can do.',
      availability: 'Mon–Fri, 4:00 PM – 10:00 PM',
      monthlyCharge: 4999,
      slots: ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
    },
    {
      id: 'trainer-3',
      name: 'Vikram Singh',
      title: 'Cardio & Endurance Coach',
      photo: '/trainers/vikram.jpg',
      experience: '5+ Years',
      specializations: ['Marathon Training', 'Cardio Conditioning', 'Sports Performance'],
      skills: ['Heart Rate Zone Training', 'VO2 Max Optimization', 'Recovery Protocols', 'Flexibility'],
      certifications: ['ACSM-EP', 'NASM-CPT', 'First Aid & CPR'],
      about: 'Former marathon runner turned coach, Vikram brings an endurance athlete\'s mindset to every session. He builds cardiovascular engines that outlast any challenge.',
      philosophy: 'The body achieves what the mind believes. Train your mind first.',
      availability: 'Mon–Sat, 5:00 AM – 11:00 AM',
      monthlyCharge: 4499,
      slots: ['5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM'],
    },
    {
      id: 'trainer-4',
      name: 'Neha Kapoor',
      title: 'Yoga & Mobility Expert',
      photo: '/trainers/neha.jpg',
      experience: '7+ Years',
      specializations: ['Power Yoga', 'Mobility & Flexibility', 'Injury Rehabilitation', 'Mindfulness'],
      skills: ['Corrective Exercise', 'Breathwork', 'Myofascial Release', 'Postural Assessment'],
      certifications: ['RYT-500', 'NASM-CES', 'Yoga Alliance Certified'],
      about: 'Neha bridges the gap between intense training and mindful recovery. She helps athletes move better, recover faster, and prevent injuries through precision mobility work.',
      philosophy: 'Strength without flexibility is fragility. Balance is the ultimate performance tool.',
      availability: 'Mon–Fri, 6:00 AM – 2:00 PM',
      monthlyCharge: 3999,
      slots: ['6:00 AM', '7:30 AM', '9:00 AM', '10:30 AM', '12:00 PM', '1:00 PM'],
    },
  ],

  // ── Facilities ──
  facilities: [
    'State-of-the-art Equipment',
    'Cardio Zone',
    'Free Weight Area',
    'Functional Training Zone',
    'Recovery Spa',
    'Steam & Sauna',
    'Personal Locker Rooms',
    'Towel Service',
    'Filtered Water Stations',
    'Premium Sound System',
  ],

  // ── Sample Reviews (approved only shown publicly) ──
  reviews: [
    {
      id: 'r1',
      name: 'Rahul K.',
      rating: 5,
      review: 'Absolutely world-class facility. The equipment quality and ambiance make every workout feel premium. Best gym I\'ve ever trained in.',
      date: '2026-08-15',
      status: 'approved' as const,
    },
    {
      id: 'r2',
      name: 'Simran P.',
      rating: 5,
      review: 'The trainers here actually care about your progress. Priya helped me lose 12 kg in 4 months with a sustainable plan. Can\'t recommend enough!',
      date: '2026-07-22',
      status: 'approved' as const,
    },
    {
      id: 'r3',
      name: 'Aditya M.',
      rating: 4,
      review: 'Great gym with premium vibes. The recovery spa is a game changer after heavy leg days. Only wish they had slightly longer Sunday hours.',
      date: '2026-08-01',
      status: 'approved' as const,
    },
    {
      id: 'r4',
      name: 'Kavya R.',
      rating: 5,
      review: 'The cinematic lighting and industrial design make this place feel like a high-end studio. Training here is an experience, not just a workout.',
      date: '2026-08-20',
      status: 'approved' as const,
    },
  ],

  // ── Social Links ──
  socialLinks: {
    instagram: 'https://instagram.com/aurafitness',
    twitter: 'https://twitter.com/aurafitness',
    youtube: 'https://youtube.com/@aurafitness',
  },

  // ── Payment (public keys only — secrets go in backend .env) ──
  payment: {
    currency: 'INR',
    razorpayKeyId: '', // Set your Razorpay public key here
  },
};

// ── Type exports ──
export type Trainer = typeof gymConfig.trainers[number];
export type Plan = typeof gymConfig.plans[number];
export type Review = typeof gymConfig.reviews[number];
