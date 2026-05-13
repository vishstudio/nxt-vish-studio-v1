'use client';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { SectionTitle } from '../ui/section-title/section-title';

export const Process = () => {
  const { data: content, tinaField } = useTinaHome();
  const steps = content.processSteps;

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
              <div className="hidden md:block absolute left-[2.35rem] top-8 bottom-8 w-px bg-white/10" />

              <div className="space-y-6 md:space-y-8">
                {steps.map((step, index) => (
                  <motion.article
                    key={`${step.num}-${step.title}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className="group relative grid grid-cols-1 md:grid-cols-[5rem_1fr] gap-5 md:gap-8"
                  >
                    <div className="relative z-10 flex md:block items-center gap-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 bg-[#0A0A0A] flex items-center justify-center group-hover:border-vish-accent/50 transition-colors duration-300">
                        <span className="font-mono text-lg md:text-xl text-vish-accent">
                          {step.num}
                        </span>
                      </div>
                      <div className="md:hidden h-px flex-1 bg-white/10" />
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-7 md:p-9 transition-colors duration-300 group-hover:border-vish-accent/35 group-hover:bg-white/[0.05]">
                      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-vish-accent/0 via-vish-accent/50 to-vish-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex items-start justify-between gap-6 mb-5">
                        <h3 className="font-display text-3xl md:text-5xl text-white leading-tight">
                          {step.title}
                        </h3>
                        <div className="hidden sm:flex w-10 h-10 shrink-0 rounded-full border border-white/10 items-center justify-center group-hover:bg-vish-accent group-hover:border-vish-accent transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-black -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                        </div>
                      </div>

                      <p className="font-sans text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mb-7">
                        {step.description}
                      </p>

                      {step.tags && step.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {step.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-white/45 group-hover:border-vish-accent/30 group-hover:text-vish-accent transition-colors duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
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
