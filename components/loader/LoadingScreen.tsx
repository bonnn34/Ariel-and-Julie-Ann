'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useReducedMotion } from 'motion/react';
import { useSiteConfig } from '@/hooks/use-site-config';
import Image from 'next/image';


interface LoadingScreenProps {
  /** Fires when the hand-off starts — the invitation cover mounts and fades in on top */
  onFadeStart?: () => void;
  /** Fires once the cover has fully covered the loader — safe to unmount */
  onComplete: () => void;
}

// Countdown boxes with color photos - numbers show days, hours, minutes
const COUNTDOWN_BOXES = [
  { src: '/JULIE ANN LELIS/PRENUP PICTURES/SAVE THE DATE PAGE/JAN.JPG' },
  { src: '/JULIE ANN LELIS/PRENUP PICTURES/SAVE THE DATE PAGE/22.JPG' },
  { src: '/JULIE ANN LELIS/PRENUP PICTURES/SAVE THE DATE PAGE/2026.JPG' }
];

const MAIN_BW_IMAGE = '/JULIE ANN LELIS/PRENUP PICTURES/SAVE THE DATE PAGE/mobile-background.png';
const DESKTOP_BW_IMAGE = '/JULIE ANN LELIS/PRENUP PICTURES/SAVE THE DATE PAGE/desktop-background.JPG';
const STAGGER_DELAY_MS = 4000; // Each image appears every 4 seconds
const BOX_TRANSITION_MS = 1200; // Slow, smooth transition
const TOTAL_DURATION_MS = COUNTDOWN_BOXES.length * STAGGER_DELAY_MS + 3000;
// Hand-off to the invitation cover (components/loader/InviteCover.tsx):
//   1. the loader's text, date cards and progress bar drift up and blur away while the photo slowly pushes in
//   2. part-way through, the cover starts cross-fading in on top (its own fade is ~1.2s)
//   3. once the cover is fully opaque the loader unmounts — it never fades to the page behind it
const CONTENT_OUT_MS = 800;
const HANDOFF_DELAY_MS = 450;
const COVER_FADE_IN_MS = 1300;
const LEAVE_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

// Wedding motif: periwinkle, cornflower, sky and navy
const MOTIF_BLEND = 'linear-gradient(135deg, #9AADE0 0%, #739ACD 38%, #9CC5E5 70%, #172C4C 100%)';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFadeStart, onComplete }) => {
  const siteConfig = useSiteConfig();
  const reduceMotion = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const [now, setNow] = useState(() => new Date());

    // Live countdown: days, hours, minutes until wedding
  const countdown = useMemo(() => {
    const weddingDate = new Date(siteConfig.wedding.date);
    const diff = weddingDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  }, [now]);

  // Wedding date derived from siteConfig.wedding.date
  const debutDateObj = new Date(siteConfig.wedding.date);
  const debutMonthName = debutDateObj
    .toLocaleString('default', { month: 'short' })
    .toUpperCase(); // e.g. "MAY"
  const debutDay = String(debutDateObj.getDate()).padStart(2, '0'); // e.g. "09"
  const debutYear = String(debutDateObj.getFullYear()); // e.g. "2026"

  const countdownNumbers = [debutMonthName, debutDay, debutYear]; // e.g. May, 09, 2026
  const countdownLabels = ['Month', 'Day', 'Year']; // should return Month, Day, Year

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000); // update every minute
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    COUNTDOWN_BOXES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleBoxes((prev) => [...prev, i]), i * STAGGER_DELAY_MS)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
      setProgress(pct);
    }, 50);

    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => {
        setProgress(100);
        clearInterval(progressInterval);
        if (reduceMotion) {
          onFadeStart?.();
          timers.push(window.setTimeout(onComplete, 300));
          return;
        }
        setLeaving(true);
        timers.push(window.setTimeout(() => onFadeStart?.(), HANDOFF_DELAY_MS));
        timers.push(window.setTimeout(onComplete, HANDOFF_DELAY_MS + COVER_FADE_IN_MS));
      }, TOTAL_DURATION_MS),
    );

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [onComplete, onFadeStart, reduceMotion]);

  const coupleNames = `${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname}`;
  const productionCredit = '';


  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#172C4C] ${
        leaving ? 'pointer-events-none' : ''
      }`}
      aria-busy={!leaving}
    >
      {/* Background image with overlay — pushes in slowly as the cover takes over */}
      <div
        className="absolute inset-0"
        style={{
          transform: leaving ? 'scale(1.08)' : 'scale(1)',
          transition: `transform ${HANDOFF_DELAY_MS + COVER_FADE_IN_MS + 400}ms ${LEAVE_EASE}`,
          willChange: 'transform',
        }}
      >
        {/* Mobile background */}
        <Image
          src={MAIN_BW_IMAGE}
          alt=""
          fill
          className="object-cover object-center md:hidden"
          sizes="100vw"
          priority
        />
        {/* Desktop background (md and above) */}
        <Image
          src={DESKTOP_BW_IMAGE}
          alt=""
          fill
          className="object-cover object-center hidden md:block"
          sizes="100vw"
          priority
        />
        {/* Motif wash — soft-light keeps it a hint of colour, not a visible gradient */}
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{ background: MOTIF_BLEND, opacity: 0.3 }}
        />
        {/* Navy shade at the top and bottom so the text is legible */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgb(23 44 76 / 72%) 0%,
              rgb(23 44 76 / 32%) 18%,
              transparent 35%,
              transparent 62%,
              rgb(23 44 76 / 45%) 80%,
              rgb(23 44 76 / 82%) 100%
            )`,
          }}
        />
      </div>

      <div
        className="relative flex flex-col flex-1 min-h-0"
        style={{
          opacity: leaving ? 0 : 1,
          transform: leaving ? 'translateY(-14px) scale(0.985)' : 'none',
          filter: leaving ? 'blur(6px)' : 'none',
          transition: `opacity ${CONTENT_OUT_MS}ms ${LEAVE_EASE}, transform ${CONTENT_OUT_MS}ms ${LEAVE_EASE}, filter ${CONTENT_OUT_MS}ms ${LEAVE_EASE}`,
        }}
      >
        {/* Top: headline + hashtag + countdown (readable over photo, no container) */}
        <div className="flex flex-col items-center justify-center w-full pt-12 sm:pt-16 md:pt-24 px-4 sm:px-6 flex-shrink-0">
          <div className="w-full max-w-lg mx-auto">
            <div className="flex flex-col items-center mb-4 sm:mb-5">
              <span
                style={{
                  fontFamily: 'var(--font-brittany)',
                  color: 'var(--color-motif-cream)',
                  fontSize: 'clamp(2.8rem, 10vw, 5.5rem)',
                  lineHeight: 1.1,
                  textShadow: '0 2px 18px rgb(23 44 76 / 70%), 0 0 32px rgb(154 173 224 / 55%)',
                }}
              >
                Save the Date
              </span>
              <span
                className="text-center whitespace-nowrap mt-3"
                style={{
                  fontFamily: '"Cinzel", serif',
                  color: 'var(--color-motif-cream)',
                  fontSize: 'clamp(1.1rem, 5vw, 1.75rem)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 10px rgb(23 44 76 / 75%)',
                  opacity: 0.92,
                  fontWeight: 700,
                }}
              >
                {countdown.days} more days to go
              </span>
            </div>

          </div>
        </div>

        {/* Spacer - lets B&W image dominate (upper 2/3) */}
        <div className="flex-1 min-h-[12vh]" />

        {/* Middle: Three color countdown boxes - staggered reveal */}
        <div className="flex items-stretch justify-center gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 py-4 flex-shrink-0">
          {COUNTDOWN_BOXES.map((item, i) => {
            const isVisible = visibleBoxes.includes(i);
            return (
              <div
                key={i}
                className="relative flex-1 max-w-[28vw] sm:max-w-[140px] md:max-w-[160px] aspect-[3/4] overflow-hidden rounded-3xl border border-[#9CC5E5]/45 bg-white/10 backdrop-blur-md shadow-[0_18px_45px_rgb(23_44_76/45%)]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(28px) scale(0.94)',
                  transition: `opacity ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${BOX_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <Image
                  src={item.src}
                  alt={coupleNames}
                  fill
                  className="object-cover scale-105"
                  sizes="(max-width: 640px) 28vw, 160px"
                />
                {/* Soft gradient overlay for readable number */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(160deg, rgb(154 173 224 / 22%) 0%, transparent 42%, rgb(23 44 76 / 62%) 100%)',
                  }}
                />

                {/* Bold debut date number + label - centered at bottom */}
                <div className="absolute bottom-2 inset-x-0 sm:bottom-3 flex flex-col items-center">
                  <span
                    className="text-3xl sm:text-2xl md:text-4xl lg:text-7xl font-black select-none leading-none drop-shadow-[0_2px_8px_rgb(23_44_76/70%)] text-center"
                    style={{
                      fontFamily: 'var(--font-granika), sans-serif',
                      color: 'var(--color-motif-cream)',
                    }}
                  >
                    {countdownNumbers[i]}
                  </span>
                  <span className="text-[8px] sm:text-[9px] tracking-widest uppercase mt-0.5 text-[rgba(255,246,248,0.85)]">
                    {countdownLabels[i]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom: Names + production credit + progress bar */}
        <div className="flex flex-col items-center w-full pt-3 pb-6 sm:pb-8 px-6 flex-shrink-0 gap-1">
          <p
            className="text-[10px] sm:text-xs tracking-[0.3em] uppercase"
            style={{
              fontFamily: '"Cinzel", serif',
              color: 'var(--color-motif-cream)',
              opacity: 0.7,
            }}
          >
            Almost ready for
          </p>
          <div
            className="text-4xl sm:text-5xl md:text-6xl"
            style={{
              fontFamily: 'var(--font-playlist-script)',
              color: 'var(--color-motif-cream)',
              textShadow: '0 2px 12px rgb(23 44 76 / 60%)',
              fontWeight: 400,
            }}
          >
            {coupleNames}
          </div>
          {productionCredit && (
            <p
              className="text-[10px] font-sans tracking-wider"
              style={{ color: 'var(--color-motif-cream)', 
                // opacity: 0.7 
              }}
            >
              {productionCredit}
            </p>
          )}

          {/* Divider */}
          <div
            className="w-16 h-px my-2"
            style={{ background: 'linear-gradient(to right, transparent, #9CC5E5, transparent)', opacity: 0.7 }}
          />

          {/* Preparing message + progress bar */}
          <p
            className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase mb-2"
            style={{
              fontFamily: '"Cinzel", serif',
              color: 'var(--color-motif-cream)',
              // opacity: 0.65,
            }}
          >
            Crafting your invitation experience
          </p>
          <div className="w-full max-w-[200px] sm:max-w-xs mx-auto">
            <div
              className="h-[3px] rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgb(154 173 224 / 25%)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgb(156_197_229/70%)]"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, #9AADE0, #739ACD, #9CC5E5)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};