import { useState, useEffect, useMemo } from 'react';
import { gymConfig } from '../data/gymConfig';

export const GymTimingsSection = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Update time every 30 seconds for live status calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const DAY_KEYS = useMemo(
    () => ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const,
    []
  );

  const SCHEDULE_DAYS = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ] as const;

  const currentDayKey = DAY_KEYS[currentDate.getDay()];
  const todayTiming = gymConfig.timings[currentDayKey];

  // Format 24h string "05:00" to "5:00 AM"
  const formatTime = (timeStr: string): string => {
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHours = h % 12 || 12;
    const displayMinutes = m.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${period}`;
  };

  // Check if open right now
  const isOpen = useMemo(() => {
    if (!todayTiming) return false;
    const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
    const [openH, openM] = todayTiming.open.split(':').map(Number);
    const [closeH, closeM] = todayTiming.close.split(':').map(Number);
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;
    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }, [currentDate, todayTiming]);

  // Format current local time string for the clock
  const formattedCurrentTime = currentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <section id="timings" className="w-full py-32 px-6 relative z-10">
      {/* Decorative top divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 backdrop-blur-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-medium">Operating Schedule</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading uppercase tracking-wider text-white">
              Gym <span className="text-[#d4af37]">Hours</span>
            </h2>
          </div>

          {/* Prominent Live Status Badge in Header */}
          <div className="flex items-center gap-4">
            {isOpen ? (
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-heading text-sm md:text-base font-semibold tracking-wider uppercase shadow-lg shadow-emerald-950/40">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                OPEN NOW
              </div>
            ) : (
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-heading text-sm md:text-base font-semibold tracking-wider uppercase shadow-lg shadow-rose-950/40">
                <span className="relative flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                </span>
                CLOSED
              </div>
            )}
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Status & Today's Hours Card */}
          <div className="lg:col-span-5 rounded-3xl bg-black/60 backdrop-blur-md border border-white/10 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                  Current Status
                </span>
                <span className="text-xs font-mono text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  {formattedCurrentTime} Local
                </span>
              </div>

              {/* Status Display */}
              <div className="mb-8">
                <div className="text-5xl sm:text-6xl font-heading uppercase tracking-wide mb-3">
                  {isOpen ? (
                    <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                      Open Now
                    </span>
                  ) : (
                    <span className="text-rose-400 drop-shadow-[0_0_15px_rgba(251,113,133,0.3)]">
                      Closed
                    </span>
                  )}
                </div>
                <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">
                  {isOpen
                    ? `Doors are open today until ${formatTime(todayTiming?.close || '')}. Drop in and forge your strength.`
                    : `Doors open at ${formatTime(todayTiming?.open || '')}. Rest and recover for your next session.`}
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/10 my-8" />

              {/* Location & Quick Contact */}
              <div className="space-y-4 text-sm text-gray-300 font-light">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-[#d4af37]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-400">Location</span>
                    <span className="text-white text-sm">{gymConfig.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-[#d4af37]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-400">Direct Inquiries</span>
                    <span className="text-white text-sm">{gymConfig.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Weekly Timetable */}
          <div className="lg:col-span-7 rounded-3xl bg-black/60 backdrop-blur-md border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Day of the Week</span>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Operating Hours</span>
            </div>

            <div className="space-y-3">
              {SCHEDULE_DAYS.map((day) => {
                const schedule = gymConfig.timings[day.key];
                const isToday = day.key === currentDayKey;

                return (
                  <div
                    key={day.key}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      isToday
                        ? 'bg-[#d4af37]/10 border border-[#d4af37]/40 shadow-lg shadow-[#d4af37]/5'
                        : 'bg-white/[0.02] border border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isToday ? (
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4af37]" />
                        </span>
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      )}

                      <span
                        className={`text-base font-heading uppercase tracking-wide ${
                          isToday ? 'text-[#d4af37] font-semibold' : 'text-gray-200'
                        }`}
                      >
                        {day.label}
                      </span>

                      {isToday && (
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-[#d4af37] text-black px-2 py-0.5 rounded-full ml-1">
                          Today
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-sm md:text-base font-medium tracking-wider ${
                          isToday ? 'text-white' : 'text-gray-300'
                        }`}
                      >
                        {formatTime(schedule.open)} – {formatTime(schedule.close)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
