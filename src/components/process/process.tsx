'use client';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { SectionTitle } from '../ui/section-title/section-title';

export const Process = () => {
  const { data: content, tinaField } = useTinaHome();
  const steps = content.processSteps;
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const stepVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08,
      },
    },
  };
  const markerVariants = {
    hidden: { opacity: 0, scale: 0.65, rotate: -18, filter: 'blur(8px)' },
    visible: { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
  };
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 64,
      rotateX: 10,
      scale: 0.96,
      filter: 'blur(10px)',
      clipPath: 'inset(18% 0% 18% 0% round 16px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      clipPath: 'inset(0% 0% 0% 0% round 16px)',
      transition: { duration: 0.9, ease },
    },
  };
  const contentVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.68, ease } },
  };
  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.9, ease } },
  };
  const sweepVariants = {
    hidden: { x: '-120%', opacity: 0 },
    visible: { x: '120%', opacity: [0, 1, 0], transition: { duration: 1.1, ease, delay: 0.2 } },
  };

  return (
    <section className="process bg-vish-bg py-24 md:py-32 px-6 md:px-12" id="process">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 lg:sticky lg:top-32"
          >
            <SectionTitle size="lg" className="mb-4" tinaField={tinaField('processHeading')}>
              {content.processHeading}
            </SectionTitle>
            <p
              className="font-mono text-xs text-gray-400 tracking-widest uppercase max-w-xs"
              data-tina-field={tinaField('processSubtext')}
            >
              {content.processSubtext}
            </p>
          </motion.div>

          <div className="lg:col-span-8">
            <div className="relative">
              <div className="hidden md:block absolute left-[2.35rem] top-8 bottom-8 w-px bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease }}
                  className="timeline-line absolute inset-0 origin-top bg-linear-to-b from-vish-accent via-white/35 to-white/0"
                />
              </div>

              <div className="space-y-6 md:space-y-8">
                {steps.map((step, index) => (
                  <motion.article
                    key={`${step.num}-${step.title}`}
                    variants={stepVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    className="group relative grid grid-cols-1 md:grid-cols-[5rem_1fr] gap-5 md:gap-8 [perspective:1200px]"
                  >
                    <motion.div
                      variants={markerVariants}
                      className="relative z-10 flex md:block items-center gap-4"
                    >
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 bg-[#0A0A0A] flex items-center justify-center overflow-hidden group-hover:border-vish-accent/50 transition-colors duration-300">
                        <motion.div
                          variants={sweepVariants}
                          className="absolute inset-y-0 w-1/2 bg-white/20 skew-x-[-18deg]"
                        />
                        <span className="relative z-10 font-mono text-lg md:text-xl text-vish-accent">
                          {step.num}
                        </span>
                      </div>
                      <motion.div variants={lineVariants} className="md:hidden h-px flex-1 bg-white/10 origin-left" />
                    </motion.div>

                    <motion.div
                      variants={cardVariants}
                      className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-7 md:p-9 transition-colors duration-300 group-hover:border-vish-accent/35 group-hover:bg-white/[0.05] [transform-style:preserve-3d]"
                    >
                      <motion.div
                        variants={sweepVariants}
                        className="absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/8 to-transparent skew-x-[-18deg] pointer-events-none"
                      />
                      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-vish-accent/0 via-vish-accent/50 to-vish-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-radial-[circle_at_20%_0%] from-vish-accent/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="flex items-start justify-between gap-6 mb-5">
                        <motion.h3
                          variants={contentVariants}
                          className="font-display text-3xl md:text-5xl text-white leading-tight"
                        >
                          {step.title}
                        </motion.h3>
                        <motion.div
                          variants={contentVariants}
                          className="hidden sm:flex w-10 h-10 shrink-0 rounded-full border border-white/10 items-center justify-center group-hover:bg-vish-accent group-hover:border-vish-accent transition-all duration-300"
                        >
                          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-black -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                        </motion.div>
                      </div>

                      <motion.p
                        variants={contentVariants}
                        className="font-sans text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mb-7"
                      >
                        {step.description}
                      </motion.p>

                      {step.tags && step.tags.length > 0 && (
                        <motion.div variants={contentVariants} className="flex flex-wrap gap-2">
                          {step.tags.map((tag, tagIndex) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.45, delay: 0.25 + tagIndex * 0.05, ease }}
                              className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-white/45 group-hover:border-vish-accent/30 group-hover:text-vish-accent transition-colors duration-300"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
