'use client';
import { motion } from 'motion/react';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { Section } from '../ui/section/section';
import { SectionTitle } from '../ui/section-title/section-title';

export const Process = () => {
  const { data: content, tinaField } = useTinaHome();
  const steps = content.processSteps;
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const stepVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease },
    },
  };

  return (
    <Section className="process bg-vish-bg py-24 md:py-32" id="process">
      <div className="grid gap-12 border-t border-white/10 pt-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20 lg:pt-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="mb-5 font-mono text-xs tracking-[0.18em] text-vish-accent">OUR DELIVERY MODEL</p>
            <SectionTitle size="lg" className="mb-6 max-w-xl" tinaField={tinaField('processHeading')}>
              {content.processHeading}
            </SectionTitle>
            <p
              className="max-w-md font-sans text-lg leading-relaxed text-gray-400"
              data-tina-field={tinaField('processSubtext')}
            >
              {content.processSubtext}
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute bottom-10 left-[1.15rem] top-10 w-px bg-white/10 md:left-[1.45rem]" aria-hidden="true" />
          {steps.map((step, index) => (
            <motion.article
              key={`${step.num}-${step.title}`}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.28 }}
              transition={{ delay: index * 0.06 }}
              className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-5 py-9 first:pt-0 last:pb-0 md:grid-cols-[3.125rem_minmax(0,1fr)_minmax(9rem,0.56fr)] md:gap-7"
            >
              <div className="relative z-10 flex pt-1">
                <span className="flex size-9 items-center justify-center rounded-full border border-vish-accent/50 bg-vish-bg font-mono text-[10px] text-vish-accent transition-colors duration-300 group-hover:bg-vish-accent group-hover:text-black md:size-11 md:text-xs">
                  {step.num}
                </span>
              </div>

              <div>
                <h3 className="max-w-lg font-display text-3xl leading-[1.05] text-white transition-transform duration-300 group-hover:translate-x-1 md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-gray-500 transition-colors duration-300 group-hover:text-gray-300 md:text-base">
                  {step.description}
                </p>
              </div>

              {step.tags && step.tags.length > 0 && (
                <ul className="col-start-2 flex flex-wrap gap-x-3 gap-y-2 border-t border-white/10 pt-4 md:col-start-3 md:row-start-1 md:self-end md:border-t-0 md:pt-0">
                  {step.tags.map((tag) => (
                    <li key={tag} className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45 transition-colors duration-300 group-hover:text-white/75">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
};
