'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../ui/page-hero/page-hero';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { HeroWaveDots } from '../hero-wave-dots/hero-wave-dots';
import { HeroStats } from '../hero-stats/hero-stats';
import { BrandWatermark } from '../brand-watermark/brand-watermark';
import { Button } from '../ui/button/button';
import { PROJECT_INQUIRY_HREF, PROJECT_INQUIRY_ACTION, PROJECT_INQUIRY_ARIA_LABEL } from '../../lib/conversion';
import { APP_READY_EVENT, HERO_REVEALED_EVENT } from '../../lib/site-events';
import { getProjects } from '../../lib/projects';
import { getImageUrl } from '../../utils/imageUrl';

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

const recentProjects = getProjects().filter((project) => project.featuredOnHome).slice(0, 4);

const projectCardSizes = [
  'h-24 w-36 lg:h-32 lg:w-48 xl:h-36 xl:w-56',
  'h-24 w-36 lg:h-28 lg:w-44 xl:h-32 xl:w-52',
  'h-28 w-44 lg:h-32 lg:w-52 xl:h-36 xl:w-60',
];

interface HeroProjectCard {
  id: number;
  projectIndex: number;
  left: number;
  top: number;
  rotation: number;
  sizeClass: string;
}

function getRandomProjectCard(id: number, previousCards: HeroProjectCard[]): HeroProjectCard {
  const visibleProjectIndexes = new Set(previousCards.map((card) => card.projectIndex));
  const availableProjectIndexes = recentProjects
    .map((_, index) => index)
    .filter((index) => !visibleProjectIndexes.has(index));
  const projectPool = availableProjectIndexes.length > 0
    ? availableProjectIndexes
    : recentProjects.map((_, index) => index);
  const projectIndex = projectPool[Math.floor(Math.random() * projectPool.length)] ?? 0;

  return {
    id,
    projectIndex,
    left: 8 + Math.random() * 54,
    top: 8 + Math.random() * 58,
    rotation: -10 + Math.random() * 20,
    sizeClass: projectCardSizes[id % projectCardSizes.length],
  };
}

function HeroRecentProjects({ isHeroRevealed }: { isHeroRevealed: boolean }) {
  const visibleProjectCount = Math.min(3, recentProjects.length);
  const nextCardId = useRef(0);
  const [visibleCards, setVisibleCards] = useState<HeroProjectCard[]>([]);
  const { scrollYProgress } = useScroll();
  const clusterY = useTransform(scrollYProgress, [0, 0.24], [0, -92]);

  useEffect(() => {
    if (!isHeroRevealed || visibleProjectCount === 0) {
      setVisibleCards([]);
      return undefined;
    }

    nextCardId.current = 0;
    setVisibleCards([]);

    const revealTimer = window.setInterval(() => {
      setVisibleCards((currentCards) => {
        const nextCard = getRandomProjectCard(nextCardId.current, currentCards);
        nextCardId.current += 1;

        return [...currentCards, nextCard].slice(-visibleProjectCount);
      });
    }, 1150);

    return () => window.clearInterval(revealTimer);
  }, [isHeroRevealed, visibleProjectCount]);

  if (recentProjects.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 26, filter: 'blur(10px)' }}
      animate={isHeroRevealed
        ? { opacity: 1, x: 0, filter: 'blur(0px)' }
        : { opacity: 0, x: 26, filter: 'blur(10px)' }}
      transition={{ duration: 0.85, delay: 0.65, ease: revealEase }}
      className="pointer-events-none absolute right-[-8%] top-[50%] hidden h-[19rem] w-[24rem] -translate-y-1/2 md:block lg:right-0 lg:top-[46%] lg:h-[23rem] lg:w-[32rem] xl:right-[8%] xl:h-[27rem] xl:w-[38rem]"
      aria-hidden="true"
    >
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: clusterY }}>
        <AnimatePresence>
          {visibleCards.map((card, positionIndex) => {
            const project = recentProjects[card.projectIndex];

            return (
              <motion.div
                key={`${project.slug}-${card.id}`}
                initial={{
                  opacity: 0,
                  scale: 0.82,
                  y: 22,
                  rotate: card.rotation * 0.6,
                  filter: 'blur(12px)',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  rotate: card.rotation,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  scale: 0.86,
                  y: -18,
                  rotate: card.rotation * 1.25,
                  filter: 'blur(10px)',
                }}
                transition={{ duration: 0.72, delay: positionIndex * 0.08, ease: revealEase }}
                className={`absolute overflow-hidden rounded-2xl border border-white/5 bg-white/[0.025] shadow-2xl shadow-black/50 lg:border-white/10 lg:bg-white/[0.035] ${card.sizeClass}`}
                style={{
                  left: `${card.left}%`,
                  top: `${card.top}%`,
                }}
              >
                <div className="h-full w-full opacity-35 lg:opacity-100">
                  <img
                    src={getImageUrl(project.image)}
                    alt=""
                    className="h-full w-full object-cover opacity-90 saturate-75"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                  <div className="absolute inset-0 bg-black/20 lg:bg-black/10" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

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
        contentParallax
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
            <div className="rounded-full shadow-[0_0_28px_rgba(255,214,0,0.22)]">
              <Button
                variant="cta"
                size="md"
                href={PROJECT_INQUIRY_HREF}
                icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:-rotate-45" />}
                iconPosition="right"
                ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
                dataConversionAction={PROJECT_INQUIRY_ACTION}
                className="px-6 py-4 font-mono text-xs font-semibold uppercase tracking-widest"
              >
                Start a Project
              </Button>
            </div>
          </motion.div>
        }
        decorativeLayer={(
          <>
            {/* <BrandWatermark isVisible={isHeroRevealed} /> */}
            {/* <HeroWaveDots /> */}
            <HeroRecentProjects isHeroRevealed={isHeroRevealed} />
          </>
        )}
        foregroundLayer={(
          <HeroStats
            stats={content.heroStats}
            isHeroRevealed={isHeroRevealed}
            className="absolute bottom-10 left-6 right-6 z-20 w-auto max-w-none md:bottom-8 md:left-[max(3rem,calc((100vw-1400px)/2))] md:right-auto md:w-[min(43rem,calc(100%-12rem))]"
          />
        )}
      />
    </div>
  );
};
