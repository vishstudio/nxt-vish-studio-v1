'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../ui/page-hero/page-hero';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { HeroWaveDots } from '../hero-wave-dots/hero-wave-dots';
import { Button } from '../ui/button/button';
import { openProjectInquiryModal, PROJECT_INQUIRY_ACTION, PROJECT_INQUIRY_ARIA_LABEL } from '../../lib/conversion';
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

export const Hero = () => {
  const { data: content, tinaField } = useTinaHome();
  const pathname = usePathname();
  const hasDispatchedHeroReveal = useRef(false);
  const [isHeroRevealed, setIsHeroRevealed] = useState(pathname !== '/');

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
        labelStyle="pill"
        size="full"
        isRevealed={isHeroRevealed}
        title={
          <motion.h1
            variants={headlineVariants}
            initial="hidden"
            animate={isHeroRevealed ? 'visible' : 'hidden'}
            className="font-display text-5xl md:text-6xl lg:text-8xl font-medium tracking-tight leading-[0.95] text-white mb-12"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={headlineLineVariants}
                className="inline-block will-change-transform"
                data-tina-field={tinaField('heroTitleLine1')}
              >
                {content.heroTitleLine1}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1 text-gray-500">
              <motion.span
                variants={headlineLineVariants}
                className="inline-block will-change-transform"
              >
                <span data-tina-field={tinaField('heroTitleLine2')}>{content.heroTitleLine2}</span>
                <span className="text-vish-accent">.</span>
              </motion.span>
            </span>
          </motion.h1>
        }
        description={content.heroDescription}
        action={
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={isHeroRevealed
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 18, filter: 'blur(8px)' }}
            transition={{ duration: 0.75, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={handleHeroRevealComplete}
            className="mt-8 flex"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(255,214,0,0)',
                  '0 0 28px 0 rgba(255,214,0,0.24)',
                  '0 0 0 0 rgba(255,214,0,0)',
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-full"
            >
              <Button
                variant="cta"
                size="md"
                onClick={openProjectInquiryModal}
                icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:-rotate-45" />}
                iconPosition="right"
                ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
                dataConversionAction={PROJECT_INQUIRY_ACTION}
                className="px-6 py-4 font-mono text-xs font-semibold uppercase tracking-widest"
              >
                Start a Project
              </Button>
            </motion.div>
          </motion.div>
        }
        decorativeLayer={<HeroWaveDots />}
      />
    </div>
  );
};
