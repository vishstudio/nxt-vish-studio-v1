'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useTinaHome } from '../../hooks/useTinaVisualEditing';
import { Section } from '../ui/section/section';
import { SectionTitle } from '../ui/section-title/section-title';

export const Faq = () => {
  const { data: content, tinaField } = useTinaHome();
  const [openIndex, setOpenIndex] = useState(0);
  const faqItems = content.faqItems ?? [];

  if (!faqItems.length) return null;

  return (
    <Section className="faq scroll-mt-32 bg-black py-28 md:py-32" id="faq">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-widest text-vish-accent">
            FAQ
          </p>
          <SectionTitle
            size="lg"
            className="max-w-2xl"
            tinaField={tinaField('faqHeading')}
          >
            {content.faqHeading}
          </SectionTitle>
          <p
            className="mt-6 max-w-xl font-sans text-base leading-relaxed text-gray-400 md:text-lg"
            data-tina-field={tinaField('faqSubtext')}
          >
            {content.faqSubtext}
          </p>
        </motion.div>

        <div className="border-t border-white/10">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-white/10"
                data-tina-field={tinaField('faqItems')}
              >
                <button
                  type="button"
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vish-accent focus-visible:ring-offset-4 focus-visible:ring-offset-black md:py-8"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="font-display text-2xl font-medium leading-tight text-white transition-colors duration-300 group-hover:text-vish-accent md:text-3xl">
                    {item.question}
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors duration-300 group-hover:border-vish-accent group-hover:text-vish-accent">
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>
                <div
                  id={answerId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-8 font-sans text-base leading-relaxed text-gray-400 md:text-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
