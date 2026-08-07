'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Contact } from '../components/contact/contact';
import { Button } from '../components/ui/button/button';
import { PageHero } from '../components/ui/page-hero/page-hero';
import { PageLayout } from '../components/ui/page-layout/page-layout';
import {
  PROJECT_INQUIRY_ACTION,
  PROJECT_INQUIRY_ARIA_LABEL,
  PROJECT_INQUIRY_HREF,
} from '../lib/conversion';

interface ServiceComingSoonPageProps {
  label: string;
  title: string;
  mutedTitle: string;
  description: string;
}

export const ServiceComingSoonPage = ({
  label,
  title,
  mutedTitle,
  description,
}: ServiceComingSoonPageProps) => {
  return (
    <PageLayout>
      <PageHero
        label={label}
        backgroundImage="/assets/img/services-hero.jpg"
        backgroundImageClassName="object-[60%_50%]"
        title={
          <h1 className="mb-8 font-display text-6xl font-medium leading-[0.95] tracking-tight text-white md:text-8xl lg:text-9xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {title}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-gray-500"
            >
              {mutedTitle}<span className="text-vish-accent">.</span>
            </motion.span>
          </h1>
        }
        description={description}
        action={
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              href={PROJECT_INQUIRY_HREF}
              variant="cta"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
              dataConversionAction={PROJECT_INQUIRY_ACTION}
              className="font-mono text-xs font-semibold uppercase tracking-widest"
            >
              Book Free Call
            </Button>
            <Button
              href="/services/saas-products"
              variant="outline"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              className="font-mono text-xs font-semibold uppercase tracking-widest"
            >
              Explore SaaS Products
            </Button>
          </div>
        }
      />
      <section className="bg-black px-6 pb-28 pt-6 md:px-12 md:pb-36">
        <div className="mx-auto max-w-[1400px] border-t border-white/10 pt-12">
          <div className="max-w-3xl">
            <span className="mb-5 block font-mono text-xs uppercase tracking-widest text-vish-accent">
              Coming Soon
            </span>
            <p className="font-sans text-xl leading-relaxed text-gray-400 md:text-2xl">
              This service track is being prepared. For now, book a call and we can scope the same work directly with you.
            </p>
          </div>
        </div>
      </section>
      <Contact />
    </PageLayout>
  );
};
