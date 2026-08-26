'use client';

import { ArrowRight, Boxes, CalendarCheck, ChartNoAxesCombined, ShieldCheck, Workflow } from 'lucide-react';
import { motion } from 'motion/react';
import { Contact } from '../components/contact/contact';
import { Button } from '../components/ui/button/button';
import { PageHero } from '../components/ui/page-hero/page-hero';
import { PageLayout } from '../components/ui/page-layout/page-layout';
import { SectionTitle } from '../components/ui/section-title/section-title';
import {
  PROJECT_INQUIRY_ACTION,
  PROJECT_INQUIRY_ARIA_LABEL,
  PROJECT_INQUIRY_HREF,
} from '../lib/conversion';

const productTypes = [
  {
    title: 'Client portals',
    description: 'Secure spaces for onboarding, documents, requests, payments, bookings, and account activity.',
  },
  {
    title: 'Operational SaaS',
    description: 'Subscription-ready tools for teams that need approvals, dashboards, records, workflows, and reporting.',
  },
  {
    title: 'Vertical products',
    description: 'Focused applications for hospitality, property, fitness, clinics, agencies, education, and local service businesses.',
  },
];

const capabilityBlocks = [
  {
    icon: Boxes,
    title: 'Product architecture',
    text: 'We shape the data model, roles, flows, billing logic, and admin surfaces before the interface is built.',
  },
  {
    icon: Workflow,
    title: 'Workflow design',
    text: 'Core actions are mapped into repeatable flows so clients can complete work without manual follow-up.',
  },
  {
    icon: ShieldCheck,
    title: 'Access control',
    text: 'User roles, permissions, account states, and protected routes are planned into the product from the start.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Growth visibility',
    text: 'Dashboards, events, reports, and export paths give teams a clear view of usage and business performance.',
  },
];

const buildPhases = [
  'Discovery and product scope',
  'UX flows and clickable prototype',
  'Design system and application UI',
  'Frontend, backend, auth, and database build',
  'Testing, deployment, analytics, and handoff',
];

export const SaasProductsPage = () => {
  return (
    <PageLayout>
      <PageHero
        label="SaaS Products"
        backgroundImage="/assets/img/services-hero.jpg"
        backgroundImageClassName="object-[58%_50%]"
        contentParallax
        title={
          <h1 className="mb-8 font-display text-6xl font-medium leading-[0.95] tracking-tight text-white md:text-8xl lg:text-9xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Build the SaaS
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-gray-500"
            >
              your clients use<span className="text-vish-accent">.</span>
            </motion.span>
          </h1>
        }
        description="We design and engineer browser-based SaaS applications for businesses that want to give clients, teams, or partners a polished product experience instead of another spreadsheet or manual workflow."
        action={
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              href={PROJECT_INQUIRY_HREF}
              variant="cta"
              size="lg"
              icon={<CalendarCheck className="h-4 w-4" />}
              iconPosition="right"
              ariaLabel={PROJECT_INQUIRY_ARIA_LABEL}
              dataConversionAction={PROJECT_INQUIRY_ACTION}
              className="font-mono text-xs font-semibold uppercase tracking-widest"
            >
              Scope Your SaaS
            </Button>
            <Button
              href="/pricing"
              variant="outline"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              className="font-mono text-xs font-semibold uppercase tracking-widest"
            >
              View Pricing
            </Button>
          </div>
        }
      />

      <section className="bg-black px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <span className="mb-5 block font-mono text-xs uppercase tracking-widest text-vish-accent">
              Product Tracks
            </span>
            <SectionTitle size="lg" className="max-w-xl">
              SaaS applications
            </SectionTitle>
          </div>
          <div className="grid gap-5">
            {productTypes.map((type, index) => (
              <motion.article
                key={type.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="border-t border-white/10 py-8"
              >
                <div className="grid gap-5 md:grid-cols-[0.4fr_1fr] md:items-start">
                  <h3 className="font-display text-3xl font-medium text-white">
                    {type.title}
                  </h3>
                  <p className="max-w-2xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
                    {type.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex flex-col justify-between gap-6 border-t border-white/10 pt-12 md:flex-row md:items-end">
            <div>
              <span className="mb-5 block font-mono text-xs uppercase tracking-widest text-vish-accent">
                Capabilities
              </span>
              <SectionTitle size="md">Built for use</SectionTitle>
            </div>
            <p className="max-w-xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
              Every SaaS build is structured around the core jobs users need to complete, with the admin and operational layer treated as part of the product.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {capabilityBlocks.map((block, index) => {
              const Icon = block.icon;
              return (
                <motion.article
                  key={block.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8"
                >
                  <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full border border-vish-accent/30 bg-vish-accent/10 text-vish-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-white md:text-3xl">
                    {block.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-gray-400 md:text-base">
                    {block.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 pb-28 md:px-12 md:pb-36">
        <div className="mx-auto grid max-w-[1400px] gap-12 rounded-2xl border border-white/10 bg-white/[0.025] p-8 md:p-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="mb-5 block font-mono text-xs uppercase tracking-widest text-vish-accent">
              Delivery
            </span>
            <h2 className="font-display text-4xl font-medium leading-tight text-white md:text-5xl">
              From idea to working application<span className="text-vish-accent">.</span>
            </h2>
          </div>
          <ol className="grid gap-4">
            {buildPhases.map((phase, index) => (
              <li
                key={phase}
                className="grid grid-cols-[auto_1fr] items-center gap-5 border-t border-white/10 py-5 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-vish-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-sans text-lg text-white">{phase}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Contact />
    </PageLayout>
  );
};
