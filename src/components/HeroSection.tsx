import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Check, Mail } from 'lucide-react';
import { SITE_CONFIG, SiteCopy } from '../data/portfolioContent';
import { WireframeSlot } from './WireframeSlot';

interface HeroSectionProps {
  copy: SiteCopy['hero'];
  onSeeBuilds: () => void;
}

export function HeroSection({ copy, onSeeBuilds }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const pointerInside = useRef(false);
  const scrollOpacity = useRef(1);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluate = () => {
      const allowed = finePointer.matches && !reducedMotion.matches;
      setMotionEnabled(allowed);
    };

    evaluate();
    finePointer.addEventListener('change', evaluate);
    reducedMotion.addEventListener('change', evaluate);
    return () => {
      finePointer.removeEventListener('change', evaluate);
      reducedMotion.removeEventListener('change', evaluate);
    };
  }, []);

  useEffect(() => {
    if (!motionEnabled) {
      return;
    }

    let rafId = 0;

    const updateScrollOpacity = () => {
      const heroEl = heroRef.current;
      if (!heroEl) {
        return;
      }
      const fadeDistance = Math.max(heroEl.offsetHeight * 0.65, 220);
      const ratio = Math.min(Math.max(window.scrollY / fadeDistance, 0), 1);
      scrollOpacity.current = 1 - ratio;
    };

    updateScrollOpacity();
    window.addEventListener('scroll', updateScrollOpacity, { passive: true });

    const tick = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.16;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.16;

      if (dotRef.current) {
        const finalOpacity = pointerInside.current ? scrollOpacity.current : 0;
        dotRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
        dotRef.current.style.opacity = finalOpacity.toFixed(3);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', updateScrollOpacity);
      window.cancelAnimationFrame(rafId);
    };
  }, [motionEnabled]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!motionEnabled || e.pointerType !== 'mouse' || !heroRef.current) {
      return;
    }
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 5.5;
    const y = e.clientY - rect.top - 5.5;
    if (!pointerInside.current) {
      currentPos.current = { x, y };
    }
    targetPos.current = { x, y };
    pointerInside.current = true;
  };

  const handlePointerLeave = () => {
    pointerInside.current = false;
  };

  const handleGetInTouch = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(SITE_CONFIG.emailPlaceholder)
        .then(() => {
          setCopiedEmail(true);
          window.setTimeout(() => setCopiedEmail(false), 2200);
        })
        .catch(() => {});
    }
  };

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative overflow-hidden border-b border-[#E4E4E7] bg-[#FAFAFA]"
    >
      {/* Subtle trusq.de-inspired hairline orbital arcs & faint corner dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Faint dot-matrix grid on left edge */}
        <svg
          className="absolute top-6 left-0 h-56 w-56 text-[#D4D4D8] opacity-65"
          viewBox="0 0 180 180"
          fill="none"
        >
          <defs>
            <pattern
              id="hero-dot-grid"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.25" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="180" height="180" fill="url(#hero-dot-grid)" />
        </svg>

        {/* Subtle hairline orbital arcs + gently breathing trusq-style intersection nodes */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 540"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path
            d="M -60 440 Q 420 190 1480 410"
            stroke="#E4E4E7"
            strokeWidth="1"
          />
          <path
            d="M 180 -40 Q 680 340 1320 110"
            stroke="#E4E4E7"
            strokeWidth="1"
          />
          <motion.circle
            cx="520"
            cy="275"
            r="3.2"
            fill="#2563EB"
            animate={
              motionEnabled
                ? { opacity: [0.18, 0.48, 0.18], scale: [1, 1.35, 1] }
                : { opacity: 0.25 }
            }
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="1088"
            cy="182"
            r="2.8"
            fill="#2563EB"
            animate={
              motionEnabled
                ? { opacity: [0.14, 0.38, 0.14], scale: [1, 1.25, 1] }
                : { opacity: 0.2 }
            }
            transition={{
              duration: 5.5,
              delay: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <circle cx="842" cy="338" r="2.2" fill="#A1A1AA" fillOpacity="0.4" />
        </svg>
      </div>

      {/* Cursor-following 11px accent dot (fades on scroll, disabled on touch/reduced motion) */}
      {motionEnabled ? (
        <div
          ref={dotRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-20 h-[11px] w-[11px] rounded-full bg-[#2563EB] opacity-0 transition-opacity duration-150 will-change-transform"
        />
      ) : null}

      <div className="relative z-10 mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Status pill, Headline, Sub-line, CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            {/* Status pill with gently breathing accent dot */}
            <div className="group mb-5 inline-flex max-w-full items-center gap-2.5 rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1.5 font-mono text-xs text-[#52525B] transition-colors duration-150 hover:border-[#D4D4D8]">
              <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                {motionEnabled ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-[#2563EB]"
                    animate={{ scale: [1, 2.1], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                ) : null}
                <span
                  className="relative h-2 w-2 rounded-full bg-[#2563EB]"
                  aria-hidden="true"
                />
              </span>
              <span className="truncate">{copy.statusPill}</span>
            </div>

            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-[#111827] [text-wrap:balance] sm:text-4xl lg:text-[42px] lg:leading-[1.15]">
              {copy.headline}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#52525B] sm:text-[17px]">
              {copy.subline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onSeeBuilds}
                className="group inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#1D4ED8] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <span>{copy.primaryCta}</span>
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <a
                href={`mailto:${SITE_CONFIG.emailPlaceholder}`}
                onClick={handleGetInTouch}
                className="group inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#E4E4E7] bg-white px-5 py-2.5 text-sm font-medium text-[#111827] whitespace-nowrap transition-all duration-150 hover:-translate-y-0.5 hover:border-[#D4D4D8] hover:bg-[#F4F4F5]/60 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                {copiedEmail ? (
                  <>
                    <Check
                      className="h-4 w-4 text-[#2563EB]"
                      aria-hidden="true"
                    />
                    <span>{copy.copiedEmailLabel}</span>
                  </>
                ) : (
                  <>
                    <Mail
                      className="h-4 w-4 text-[#52525B] transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:text-[#2563EB]"
                      aria-hidden="true"
                    />
                    <span>{copy.secondaryCta}</span>
                  </>
                )}
              </a>
            </div>
          </motion.div>

          {/* Right column: Square placeholder slot for a real photo of me */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto w-full max-w-[260px] lg:col-span-4 lg:max-w-[280px]"
          >
            <div className="group rounded-2xl border border-[#E4E4E7] bg-white p-2.5 transition-all duration-200 hover:-translate-y-1 hover:border-[#D4D4D8]">
              <WireframeSlot
                label={copy.photoLabel}
                sublabel={copy.photoSublabel}
                variant="portrait"
                aspectClass="aspect-square"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
