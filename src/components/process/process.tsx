'use client';
import { motion } from 'motion/react';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { SectionTitle } from '../ui/section-title/section-title';

export const Process = () => {
  const { data: content, tinaField } = useTinaHome();
  const steps = content.processSteps;
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease },
    },
  };

  return (
    <section className="process bg-vish-bg py-24 md:py-32 px-6 md:px-12" id="process">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <SectionTitle size="lg" className="mb-6" tinaField={tinaField('processHeading')}>
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={`${step.num}-${step.title}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.28 }}
              transition={{ delay: index * 0.08 }}
              className="group relative flex min-h-[320px] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.045]"
            >
              <div>
                <span className="mb-4 block font-mono text-xs text-vish-accent">
                  {step.num}
                </span>
                <h3 className="font-display text-3xl leading-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                  {step.title}
                </h3>
              </div>

              <div className="mt-8">
                <p className="font-sans text-sm leading-relaxed text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
                  {step.description}
                </p>

                {step.tags && step.tags.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/45 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/75"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
