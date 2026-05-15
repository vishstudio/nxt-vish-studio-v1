'use client';
import { motion } from 'motion/react';
import { PageHero } from '../ui/page-hero/page-hero';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { HeroWaveDots } from '../hero-wave-dots/hero-wave-dots';

export const Hero = () => {
  const { data: content, tinaField } = useTinaHome();

  return (
    <div className="hero contents">
      <PageHero
        label={content.heroLabel}
        labelStyle="pill"
        size="full"
        title={
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white mb-12"
          >
            <span data-tina-field={tinaField('heroTitleLine1')}>{content.heroTitleLine1}</span> <br />
            <span className="text-gray-500"><span data-tina-field={tinaField('heroTitleLine2')}>{content.heroTitleLine2}</span><span className="text-vish-accent">.</span></span>
          </motion.h1>
        }
        description={content.heroDescription}
        decorativeLayer={<HeroWaveDots />}
      />
    </div>
  );
};
