'use client';
import { motion } from 'motion/react';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { SectionTitle } from '../ui/section-title/section-title';

export const About = () => {
  const { data: content, tinaField } = useTinaHome();

  return (
    <section
      className="about scroll-mt-28 bg-vish-bg px-6 py-24 md:scroll-mt-32 md:px-12 md:py-32"
      id="about"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-vish-accent">
            About the agency
          </p>
          <SectionTitle size="sm" className="max-w-xl leading-[1.04]" tinaField={tinaField('aboutHeading')}>
            {content.aboutHeading}
          </SectionTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="max-w-2xl lg:col-span-7 lg:pt-8"
        >
          <div data-tina-field={tinaField('aboutParagraph1')}>
            <p className="font-sans text-lg leading-relaxed text-white md:text-xl">
              {content.aboutParagraph1}
            </p>
          </div>

          <div
            className="mt-5 max-w-xl md:mt-6"
            data-tina-field={tinaField('aboutParagraph2')}
          >
            <p className="font-sans text-sm leading-relaxed text-vish-gray md:text-base">
              {content.aboutParagraph2}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
