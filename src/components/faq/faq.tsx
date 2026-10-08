'use client';

import { useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useTinaFaq } from '../../hooks/useTinaVisualEditing';
import { Button } from '../ui/button/button';
import { Section } from '../ui/section/section';
import { SectionTitle } from '../ui/section-title/section-title';

interface FaqProps {
  /** Show every question 10 at a time (FAQ page). Otherwise only the first 10 are shown (homepage). */
  paginate?: boolean;
}

/** Questions per page on /faq, and the homepage cap. */
const FAQ_PAGE_SIZE = 10;

export const Faq = ({ paginate = false }: FaqProps) => {
  const { data: content, tinaField, rawFaqPage } = useTinaFaq();
  const [openIndex, setOpenIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const faqItems = content.faqItems ?? [];
  const pageCount = Math.ceil(faqItems.length / FAQ_PAGE_SIZE);
  const pageStart = paginate ? currentPage * FAQ_PAGE_SIZE : 0;
  const visibleItems = faqItems.slice(pageStart, pageStart + FAQ_PAGE_SIZE);
  const hasMoreThanOnePage = faqItems.length > FAQ_PAGE_SIZE;

  const selectPage = (page: number) => {
    setCurrentPage(page);
    setOpenIndex(-1);

    const list = listRef.current;
    if (list && list.getBoundingClientRect().top < 0) {
      list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
          <p
            className="mb-5 font-mono text-xs uppercase tracking-widest text-vish-accent"
            data-tina-field={tinaField('label')}
          >
            {content.label}
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

        <div ref={listRef} className="scroll-mt-32 border-t border-white/10">
          {visibleItems.map((item, index) => {
            const itemIndex = pageStart + index;
            const isOpen = openIndex === itemIndex;
            const answerId = `faq-answer-${itemIndex}`;
            const rawItem = rawFaqPage?.faqItems?.[itemIndex];

            return (
              <motion.div
                key={`${item.question}-${itemIndex}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-white/10"
              >
                <button
                  type="button"
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vish-accent focus-visible:ring-offset-4 focus-visible:ring-offset-black md:py-8"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : itemIndex)}
                >
                  <span
                    className="font-display text-2xl font-medium leading-tight text-white transition-colors duration-300 group-hover:text-vish-accent md:text-3xl"
                    data-tina-field={rawItem ? tinaField(rawItem, 'question') : undefined}
                  >
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
                    <p
                      className="max-w-3xl pb-8 font-sans text-base leading-relaxed text-gray-400 md:text-lg"
                      data-tina-field={rawItem ? tinaField(rawItem, 'answer') : undefined}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {!paginate && hasMoreThanOnePage ? (
            <div className="pt-8">
              <Button
                href="/faq"
                variant="outline"
                size="sm"
                icon={<ArrowRight className="h-4 w-4" />}
                tinaField={tinaField('viewAllLabel')}
              >
                {content.viewAllLabel}
              </Button>
            </div>
          ) : null}
          {paginate && pageCount > 1 ? (
            <nav
              className="flex flex-wrap items-center justify-between gap-4 pt-8"
              aria-label="FAQ page navigation"
            >
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 0}
                onClick={() => selectPage(currentPage - 1)}
                tinaField={tinaField('previousLabel')}
              >
                {content.previousLabel}
              </Button>
              <div className="flex items-center gap-2" aria-label={`Page ${currentPage + 1} of ${pageCount}`}>
                {Array.from({ length: pageCount }, (_, page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'primary' : 'secondary'}
                    size="icon"
                    onClick={() => selectPage(page)}
                    ariaLabel={`Show FAQ ${page * FAQ_PAGE_SIZE + 1} to ${Math.min((page + 1) * FAQ_PAGE_SIZE, faqItems.length)}`}
                    ariaSelected={page === currentPage}
                    role="tab"
                  >
                    {page + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === pageCount - 1}
                onClick={() => selectPage(currentPage + 1)}
                tinaField={tinaField('nextLabel')}
              >
                {content.nextLabel}
              </Button>
            </nav>
          ) : null}
        </div>
      </div>
    </Section>
  );
};
