'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHero } from '../ui/page-hero/page-hero';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { HeroStats } from '../hero-stats/hero-stats';
import { BrandWatermark } from '../brand-watermark/brand-watermark';
import { Button } from '../ui/button/button';
import { PROJECT_INQUIRY_HREF, PROJECT_INQUIRY_ACTION, PROJECT_INQUIRY_ARIA_LABEL } from '../../lib/conversion';
import { APP_READY_EVENT, HERO_REVEALED_EVENT } from '../../lib/site-events';

const revealEase = [0.16, 1, 0.3, 1] as const;

const headlineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.15,
    },
  },
};

const headlineLineVariants = {
  hidden: { opacity: 0, y: 42, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: revealEase },
  },
};

const conversionSignals = [
  'Strategy-led delivery',
  'Conversion-focused UX',
  'Launch-ready engineering',
];

const typingPhrases = [
  { prefix: 'We build your', text: 'digital business.' },
  { prefix: 'We build your', text: 'websites.' },
  { prefix: 'We build your', text: 'internal tools.' },
  { prefix: 'We build your', text: 'Saas products.' },
  { prefix: 'We build your', text: 'brands.' },
];

const completedPhraseHoldMs = 5000;

function splitTypingPhrase(text: string) {
  const hasPeriod = text.endsWith('.');
  const textWithoutPeriod = (hasPeriod ? text.slice(0, -1) : text).trimEnd();

  return {
    text: textWithoutPeriod,
    hasPeriod,
  };
}

export const Hero = () => {
  const { data: content, tinaField } = useTinaHome();
  const pathname = usePathname();
  const hasDispatchedHeroReveal = useRef(false);
  const [isHeroRevealed, setIsHeroRevealed] = useState(pathname !== '/');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(typingPhrases[0].text.length);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentPhrase = typingPhrases[phraseIndex];
  const typedTitle = currentPhrase.text.slice(0, characterIndex);
  const { text: typedTitleText, hasPeriod: typedTitleHasPeriod } = splitTypingPhrase(typedTitle);

  useEffect(() => {
    if (pathname !== '/') {
      setIsHeroRevealed(true);
      return undefined;
    }

    setIsHeroRevealed(false);
    hasDispatchedHeroReveal.current = false;

    const handleAppReady = () => {
      setIsHeroRevealed(true);
    };

    window.addEventListener(APP_READY_EVENT, handleAppReady);
    return () => window.removeEventListener(APP_READY_EVENT, handleAppReady);
  }, [pathname]);

  useEffect(() => {
    if (!isHeroRevealed) return undefined;

    const isFullPhrase = characterIndex === currentPhrase.text.length;
    const isAtTypingFloor = characterIndex <= 0;
    const typingDelay = isDeleting ? 36 : 72;
    const nextDelay = isFullPhrase && !isDeleting ? completedPhraseHoldMs : typingDelay;

    const typingTimer = window.setTimeout(() => {
      if (isFullPhrase && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isAtTypingFloor && isDeleting) {
        const nextPhraseIndex = (phraseIndex + 1) % typingPhrases.length;
        setPhraseIndex(nextPhraseIndex);
        setIsDeleting(false);
        setCharacterIndex(0);
        return;
      }

      setCharacterIndex((currentIndex) => currentIndex + (isDeleting ? -1 : 1));
    }, nextDelay);

    return () => window.clearTimeout(typingTimer);
  }, [characterIndex, isDeleting, isHeroRevealed, phraseIndex]);

  const handleHeroRevealComplete = () => {
    if (!isHeroRevealed) return;
    if (hasDispatchedHeroReveal.current) return;

    hasDispatchedHeroReveal.current = true;
    window.dispatchEvent(new Event(HERO_REVEALED_EVENT));
  };

  return (
    <div className="hero contents">
      <PageHero
        label={content.heroLabel}
        labelTinaField={tinaField('heroLabel')}
        labelStyle="pill"
        size="full"
        isRevealed={isHeroRevealed}
        contentParallax
        title={
          <motion.h1
            variants={headlineVariants}
            initial="hidden"
            animate={isHeroRevealed ? 'visible' : 'hidden'}
            className="mb-4 min-h-[8.5rem] max-w-[14ch] font-display text-5xl font-medium leading-[0.9] tracking-normal text-white md:min-h-[11.25rem] md:text-8xl"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={headlineLineVariants}
                className="inline-block will-change-transform"
              >
                {currentPhrase.prefix}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1 text-vish-gray">
              <motion.span
                variants={headlineLineVariants}
                className="inline-block will-change-transform"
              >
                <span>{typedTitleText || '\u00a0'}</span>
                <span className="text-vish-accent">{typedTitleHasPeriod ? '.' : ''}</span>
                <span className="ml-1 inline-block h-[0.8em] w-[0.08em] translate-y-[0.08em] bg-vish-accent" aria-hidden="true" />
              </motion.span>
            </span>
          </motion.h1>
        }
        description={content.heroDescription}
        descriptionTinaField={tinaField('heroDescription')}
        action={
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={isHeroRevealed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 18, filter: 'blur(8px)' }}
            transition={{ duration: 0.75, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={handleHeroRevealComplete}
            className="mt-7 max-w-3xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-full shadow-[0_0_28px_rgba(255,214,0,0.22)]">
                <Button
                  variant="cta"
                  size="md"
                  href={PROJECT_INQUIRY_HREF}
                  icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:-rotate-45" />}
                  iconPosition="right"
                  ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
                  dataConversionAction={PROJECT_INQUIRY_ACTION}
                  className="w-full px-6 py-4 font-mono text-xs font-semibold uppercase tracking-widest sm:w-auto"
                >
                  Start a Project
                </Button>
              </div>
              <Button
                variant="outline"
                size="md"
                href="/projects"
                icon={<ArrowUpRight className="h-4 w-4" />}
                iconPosition="right"
                ariaLabel="View selected VISH Studio projects"
                className="w-full px-6 py-4 font-mono text-xs font-semibold uppercase tracking-widest sm:w-auto"
              >
                See the Work
              </Button>
            </div>
            <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.66rem] font-semibold uppercase tracking-widest text-vish-gray">
              {conversionSignals.map((signal) => (
                <li key={signal} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-vish-accent" aria-hidden="true" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        }
        decorativeLayer={(
          <>
            <BrandWatermark isVisible={isHeroRevealed} className="opacity-[0.03]" />
          </>
        )}
        foregroundLayer={(
          <HeroStats
            stats={content.heroStats}
            isHeroRevealed={isHeroRevealed}
            className="absolute bottom-0 left-14 right-6 z-20 w-auto max-w-none md:bottom-8 md:left-[max(3rem,calc((100vw-1400px)/2))] md:right-auto md:w-[min(43rem,calc(100%-12rem))]"
          />
        )}
      />
    </div>
  );
};
