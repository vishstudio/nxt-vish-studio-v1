import { motion } from 'motion/react';
import { PageHero } from './ui/PageHero';
import { getHomePage } from '../lib/content';

export const Hero = () => {
  const content = getHomePage();

  return (
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
          {content.heroTitleLine1} <br />
          <span className="text-gray-500">{content.heroTitleLine2}<span className="text-vish-accent">.</span></span>
        </motion.h1>
      }
      description={content.heroDescription}
    />
  );
};
