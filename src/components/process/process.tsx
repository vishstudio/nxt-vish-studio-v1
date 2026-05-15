'use client';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { SectionTitle } from '../ui/section-title/section-title';

export const Process = () => {
  const { data: content, tinaField } = useTinaHome();
  const steps = content.processSteps;
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const rowVariants = {
    hidden: { opacity: 0, y: 56, clipPath: 'inset(14% 0% 14% 0% round 20px)' },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0% round 20px)',
      transition: { duration: 0.9, ease },
    },
  };
  const copyVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease, delay: 0.08 },
    },
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
            <div className="process-timeline space-y-4 md:space-y-5">
                {steps.map((step, index) => (
                  <motion.article
                    key={`${step.num}-${step.title}`}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.28 }}
                    className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.025] transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.045]"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="pointer-events-none absolute -right-3 -top-8 font-display text-[8rem] md:text-[12rem] leading-none text-white/[0.025] transition-colors duration-500 group-hover:text-white/[0.045]">
                      {step.num}
                    </span>

                    <div className="relative z-10 grid grid-cols-1 gap-6 p-6 md:grid-cols-[6rem_minmax(0,1fr)] md:p-8 lg:gap-10 lg:p-10">
                      <motion.div variants={copyVariants} className="flex items-center gap-3 md:block md:pt-1">
                        <span className="font-mono text-xs text-white/35">Step</span>
                        <span className="font-mono text-sm text-white/70 md:mt-3 md:block">
                          {step.num}
                        </span>
                      </motion.div>

                      <div className="min-w-0">
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(18rem,1fr)] xl:gap-10">
                          <motion.h3
                            variants={copyVariants}
                            className="min-w-0 break-words font-display text-4xl leading-[0.95] tracking-tight text-white md:text-5xl 2xl:text-6xl"
                          >
                            {step.title}
                          </motion.h3>

                          <motion.div variants={copyVariants} className="min-w-0">
                            <div className="flex items-start justify-between gap-6">
                              <p className="max-w-xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
                                {step.description}
                              </p>
                              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-white group-hover:bg-white sm:flex">
                                <ArrowRight className="h-4 w-4 -rotate-45 text-white/40 transition-all duration-300 group-hover:rotate-0 group-hover:text-black" />
                              </div>
                            </div>

                            {step.tags && step.tags.length > 0 && (
                              <div className="mt-7 flex flex-wrap gap-2">
                                {step.tags.map((tag, tagIndex) => (
                                  <motion.span
                                    key={tag}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: 0.18 + tagIndex * 0.04, ease }}
                                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/45 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/75"
                                  >
                                    {tag}
                                  </motion.span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
