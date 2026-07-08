'use client';

import { motion } from 'motion/react';

interface BrandWatermarkProps {
  isVisible?: boolean;
  className?: string;
}

export function BrandWatermark({ isVisible = true, className = '' }: BrandWatermarkProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, x: -18, filter: 'blur(8px)' }}
      animate={isVisible
        ? { opacity: 0.055, x: 0, filter: 'blur(0px)' }
        : { opacity: 0, x: -18, filter: 'blur(8px)' }}
      transition={{ duration: 0.95, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none absolute top-1/2 z-0  -translate-y-1/2 left-[-30rem] h-[50rem] w-[50rem] md:left-[-20rem] md:h-[40rem] md:w-[40rem] lg:left-[-40rem] lg:h-[75rem] lg:w-[75rem] ${className}`}
    >
      <img
        src="/assets/icon-rounded.svg"
        alt=""
        className="h-full w-full object-contain"
        draggable={false}
      />
    </motion.div>
  );
}
