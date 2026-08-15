'use client';

import { ArrowLeft, ArrowUpRight, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import type { ServiceCategory } from '../../lib/content';
import { Button } from '../ui/button/button';

interface ServiceCatalogueProps {
  services: ServiceCategory[];
  rawCategories?: unknown[];
  tinaField: (source: unknown, field?: string) => string | undefined;
  id?: string;
}

export const ServiceCatalogue = ({ services, rawCategories, tinaField, id }: ServiceCatalogueProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const selectedService = services[selectedIndex] ?? services[0];
  const selectedRawCategory = rawCategories?.[selectedIndex];

  if (!selectedService) return null;

  return (
    <section id={id} className="bg-black px-6 py-24 md:px-12 md:py-32" aria-labelledby="service-catalogue-title">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-vish-accent">Service catalogue</p>
            <h2 id="service-catalogue-title" className="mt-4 max-w-2xl font-display text-4xl font-medium leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl">
              Choose the work that moves your business forward<span className="text-vish-accent">.</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-base leading-relaxed text-gray-400">
            Select a service to see the work we plan, the outcomes we focus on, and a relevant slice of our world.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait" initial={false}>
            {!isDetailOpen ? (
              <motion.div
                key="mobile-service-list"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden rounded-3xl bg-white text-black shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
              >
                <div className="border-b border-black/10 px-6 py-7">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/45">Our services</p>
                  <p className="mt-3 font-display text-2xl leading-tight">Select a service to see the plan<span className="text-vish-accent">.</span></p>
                </div>
                <div className="px-6 pb-4 pt-2">
                  {services.map((service, index) => {
                    const rawCategory = rawCategories?.[index];

                    return (
                      <button
                        key={service.category}
                        type="button"
                        onClick={() => {
                          setSelectedIndex(index);
                          setIsDetailOpen(true);
                        }}
                        className="group flex w-full items-center gap-3 border-b border-black/10 py-4 text-left last:border-b-0"
                      >
                        <span className="font-mono text-xs text-black/40">{String(index + 1).padStart(2, '0')}</span>
                        <span
                          className="flex-1 font-display text-xl leading-none transition-transform group-hover:translate-x-1"
                          data-tina-field={rawCategory ? tinaField(rawCategory, 'category') : undefined}
                        >
                          {service.category}
                        </span>
                        <Plus className="size-4 shrink-0 text-black/60 transition-transform group-hover:rotate-90" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.article
                key={selectedService.category}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden rounded-3xl bg-white text-black shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
              >
                <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
                  <button
                    type="button"
                    onClick={() => setIsDetailOpen(false)}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-black/60 transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-vish-accent"
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    All services
                  </button>
                  <span className="font-mono text-xs text-vish-accent">{String(selectedIndex + 1).padStart(2, '0')}</span>
                </div>
                <div className="md:grid md:grid-cols-[minmax(0,0.92fr)_minmax(20rem,1.08fr)]">
                  <div className="px-6 py-7 sm:px-8 sm:py-9 md:py-10">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/45">Selected service</p>
                  <h3
                    className="mt-3 font-display text-4xl font-medium leading-[0.95] tracking-tight"
                    data-tina-field={selectedRawCategory ? tinaField(selectedRawCategory, 'category') : undefined}
                  >
                    {selectedService.category}<span className="text-vish-accent">.</span>
                  </h3>
                  <p
                    className="mt-5 font-sans text-sm leading-relaxed text-black/65"
                    data-tina-field={selectedRawCategory ? tinaField(selectedRawCategory, 'description') : undefined}
                  >
                    {selectedService.description}
                  </p>
                  <div className="mt-8 border-t border-black/10 pt-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/45">How we plan it</p>
                    <ol className="mt-4 space-y-3">
                      {selectedService.plan.map((step, index) => (
                        <li key={step} className="grid grid-cols-[1.5rem_1fr] gap-3">
                          <span className="font-mono text-xs text-vish-accent">{String(index + 1).padStart(2, '0')}</span>
                          <span className="font-sans text-sm leading-relaxed text-black/80">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="mt-8 border-t border-black/10 pt-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-black/45">Typical scope</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedService.items.slice(0, 4).map((item) => (
                        <span key={item} className="rounded-full border border-black/10 px-3 py-1.5 font-sans text-xs text-black/65">{item}</span>
                      ))}
                    </div>
                  </div>
                  <Button href="/book-call" variant="primary" size="md" className="mt-8 w-full" icon={<ArrowUpRight className="size-4" />} dataConversionAction="book_free_call">
                    Schedule a Free Call
                  </Button>
                  </div>
                  <div className="relative hidden min-h-full overflow-hidden border-l border-black/10 md:block">
                    <img
                      src={selectedService.image}
                      alt={selectedService.imageAlt}
                      className="absolute inset-0 size-full object-cover grayscale"
                      data-tina-field={selectedRawCategory ? tinaField(selectedRawCategory, 'image') : undefined}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent" aria-hidden="true" />
                    <p className="absolute bottom-6 left-7 font-mono text-xs uppercase tracking-[0.18em] text-white">
                      Project plan
                    </p>
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
