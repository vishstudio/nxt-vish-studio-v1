'use client';
import React from 'react';
import { motion } from 'motion/react';

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
}: PageHeroProps) => {
  const sizeClasses = {
    full: 'min-h-screen flex flex-col justify-center',
    large: 'min-h-[60vh] flex flex-col justify-end',
  };

  return (
    <section className={`px-6 md:px-12 py-20 md:py-32 ${sizeClasses[size]} ${className}`}>
      <div className="max-w-[1400px] mx-auto w-full">
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
