import { motion } from 'motion/react';
import { PageHero } from './ui/PageHero';

export const Hero = () => {
  return (
    <PageHero
      label="Digital Design Agency"
      labelStyle="pill"
      size="full"
      title={
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white mb-12"
        >
          We build digital <br />
          <span className="text-gray-500">experiences<span className="text-vish-accent">.</span></span>
        </motion.h1>
      }
      description="VISH Studio is a creative agency partnering with brands to build immersive websites, applications, and digital products."
    />
  );
};
