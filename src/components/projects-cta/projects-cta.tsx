'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button/button';
import { PROJECT_INQUIRY_ACTION, PROJECT_INQUIRY_ARIA_LABEL, PROJECT_INQUIRY_HREF } from '../../lib/conversion';

interface ProjectsCtaProps {
  index: number;
  backgroundImage?: string;
}

export const ProjectsCta = ({ index, backgroundImage }: ProjectsCtaProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="projects-cta relative overflow-hidden border-y border-white/10 bg-black py-10 md:py-14"
    >
      <span className="pointer-events-none absolute -right-4 -top-8 font-display text-[8rem] leading-none text-white/[0.025] md:-right-8 md:-top-14 md:text-[13rem]">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-[minmax(18rem,0.52fr)_1fr] md:items-center md:gap-12 lg:gap-20">
        <div className="relative aspect-16/10 overflow-hidden bg-white/[0.035] md:aspect-4/3">
          {backgroundImage && (
            <motion.img
              src={backgroundImage}
              alt=""
              className="absolute -top-[10%] left-0 h-[120%] w-full object-cover opacity-45 grayscale will-change-transform"
              style={{ y: backgroundY }}
              aria-hidden="true"
            />
          )}
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/70" aria-hidden="true" />
          <div className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-white/45">
            Next build
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="mb-5 block font-mono text-xs uppercase tracking-widest text-vish-accent">
              Open Slot {String(index + 1).padStart(2, '0')}
            </span>
            <h2 className="max-w-3xl font-display text-4xl leading-[0.98] tracking-tight text-white md:text-6xl">
              Have a project that needs this level of care?
            </h2>
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
              Let us shape the next digital product with the same strategy, design, and technical depth.
            </p>
          </div>

          <div className="flex lg:justify-end">
            <Button
              href={PROJECT_INQUIRY_HREF}
              variant="white"
              size="lg"
              icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:-rotate-45" />}
              iconPosition="right"
              ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
              dataConversionAction={PROJECT_INQUIRY_ACTION}
            >
              Start Project
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
