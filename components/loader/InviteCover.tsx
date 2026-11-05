'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import localFont from 'next/font/local';
import { Great_Vibes } from 'next/font/google';
import { motion, useReducedMotion, type Transition, type Variants } from 'motion/react';
import { useSiteConfig } from '@/hooks/use-site-config';
import { siteConfig as defaultSiteConfig } from '@/content/site';
import './invite-cover.css';

// "You are" — flowing script
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400', display: 'swap' });

// "INVITED!", names, date and button — classic Roman capitals (Font/Cinzel)
const cinzel = localFont({
  src: [
    { path: '../../Font/Cinzel/Cinzel-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../Font/Cinzel/Cinzel-Bold.otf', weight: '700', style: 'normal' },
    { path: '../../Font/Cinzel/Cinzel-Black.otf', weight: '900', style: 'normal' },
  ],
  display: 'swap',
});

export interface InviteCoverProps {
  onOpen: () => void;
  onTransitionStart?: () => void;
  visible: boolean;
  enterFromLoading?: boolean;
}

const ease: Transition['ease'] = [0.22, 1, 0.36, 1];
// Click → copy + button fade out → home page mounts underneath → cover fades away
const CONTENT_OUT_MS = 650;
const COVER_FADE_MS = 1400;

const stackVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.35 } },
  exit: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease } },
  exit: { opacity: 0, y: -10, filter: 'blur(6px)', transition: { duration: 0.45, ease: [0.4, 0, 1, 1] } },
};

const monogramVariants: Variants = {
  hidden: { opacity: 0, y: -18, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.3, ease, delay: 0.15 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.45, ease: [0.4, 0, 1, 1] } },
};

function formatCoverDate(raw: string) {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return '';
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${mm}.${dd}.${date.getFullYear()}`;
}

/**
 * "You are invited" cover: full-screen couple photos cross-fading behind the
 * monogram, a script + serif title and an Open Invitation button.
 */
export function InviteCover({ onOpen, onTransitionStart, visible, enterFromLoading = false }: InviteCoverProps) {
  const siteConfig = useSiteConfig();
  const content = siteConfig.loadingScreen ?? defaultSiteConfig.loadingScreen;
  const defaults = defaultSiteConfig.loadingScreen;
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const groomName = siteConfig.couple.groomNickname;
  const brideName = siteConfig.couple.brideNickname;
  const monogram = siteConfig.couple.monogram || defaultSiteConfig.couple.monogram;
  const coverDate = formatCoverDate(siteConfig.wedding.date);
  const scriptLine = content.coverScriptText ?? defaults.coverScriptText;
  const titleLine = content.coverTitleText ?? defaults.coverTitleText;
  const buttonText = content.coverButtonText ?? defaults.coverButtonText;

  const photos = useMemo(() => {
    const mobile = content.envelopeBackgroundPhotos ?? defaults.envelopeBackgroundPhotos ?? [];
    const desktop = content.envelopeBackgroundPhotosDesktop ?? defaults.envelopeBackgroundPhotosDesktop ?? [];
    return {
      mobile: mobile.map((src) => encodeURI(src)),
      desktop: (desktop.length > 0 ? desktop : mobile).map((src) => encodeURI(src)),
    };
  }, [content.envelopeBackgroundPhotos, content.envelopeBackgroundPhotosDesktop, defaults]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Reset when the cover is hidden so it can play again
  useEffect(() => {
    if (!visible) {
      setIsExiting(false);
      setLiveMessage('');
    }
  }, [visible]);

  // Lock page scroll while the cover is up
  useEffect(() => {
    if (!visible || isExiting) return;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [visible, isExiting]);

  const handleOpen = useCallback(async () => {
    if (isExiting) return;
    setIsExiting(true);
    setLiveMessage('Opening your invitation.');
    if (reduceMotion) {
      onTransitionStart?.();
      onOpen();
      return;
    }
    await wait(CONTENT_OUT_MS);
    onTransitionStart?.();
    await wait(COVER_FADE_MS);
    onOpen();
  }, [isExiting, onOpen, onTransitionStart, reduceMotion]);

  const contentState = isExiting ? 'exit' : visible ? 'visible' : 'hidden';

  return (
    <motion.div
      className={`invite-cover ${visible ? '' : 'is-hidden'}`}
      aria-hidden={!visible}
      initial={false}
      animate={{ opacity: visible && !isExiting ? 1 : 0 }}
      transition={
        isExiting
          ? { duration: COVER_FADE_MS / 1000, delay: CONTENT_OUT_MS / 1000, ease: [0.4, 0, 0.2, 1] }
          : visible && enterFromLoading && !reduceMotion
            ? { duration: 1.2, ease }
            : { duration: reduceMotion ? 0.2 : 0.01 }
      }
      style={{ pointerEvents: !visible || isExiting ? 'none' : undefined }}
    >
      <motion.div
        className="invite-cover__photos"
        initial={false}
        // Arrives slightly pushed in (matching the loader's push-in), then settles while it fades up
        animate={{ scale: reduceMotion ? 1 : isExiting ? 1.06 : visible ? 1 : 1.08 }}
        transition={
          isExiting
            ? { duration: (CONTENT_OUT_MS + COVER_FADE_MS) / 1000, ease }
            : visible
              ? { duration: 2.6, ease }
              : { duration: 0 }
        }
      >
        {isMobile !== null && (
          <CoverPhotoSlideshow
            key={isMobile ? 'mobile' : 'desktop'}
            photos={isMobile ? photos.mobile : photos.desktop}
            paused={!visible || isExiting}
            reduceMotion={reduceMotion}
          />
        )}
      </motion.div>
      <div className="invite-cover__shade" aria-hidden="true" />

      <p className="invite-cover__live" aria-live="polite">
        {liveMessage}
      </p>

      <motion.header
        className="invite-cover__top"
        variants={monogramVariants}
        initial="hidden"
        animate={contentState}
      >
        {monogram && (
          <span
            className="invite-cover__monogram"
            role="img"
            aria-label={`${groomName} and ${brideName} monogram`}
            style={{ '--monogram-src': `url("${monogram}")` } as React.CSSProperties}
          />
        )}
        <span className={`${cinzel.className} invite-cover__names`}>
          {groomName} &amp; {brideName}
        </span>
        {coverDate && <span className={`${cinzel.className} invite-cover__date`}>{coverDate}</span>}
      </motion.header>

      <motion.div
        className="invite-cover__bottom"
        variants={stackVariants}
        initial="hidden"
        animate={contentState}
        onAnimationComplete={(definition) => {
          if (definition === 'visible') buttonRef.current?.focus({ preventScroll: true });
        }}
      >
        <h1 className="invite-cover__title" aria-label={`${scriptLine} ${titleLine}`}>
          <motion.span
            variants={riseVariants}
            className={`${greatVibes.className} invite-cover__script`}
            aria-hidden="true"
          >
            {scriptLine}
          </motion.span>
          <motion.span
            variants={riseVariants}
            className={`${cinzel.className} invite-cover__caps`}
            aria-hidden="true"
          >
            {titleLine}
          </motion.span>
        </h1>
        <motion.button
          ref={buttonRef}
          type="button"
          className={`${cinzel.className} invite-cover__button`}
          variants={riseVariants}
          whileHover={!isExiting && !reduceMotion ? { y: -2 } : undefined}
          whileTap={!isExiting && !reduceMotion ? { scale: 0.97 } : undefined}
          onClick={handleOpen}
          disabled={!visible || isExiting}
        >
          {buttonText}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

const SLIDE_INTERVAL_MS = 6000;

/**
 * Full-screen photos that slowly drift / zoom (Ken Burns) while the next one
 * cross-fades in on top. Only the current, outgoing and next photos are mounted,
 * so the large files load one at a time.
 */
export function CoverPhotoSlideshow({
  photos,
  paused,
  reduceMotion,
  className = '',
}: {
  photos: readonly string[];
  paused: boolean;
  reduceMotion: boolean | null;
  className?: string;
}) {
  const [slide, setSlide] = useState<{ index: number; prev: number | null }>({ index: 0, prev: null });
  const count = photos.length;

  useEffect(() => {
    setSlide({ index: 0, prev: null });
  }, [photos]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(
      () => setSlide(({ index }) => ({ index: (index + 1) % count, prev: index })),
      reduceMotion ? SLIDE_INTERVAL_MS * 1.5 : SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [paused, count, reduceMotion]);

  if (count === 0) return null;
  const nextIndex = (slide.index + 1) % count;

  return (
    <div
      className={`env-invite-slideshow${reduceMotion ? ' env-invite-slideshow--still' : ''}${paused ? ' is-paused' : ''} ${className}`.trim()}
      aria-hidden="true"
      style={{ '--slide-life': `${(SLIDE_INTERVAL_MS * 2) / 1000}s` } as React.CSSProperties}
    >
      {photos.map((src, i) => {
        const active = i === slide.index;
        const leaving = i === slide.prev && !active;
        if (!active && !leaving && i !== nextIndex) return null;
        return (
          <div
            key={src}
            className={`env-invite-slideshow__slide env-invite-slideshow__slide--drift-${i % 4}${active ? ' is-active' : ''}${leaving ? ' is-leaving' : ''}`}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              quality={80}
              draggable={false}
              className="env-invite-slideshow__img object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
