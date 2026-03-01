import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const dayName = dayNames[time.getDay()];
  const monthName = monthNames[time.getMonth()];
  const date = time.getDate();
  const year = time.getFullYear();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden selection:bg-amber-500 selection:text-black">
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Accent line - top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent opacity-60" />

      {/* Main clock container */}
      <main className="relative z-10 flex flex-col items-center px-4">
        {/* Day label */}
        <div className="font-mono text-[#ff6b35] tracking-[0.4em] text-xs sm:text-sm md:text-base mb-2 md:mb-4 animate-fade-in">
          {dayName}
        </div>

        {/* Time display */}
        <div className="flex items-center justify-center">
          {/* Hours */}
          <div className="flex">
            <TimeDigit digit={hours[0]} delay={0} />
            <TimeDigit digit={hours[1]} delay={50} />
          </div>

          {/* Separator */}
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 mx-2 sm:mx-4 md:mx-6">
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-[#ff6b35] animate-pulse-slow" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-[#ff6b35] animate-pulse-slow animation-delay-500" />
          </div>

          {/* Minutes */}
          <div className="flex">
            <TimeDigit digit={minutes[0]} delay={100} />
            <TimeDigit digit={minutes[1]} delay={150} />
          </div>
        </div>

        {/* Seconds */}
        <div className="mt-4 md:mt-8 flex items-center gap-1">
          <span className="font-mono text-[#555] text-xs sm:text-sm tracking-widest">SEC</span>
          <div className="font-mono text-[#f5f5f0] text-2xl sm:text-3xl md:text-4xl tracking-wider ml-2 tabular-nums">
            <span
              key={`sec-${seconds}`}
              className="inline-block animate-tick"
            >
              {seconds}
            </span>
          </div>
        </div>

        {/* Date */}
        <div className="mt-6 md:mt-12 flex items-center gap-2 sm:gap-4 text-[#666] font-mono text-sm sm:text-base md:text-lg tracking-widest">
          <span>{monthName}</span>
          <span className="text-[#ff6b35]">{date}</span>
          <span className="text-[#444]">/</span>
          <span>{year}</span>
        </div>
      </main>

      {/* Decorative elements */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-32 left-4 sm:left-8 md:left-16 flex flex-col gap-1 opacity-30">
        <div className="w-8 sm:w-12 md:w-16 h-px bg-[#ff6b35]" />
        <div className="w-4 sm:w-6 md:w-8 h-px bg-[#ff6b35]" />
        <div className="w-2 sm:w-3 md:w-4 h-px bg-[#ff6b35]" />
      </div>

      <div className="absolute top-20 sm:top-24 md:top-32 right-4 sm:right-8 md:right-16 flex flex-col gap-1 opacity-30 items-end">
        <div className="w-8 sm:w-12 md:w-16 h-px bg-[#ff6b35]" />
        <div className="w-4 sm:w-6 md:w-8 h-px bg-[#ff6b35]" />
        <div className="w-2 sm:w-3 md:w-4 h-px bg-[#ff6b35]" />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center">
        <p className="font-mono text-[10px] sm:text-xs text-[#444] tracking-wider">
          Requested by <span className="text-[#555]">@web-user</span> · Built by <span className="text-[#555]">@clonkbot</span>
        </p>
      </footer>

      {/* Accent line - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#333] to-transparent" />
    </div>
  );
}

function TimeDigit({ digit, delay }: { digit: string; delay: number }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        key={digit}
        className="block font-display text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] leading-none text-[#f5f5f0] animate-digit-enter tabular-nums"
        style={{
          textShadow: '0 0 80px rgba(255, 107, 53, 0.15)',
          WebkitTextStroke: '1px rgba(255, 107, 53, 0.1)'
        }}
      >
        {digit}
      </span>
    </div>
  );
}

export default App;
