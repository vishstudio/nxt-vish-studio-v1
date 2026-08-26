'use client';

import { CalendarCheck } from 'lucide-react';
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

interface ServiceLandingPageProps {
  label: string;
  title: string;
  description: string;
}

export const ServiceLandingPage = ({
  label,
  title,
  description,
}: ServiceLandingPageProps) => {
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
              {title}<span className="text-vish-accent">.</span>
            </motion.span>
          </h1>
        }
        description={description}
        action={
          <Button
            href={PROJECT_INQUIRY_HREF}
            variant="cta"
            size="lg"
            icon={<CalendarCheck className="h-4 w-4" />}
            iconPosition="right"
            ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
            dataConversionAction={PROJECT_INQUIRY_ACTION}
            className="mt-8 font-mono text-xs font-semibold uppercase tracking-widest"
          >
            Schedule a Free Call
          </Button>
        }
      />
      <Contact />
    </PageLayout>
  );
};
