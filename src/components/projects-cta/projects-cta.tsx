'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button/button';

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
      className="projects-cta relative overflow-hidden bg-black px-6 py-16 md:px-12 md:py-20"
    >
      {backgroundImage && (
        <motion.img
          src={backgroundImage}
          alt=""
          className="absolute -top-[10%] left-0 h-[120%] w-full object-cover opacity-30 grayscale will-change-transform"
          style={{ y: backgroundY }}
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div className="absolute inset-0 bg-linear-to-b from-vish-bg/70 via-black/20 to-vish-bg/80" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-vish-accent">
            Open Slot {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="max-w-3xl font-display text-4xl leading-[0.98] tracking-tight text-white md:text-6xl">
            Have a project that needs this level of care?
          </h2>
          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
            Let us shape the next digital product with the same strategy, design, and technical depth.
          </p>
        </div>

        <div className="flex md:justify-end">
          <Button
            href="/contact"
            variant="white"
            size="lg"
            icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:-rotate-45" />}
            iconPosition="right"
          >
            Start Project
          </Button>
        </div>
      </div>
    </motion.section>
  );
};
