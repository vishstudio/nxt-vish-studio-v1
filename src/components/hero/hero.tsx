'use client';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../ui/page-hero/page-hero';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { HeroWaveDots } from '../hero-wave-dots/hero-wave-dots';
import { Button } from '../ui/button/button';
import { openProjectInquiryModal, PROJECT_INQUIRY_ACTION, PROJECT_INQUIRY_ARIA_LABEL } from '../../lib/conversion';

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
            className="font-display text-5xl md:text-6xl lg:text-8xl font-medium tracking-tight leading-[0.95] text-white mb-12"
          >
            <span data-tina-field={tinaField('heroTitleLine1')}>{content.heroTitleLine1}</span> <br />
            <span className="text-gray-500"><span data-tina-field={tinaField('heroTitleLine2')}>{content.heroTitleLine2}</span><span className="text-vish-accent">.</span></span>
          </motion.h1>
        }
        description={content.heroDescription}
        action={
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 flex"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(255,214,0,0)',
                  '0 0 28px 0 rgba(255,214,0,0.24)',
                  '0 0 0 0 rgba(255,214,0,0)',
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-full"
            >
              <Button
                variant="primary"
                size="md"
                onClick={openProjectInquiryModal}
                icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:-rotate-45" />}
                iconPosition="right"
                ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
                dataConversionAction={PROJECT_INQUIRY_ACTION}
                className="px-6 py-4 font-mono text-xs font-semibold uppercase tracking-widest"
              >
                Start a Project
              </Button>
            </motion.div>
          </motion.div>
        }
        decorativeLayer={<HeroWaveDots />}
      />
    </div>
  );
};
