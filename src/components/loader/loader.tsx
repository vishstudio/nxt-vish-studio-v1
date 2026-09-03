'use client';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { BrandWatermark } from '../brand-watermark/brand-watermark';
import { LogoText } from '../logo-text/logo-text';

export const Loader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const hasCompleted = useRef(false);

  useEffect(() => {
    const completeLoading = () => {
      if (hasCompleted.current) return;
      hasCompleted.current = true;
      onLoadingComplete();
    };

    const animationTimer = window.setTimeout(completeLoading, 2300);
    const fallbackTimer = window.setTimeout(completeLoading, 3600);

    return () => {
      window.clearTimeout(animationTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="loader fixed inset-0 z-[9999] flex cursor-wait items-center justify-center overflow-hidden bg-black px-6 text-white"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <BrandWatermark isVisible animateOnReveal={false} className="opacity-[0.03]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <LogoText logoClassName="w-[15rem] md:w-[25vw]" />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 left-1/2 z-10 w-max max-w-[calc(100%-3rem)] -translate-x-1/2 text-center font-sans text-xs tracking-wide text-vish-gray sm:bottom-10 sm:text-sm md:bottom-12"
      >
        Design. Engineering. Social Growth.
      </motion.div>
    </motion.div>
  );
};
