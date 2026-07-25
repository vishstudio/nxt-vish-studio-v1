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

function AnimatedStatValue({ stat, isActive }: AnimatedStatValueProps) {
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

export function HeroStats({ stats, isHeroRevealed, className = '' }: HeroStatsProps) {
  const statsRef = useRef<HTMLDListElement>(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.55 });
  const shouldAnimateNumbers = isHeroRevealed && isInView;

  if (stats.length === 0) {
    return null;
  }

  return (
    <motion.dl
      ref={statsRef}
      initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
      animate={isHeroRevealed
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 0, y: 18, filter: 'blur(8px)' }}
      transition={{ duration: 0.75, delay: 0.95, ease: revealEase }}
      className={`grid grid-cols-2 gap-x-5 gap-y-3 rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-4 md:grid-cols-4 ${className}`}
      aria-label="Studio stats"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="min-w-0 border-l border-white/10 pl-4 odd:border-l-0 odd:pl-0 md:odd:border-l md:odd:pl-4 md:first:border-l-0 md:first:pl-0">
          <dt className="font-mono text-[0.62rem] font-semibold uppercase leading-none tracking-widest text-vish-gray">
            {stat.label}
          </dt>
          <dd className="mt-2 font-display text-xl font-medium leading-none tracking-normal text-white sm:text-2xl lg:text-3xl">
            <AnimatedStatValue stat={stat} isActive={shouldAnimateNumbers} />
          </dd>
        </div>
      ))}
    </motion.dl>
  );
}
