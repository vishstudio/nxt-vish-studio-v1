'use client';

import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Box,
  CalendarCheck,
  LayoutTemplate,
  Megaphone,
  Monitor,
  Palette,
  Plus,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import type { ServiceCategory } from '../../lib/content';
import { sortByCanonicalServiceOrder } from '../../lib/services';
import { Button } from '../ui/button/button';

interface ServiceCatalogueProps {
  services: ServiceCategory[];
  rawCategories?: unknown[];
  tinaField: (source: unknown, field?: string) => string | undefined;
  id?: string;
}

const serviceIcons: Record<string, LucideIcon> = {
  'Social Media Marketing': Megaphone,
  'SaaS Products': Box,
  Websites: Monitor,
  'Website Templates': LayoutTemplate,
  Softwares: Box,
  'Mobile Apps': Smartphone,
  Branding: Palette,
  'AI Integrations & Automations': Bot,
};

export const ServiceCatalogue = ({ services, rawCategories, tinaField, id }: ServiceCatalogueProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const orderedServices = sortByCanonicalServiceOrder(services);
  const selectedService = orderedServices[selectedIndex] ?? orderedServices[0];
  const selectedRawCategory = rawCategories?.find(
    (category: any) => category?.category === selectedService?.category,
  );

  if (!selectedService) return null;

  return (
    <section id={id} className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32" aria-labelledby="service-catalogue-title">
      <img
        src="/assets/img/services-section.jpg"
        alt=""
        className="absolute -top-[10%] left-0 h-[120%] w-full object-cover opacity-30 grayscale"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div className="absolute inset-0 bg-linear-to-b from-vish-bg/85 via-black/35 to-vish-bg/90" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
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

        <div className="w-full">
          <motion.div
            layout
            className="overflow-hidden rounded-3xl border border-white/10 bg-black/80 text-white shadow-2xl shadow-black/50 backdrop-blur-xl"
            data-testid="service-catalogue-panel"
          >
            <AnimatePresence mode="wait" initial={false}>
              {!isDetailOpen ? (
                <motion.div
                  key="mobile-service-list"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="border-b border-white/10 px-6 py-7">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">Our services</p>
                    <p className="mt-3 font-display text-2xl leading-tight">Select a service to see the plan<span className="text-vish-accent">.</span></p>
                  </div>
                  <div className="grid px-6 pb-4 pt-2 md:grid-cols-2 md:gap-x-8">
                    {orderedServices.map((service, index) => {
                      const rawCategory = rawCategories?.find(
                        (category: any) => category?.category === service.category,
                      );
                      const Icon = serviceIcons[service.category] ?? Box;

                      return (
                        <button
                          key={service.category}
                          type="button"
                          onClick={() => {
                            setSelectedIndex(index);
                            setIsDetailOpen(true);
                          }}
                          className="group flex w-full items-center gap-3 border-b border-white/10 py-4 text-left last:border-b-0 md:py-5"
                        >
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white md:size-9">
                            <Icon className="size-4 md:size-[1.125rem]" aria-hidden="true" />
                          </span>
                          <span
                            className="flex-1 font-display text-xl leading-none transition-all group-hover:translate-x-1 group-hover:text-vish-accent"
                            data-tina-field={rawCategory ? tinaField(rawCategory, 'category') : undefined}
                          >
                            {service.category}
                          </span>
                          <Plus className="size-4 shrink-0 text-white/60 transition-transform group-hover:rotate-90" aria-hidden="true" />
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
              >
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                  <button
                    type="button"
                    onClick={() => setIsDetailOpen(false)}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-vish-accent"
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    All services
                  </button>
                </div>
                <div className="md:grid md:grid-cols-[minmax(0,0.92fr)_minmax(20rem,1.08fr)]">
                  <div className="px-6 py-7 sm:px-8 sm:py-9 md:py-10">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">Selected service</p>
                  {(() => {
                    const Icon = serviceIcons[selectedService.category] ?? Box;

                    return (
                      <div className="mt-3 flex items-start gap-3 sm:gap-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white sm:size-12">
                          <Icon className="size-5 sm:size-6" aria-hidden="true" />
                        </span>
                        <h3
                          className="font-display text-4xl font-medium leading-[0.95] tracking-tight"
                          data-tina-field={selectedRawCategory ? tinaField(selectedRawCategory, 'category') : undefined}
                        >
                          {selectedService.category}<span className="text-vish-accent">.</span>
                        </h3>
                      </div>
                    );
                  })()}
                  <p
                    className="mt-5 font-sans text-sm leading-relaxed text-gray-400"
                    data-tina-field={selectedRawCategory ? tinaField(selectedRawCategory, 'description') : undefined}
                  >
                    {selectedService.description}
                  </p>
                  <div className="mt-8 border-t border-white/10 pt-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">How we plan it</p>
                    <ol className="mt-4 space-y-3">
                      {selectedService.plan.map((step, index) => (
                        <li key={step} className="grid grid-cols-[1.5rem_1fr] gap-3">
                          <span className="font-mono text-xs text-vish-accent">{String(index + 1).padStart(2, '0')}</span>
                          <span className="font-sans text-sm leading-relaxed text-gray-200">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="mt-8 border-t border-white/10 pt-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">Typical scope</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedService.items.slice(0, 4).map((item) => (
                        <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 font-sans text-xs text-gray-300">{item}</span>
                      ))}
                    </div>
                  </div>
                  <Button href="/book-call" variant="primary" size="md" className="mt-8 w-full" icon={<CalendarCheck className="size-4" />} dataConversionAction="book_free_call">
                    Schedule a Free Call
                  </Button>
                  </div>
                  <div className="relative hidden min-h-full overflow-hidden border-l border-white/10 md:block">
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
          </motion.div>
        </div>

      </div>
    </section>
  );
};
