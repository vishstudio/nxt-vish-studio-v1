'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface PageHeroProps {
  /** Optional label above the title */
  label?: string;
  /** data-tina-field value for the label span */
  labelTinaField?: string;
  /** Style of the label: 'mono' (uppercase tracking) or 'pill' (bordered pill badge) */
  labelStyle?: 'mono' | 'pill';
  /** Title content — typically an h1 with motion animations */
  title: React.ReactNode;
  /** Optional description paragraph below the title */
  description?: string;
  /** data-tina-field value for the description paragraph */
  descriptionTinaField?: string;
  /** Hero size variant: 'full' for homepage (min-h-screen), 'large' for sub-pages (min-h-[60vh]) */
  size?: 'full' | 'large';
  /** Additional className for the section wrapper */
  className?: string;
  /** Optional background image URL for landing page heroes */
  backgroundImage?: string;
  /** Optional extra classes for the background image layer */
  backgroundImageClassName?: string;
}

export const PageHero = ({
  label,
  labelTinaField,
  labelStyle = 'mono',
  title,
  description,
  descriptionTinaField,
  size = 'large',
  className = '',
  backgroundImage,
  backgroundImageClassName = '',
}: PageHeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const sizeClasses = {
    full: 'min-h-screen flex flex-col justify-center',
    large: 'min-h-[60vh] flex flex-col justify-end',
  };

  return (
    <section ref={sectionRef} className={`page-hero ${className} relative overflow-hidden bg-black px-6 md:px-12 py-20 md:py-32 ${sizeClasses[size]}`}>
      {backgroundImage && (
        <>
          <motion.img
            src={backgroundImage}
            alt=""
            className={`absolute -top-[10%] left-0 w-full h-[120%] object-cover opacity-35 grayscale will-change-transform ${backgroundImageClassName}`}
            style={{ y: backgroundY }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div className="absolute inset-0 bg-linear-to-b from-vish-bg/75 via-black/20 to-vish-bg/90" aria-hidden="true" />
        </>
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {label && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {labelStyle === 'pill' ? (
              <span className="inline-block px-4 py-1.5 border border-white/10 rounded-full text-sm font-sans font-medium text-gray-400" data-tina-field={labelTinaField}>
                {label}
              </span>
            ) : (
              <span className="font-mono text-sm text-vish-accent uppercase tracking-widest" data-tina-field={labelTinaField}>
                {label}
              </span>
            )}
          </motion.div>
        )}

        <div className="max-w-5xl">
          {title}

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed"
              data-tina-field={descriptionTinaField}
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};
