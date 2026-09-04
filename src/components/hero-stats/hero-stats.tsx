'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import type { HeroStat } from '../../lib/content';

interface AnimatedStatValueProps {
  stat: HeroStat;
  isActive: boolean;
}

interface HeroStatsProps {
  stats: HeroStat[];
  isHeroRevealed: boolean;
  className?: string;
  layout?: 'standard' | 'compact' | 'impact';
}

const revealEase = [0.16, 1, 0.3, 1] as const;

function formatStatValue(value: number, format: HeroStat['format']) {
  if (format === 'year') {
    return Math.round(value).toString();
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

const AnimatedStatValue = ({ stat, isActive }: AnimatedStatValueProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayValue(0);
      return undefined;
    }

    const duration = stat.format === 'year' ? 1250 : 950;
    const startedAt = performance.now();
    let animationFrame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(stat.value * easedProgress);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isActive, stat.format, stat.value]);

  return (
    <>
      {stat.prefix}
      {formatStatValue(displayValue, stat.format)}
      {stat.suffix}
    </>
  );
}

export const HeroStats = ({ stats, isHeroRevealed, className = '', layout = 'standard' }: HeroStatsProps) => {
  const statsRef = useRef<HTMLDListElement>(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.55 });
  const shouldAnimateNumbers = isHeroRevealed && isInView;

  if (stats.length === 0) {
    return null;
  }

  if (layout === 'impact') {
    return (
      <motion.dl
        ref={statsRef}
        initial={{ opacity: 0, y: 24 }}
        animate={isHeroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, delay: 0.12, ease: revealEase }}
        className={`grid border-y border-white/10 md:grid-cols-3 ${className}`}
        aria-label="Studio impact"
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-6 py-8 sm:px-8 sm:py-10 md:py-12 ${index > 0 ? 'border-t border-white/10 md:border-l md:border-t-0' : ''}`}
          >
            <dd className="font-display text-6xl font-medium leading-none tracking-tight text-white sm:text-7xl lg:text-8xl">
              <AnimatedStatValue stat={stat} isActive={shouldAnimateNumbers} />
            </dd>
            <dt className="mt-5 font-display text-2xl font-medium leading-tight text-white sm:text-3xl">
              {stat.label}
            </dt>
          </div>
        ))}
      </motion.dl>
    );
  }

  const gridClasses = layout === 'compact'
    ? 'grid-cols-2 gap-x-5 gap-y-4 px-5 py-5'
    : 'grid-cols-2 gap-x-5 gap-y-3 px-4 py-3 sm:px-5 sm:py-4 md:grid-cols-4';
  const itemClasses = layout === 'compact'
    ? 'min-w-0 border-l border-white/10 pl-4 odd:border-l-0 odd:pl-0'
    : 'min-w-0 border-l border-white/10 pl-4 odd:border-l-0 odd:pl-0 md:odd:border-l md:odd:pl-4 md:first:border-l-0 md:first:pl-0';
  const valueClasses = layout === 'compact'
    ? 'mt-2 font-display text-2xl font-medium leading-none tracking-normal text-white'
    : 'mt-2 font-display text-xl font-medium leading-none tracking-normal text-white sm:text-2xl lg:text-3xl';

  return (
    <motion.dl
      ref={statsRef}
      initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
      animate={isHeroRevealed
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 0, y: 18, filter: 'blur(8px)' }}
      transition={{ duration: 0.75, delay: 0.95, ease: revealEase }}
      className={`grid rounded-2xl border border-white/10 bg-black/55 backdrop-blur-md ${gridClasses} ${className}`}
      aria-label="Studio stats"
    >
      {stats.map((stat) => (
        <div key={stat.label} className={itemClasses}>
          <dt className="font-mono text-[0.62rem] font-semibold uppercase leading-none tracking-widest text-vish-gray">
            {stat.label}
          </dt>
          <dd className={valueClasses}>
            <AnimatedStatValue stat={stat} isActive={shouldAnimateNumbers} />
          </dd>
        </div>
      ))}
    </motion.dl>
  );
}
