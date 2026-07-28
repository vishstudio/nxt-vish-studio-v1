'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useTinaPricing } from '../hooks/useTinaVisualEditing';
import { PageLayout } from '../components/ui/page-layout/page-layout';
import { PageHero } from '../components/ui/page-hero/page-hero';
import { Contact } from '../components/contact/contact';
import { Button } from '../components/ui/button/button';
import { SectionTitle } from '../components/ui/section-title/section-title';
import { Tabs } from '../components/tabs/Tabs';
import { type PricingCarePlan, type PricingCategory, type PricingPlan } from '../lib/pricing';

const serviceDetails = {
  website: {
    carePlans: [
      { title: 'Essentials Care', price: 'Rs 1,500 / mo', cadence: 'Monthly', summary: 'Core uptime checks, light content edits, backups, and monthly health monitoring.' },
      { title: 'Growth Care', price: 'Rs 2,500 / mo', cadence: 'Monthly', summary: 'Performance checks, minor content updates, SEO hygiene, uptime monitoring, and hosting support.' },
      { title: 'Premium Care', price: 'Rs 4,500 / mo', cadence: 'Monthly', summary: 'Priority support, conversion checks, technical SEO review, analytics monitoring, and monthly improvement planning.' },
    ],
    addOns: [
      { label: 'Additional content page', price: 'Rs 1,500 / page', note: 'For service, landing, legal, or campaign pages.' },
      { label: 'Additional homepage section', price: 'Rs 900 / section', note: 'Useful for testimonials, FAQs, galleries, or conversion blocks.' },
      { label: 'Blog article setup', price: 'Rs 600 / article', note: 'Formatting, metadata, image placement, and publishing support.' },
      { label: 'Advanced SEO pass', price: 'Rs 3,500', note: 'Keyword structure, metadata, schema, and internal linking review.' },
    ],
  },
  softwares: {
    carePlans: [
      { title: 'Essentials Software Support', price: 'Rs 5,500 / mo', cadence: 'Monthly', summary: 'Bug triage, dependency checks, uptime review, and minor workflow support.' },
      { title: 'Growth Software Support', price: 'Rs 8,500 / mo', cadence: 'Monthly', summary: 'Bug triage, dependency updates, small workflow improvements, and release support.' },
      { title: 'Premium Software Support', price: 'Rs 15,000 / mo', cadence: 'Monthly', summary: 'Priority engineering support, monitoring review, release planning, reporting checks, and iterative product improvements.' },
    ],
    addOns: [
      { label: 'Additional dashboard screen', price: 'Rs 5,500 / screen', note: 'Designed and engineered into the active product flow.' },
      { label: 'Advanced user role', price: 'Rs 6,500 / role', note: 'Permissions, routing, and interface states for a new role.' },
      { label: 'Third-party integration', price: 'From Rs 12,000', note: 'API, CRM, payment, booking, automation, or analytics connection.' },
      { label: 'Reporting module', price: 'From Rs 15,000', note: 'Metrics, filtering, export, and admin visibility.' },
    ],
  },
  'mobile-apps': {
    carePlans: [
      { title: 'Essentials App Support', price: 'Rs 6,500 / mo', cadence: 'Monthly', summary: 'Basic QA support, app health checks, issue triage, and store readiness checks.' },
      { title: 'Growth App Support', price: 'Rs 10,000 / mo', cadence: 'Monthly', summary: 'App monitoring, QA support, minor improvements, release support, and launch-readiness maintenance.' },
      { title: 'Premium App Support', price: 'Rs 18,000 / mo', cadence: 'Monthly', summary: 'Priority mobile support, release planning, feature iteration, analytics checks, and store optimization guidance.' },
    ],
    addOns: [
      { label: 'Additional app screen', price: 'Rs 6,500 / screen', note: 'Interface, state handling, and implementation for one new screen.' },
      { label: 'Push notification flow', price: 'From Rs 9,500', note: 'Notification triggers, copy, setup, and testing.' },
      { label: 'App store launch support', price: 'Rs 12,000', note: 'Listing guidance, assets, metadata, and submission support.' },
      { label: 'Advanced app workflow', price: 'From Rs 18,000', note: 'Multi-step flows, permissions, data rules, or integrations.' },
    ],
  },
  branding: {
    carePlans: [
      { title: 'Essentials Brand Support', price: 'Rs 1,200 / mo', cadence: 'Monthly', summary: 'Light brand file upkeep, small export requests, and visual consistency checks.' },
      { title: 'Growth Brand Support', price: 'Rs 1,800 / mo', cadence: 'Monthly', summary: 'Social asset support, campaign graphics, brand file maintenance, and monthly creative guidance.' },
      { title: 'Premium Brand Support', price: 'Rs 3,500 / mo', cadence: 'Monthly', summary: 'Priority creative support, campaign system refinement, launch assets, and ongoing brand direction.' },
    ],
    addOns: [
      { label: 'Additional logo lockup', price: 'Rs 1,200', note: 'Alternative layout or usage-specific mark.' },
      { label: 'Social media template', price: 'Rs 750 / template', note: 'Reusable branded layout for posts, stories, or promos.' },
      { label: 'Campaign creative set', price: 'Rs 4,500', note: 'A compact set of campaign visuals for one launch or offer.' },
      { label: 'Extended brand guideline page', price: 'Rs 1,000 / page', note: 'More detail for usage, tone, layouts, or production rules.' },
    ],
  },
} satisfies Record<string, {
  carePlans: PricingCarePlan[];
  addOns: { label: string; price: string; note: string }[];
}>;

const fallbackServiceDetail = {
  carePlans: [
    { title: 'Care Plan', price: 'Scoped monthly', cadence: 'Monthly', summary: 'Ongoing support, technical checks, small updates, and launch-readiness maintenance.' },
  ],
  addOns: [
    { label: 'Additional scoped feature', price: 'Quoted after review', note: 'Priced according to complexity, dependencies, and delivery timeline.' },
  ],
};

const serviceOrder = ['website', 'mobile-apps', 'softwares', 'branding'];

function getPackageCarePlan(plan: PricingPlan, detail: typeof fallbackServiceDetail, index: number): PricingCarePlan {
  if (plan.carePlan?.price) {
    return {
      title: plan.carePlan.title || `${plan.name} Care`,
      price: plan.carePlan.price,
      cadence: plan.carePlan.cadence || 'Monthly',
      summary: plan.carePlan.summary || 'Ongoing support, technical checks, small updates, and launch-readiness maintenance.',
    };
  }

  return detail.carePlans[index] ?? detail.carePlans[detail.carePlans.length - 1] ?? fallbackServiceDetail.carePlans[0];
}

function PackageRow({
  plan,
  index,
  tinaField,
  rawPlan,
}: {
  plan: PricingPlan;
  index: number;
  tinaField: (obj: any, field: string) => string | undefined;
  rawPlan: any;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`grid gap-8 border-t border-white/10 py-10 lg:grid-cols-[0.85fr_1fr_1.2fr_auto] lg:items-start ${
        plan.featured ? 'bg-vish-accent/[0.025]' : ''
      }`}
    >
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span
            className="font-mono text-xs font-semibold uppercase tracking-widest text-vish-accent"
            data-tina-field={rawPlan ? tinaField(rawPlan, 'label') : undefined}
          >
            {plan.label}
          </span>
          {plan.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-vish-accent px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black">
              <Sparkles className="h-3 w-3" />
              Most Popular
            </span>
          )}
        </div>
        <h3
          className="font-display text-3xl font-medium leading-tight text-white md:text-4xl"
          data-tina-field={rawPlan ? tinaField(rawPlan, 'name') : undefined}
        >
          {plan.name}
        </h3>
        <p
          className="mt-4 max-w-md font-sans text-sm leading-relaxed text-gray-400 md:text-base"
          data-tina-field={rawPlan ? tinaField(rawPlan, 'tagline') : undefined}
        >
          {plan.tagline}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className="font-display text-4xl font-medium tracking-tight text-white md:text-5xl"
            data-tina-field={rawPlan ? tinaField(rawPlan, plan.discountedPrice ? 'discountedPrice' : 'price') : undefined}
          >
            {plan.discountedPrice || plan.price}
          </span>
          {plan.discountedPrice && (
            <span
              className="font-mono text-sm text-gray-500 line-through"
              data-tina-field={rawPlan ? tinaField(rawPlan, 'price') : undefined}
            >
              {plan.price}
            </span>
          )}
        </div>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-500">
          {plan.priceNote}
        </p>
        <p className="mt-5 font-mono text-xs leading-relaxed text-gray-400">
          <span className="text-vish-accent">•</span> Delivery: {plan.delivery}
        </p>
        {plan.bestFor && (
          <p className="mt-4 max-w-sm font-mono text-xs leading-relaxed text-gray-500">
            Best for: {plan.bestFor}
          </p>
        )}
        {plan.revisions && (
          <p className="mt-2 font-mono text-xs leading-relaxed text-gray-500">
            Revisions: {plan.revisions}
          </p>
        )}
      </div>

      <ul
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
        data-tina-field={rawPlan ? tinaField(rawPlan, 'features') : undefined}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/8">
              <Check className="h-3 w-3 text-vish-accent" />
            </span>
            <span className="font-sans text-sm leading-relaxed text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="hidden lg:block lg:min-w-40" aria-hidden="true" />
    </motion.article>
  );
}

function ActivePricingSection({
  category,
  categoryIndex,
  tinaField,
  rawCategory,
}: {
  category: PricingCategory;
  categoryIndex: number;
  tinaField: (obj: any, field: string) => string | undefined;
  rawCategory: any;
}) {
  const detail = serviceDetails[category.slug as keyof typeof serviceDetails] ?? fallbackServiceDetail;

  return (
    <motion.div
      key={category.slug || category.label}
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      role="tabpanel"
      id={`pricing-${category.slug || category.label.toLowerCase().replace(/\s+/g, '-')}-panel`}
      aria-labelledby={`pricing-${category.slug || category.label.toLowerCase().replace(/\s+/g, '-')}-tab`}
    >
      <section className="border-b border-white/10 pb-16 md:pb-20">
        <div className="mb-10 flex flex-col items-start gap-6">
          <div>
            <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-vish-accent">
              {String(categoryIndex + 1).padStart(2, '0')} / Service Pricing
            </span>
            <SectionTitle
              size="md"
              tinaField={rawCategory ? tinaField(rawCategory, 'label') : undefined}
            >
              {category.label}
            </SectionTitle>
          </div>
          <p className="max-w-2xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
            Compare starter, growth, and premium scopes for {category.label.toLowerCase()} projects. Below the packages, you will find the matching care plan and common additional costs for this service.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-6 md:px-8">
          {category.plans.map((plan, index) => (
            <PackageRow
              key={`${category.slug || category.label}-${plan.name}`}
              plan={plan}
              index={index}
              tinaField={tinaField}
              rawPlan={rawCategory?.plans?.[index]}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch md:py-20">
        <div className="rounded-2xl border border-vish-accent/35 bg-vish-accent/[0.045] p-8 md:p-10">
          <span className="mb-5 block font-mono text-xs uppercase tracking-widest text-vish-accent">
            Care Plans
          </span>
          <h3 className="font-display text-4xl font-medium text-white">
            Monthly care by package
          </h3>
          <p className="mt-8 font-sans text-base leading-relaxed text-gray-400">
            Each {category.label.toLowerCase()} package can be paired with its own maintenance scope after launch, so support scales with the complexity of the work.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-6 md:px-8">
          <div className="grid gap-6 border-b border-white/10 py-8 md:grid-cols-[0.42fr_1fr] md:items-end">
            <div>
              <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-vish-accent">
                Maintenance
              </span>
              <h3 className="font-display text-3xl font-medium text-white md:text-4xl">
                Package care
              </h3>
            </div>
            <p className="font-sans text-sm leading-relaxed text-gray-400 md:text-base">
              Monthly support is priced against the selected package tier, from essential checks to priority improvement cycles.
            </p>
          </div>
          {category.plans.map((plan, index) => {
            const carePlan = getPackageCarePlan(plan, detail, index);

            return (
              <div
                key={`${plan.label}-${plan.name}-care`}
                className="grid gap-4 border-b border-white/8 py-6 last:border-b-0 md:grid-cols-[0.38fr_0.35fr_1fr] md:items-start"
              >
                <div>
                  <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-vish-accent">
                    {plan.label}
                  </p>
                  <h4
                    className="font-display text-2xl font-medium text-white"
                    data-tina-field={rawCategory?.plans?.[index]?.carePlan ? tinaField(rawCategory.plans[index].carePlan, 'title') : undefined}
                  >
                    {carePlan.title}
                  </h4>
                </div>
                <div>
                  <p
                    className="font-display text-2xl font-medium text-white md:text-3xl"
                    data-tina-field={rawCategory?.plans?.[index]?.carePlan ? tinaField(rawCategory.plans[index].carePlan, 'price') : undefined}
                  >
                    {carePlan.price}
                  </p>
                  <p
                    className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-500"
                    data-tina-field={rawCategory?.plans?.[index]?.carePlan ? tinaField(rawCategory.plans[index].carePlan, 'cadence') : undefined}
                  >
                    {carePlan.cadence}
                  </p>
                </div>
                <p
                  className="font-sans text-sm leading-relaxed text-gray-400"
                  data-tina-field={rawCategory?.plans?.[index]?.carePlan ? tinaField(rawCategory.plans[index].carePlan, 'summary') : undefined}
                >
                  {carePlan.summary}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-6 md:px-8">
          <div className="grid gap-6 border-b border-white/10 py-8 md:grid-cols-[0.42fr_1fr] md:items-end">
            <div>
              <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-vish-accent">
                Additional Costs
              </span>
              <h3 className="font-display text-3xl font-medium text-white md:text-4xl">
                Common add-ons
              </h3>
            </div>
            <p className="font-sans text-sm leading-relaxed text-gray-400 md:text-base">
              These are typical add-on prices for {category.label.toLowerCase()} projects. Final pricing depends on complexity, content readiness, integrations, and timeline.
            </p>
          </div>
          {detail.addOns.map((addOn) => (
            <div
              key={addOn.label}
              className="grid gap-4 border-b border-white/8 py-6 last:border-b-0 md:grid-cols-[0.55fr_0.35fr_1fr] md:items-start"
            >
              <h4 className="font-display text-2xl font-medium text-white">
                {addOn.label}
              </h4>
              <p className="font-mono text-xs uppercase tracking-widest text-vish-accent">
                {addOn.price}
              </p>
              <p className="font-sans text-sm leading-relaxed text-gray-400">
                {addOn.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

export const PricingPage = () => {
  const { data: content, tinaField, rawPricingPage } = useTinaPricing();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isPricingNavVisible, setIsPricingNavVisible] = useState(false);
  const heroBackgroundImage = content.heroBackgroundImageUrl || content.heroBackgroundImage;
  const unsortedPricingCategories = content.pricingCategories.length > 0
    ? content.pricingCategories
    : [];
  const pricingCategories = [...unsortedPricingCategories].sort((a, b) => {
    const aIndex = serviceOrder.indexOf(a.slug);
    const bIndex = serviceOrder.indexOf(b.slug);

    return (aIndex === -1 ? serviceOrder.length : aIndex) - (bIndex === -1 ? serviceOrder.length : bIndex);
  });
  const activeCategory = pricingCategories[activeCategoryIndex] ?? pricingCategories[0];
  const activeRawCategory = rawPricingPage?.pricingCategories?.find((category: any) => category?.slug === activeCategory?.slug);
  const tabItems = pricingCategories.map((category) => ({
    id: `pricing-${category.slug || category.label.toLowerCase().replace(/\s+/g, '-')}`,
    label: category.label,
    tinaField: rawPricingPage?.pricingCategories?.find((rawCategory: any) => rawCategory?.slug === category.slug)
      ? tinaField(rawPricingPage.pricingCategories.find((rawCategory: any) => rawCategory?.slug === category.slug), 'label')
      : undefined,
  }));
  const handleCategoryChange = (index: number) => {
    setActiveCategoryIndex(index);

    window.requestAnimationFrame(() => {
      document.getElementById('pricing-content')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  useEffect(() => {
    const pricingSection = document.getElementById('pricing-content');

    if (!pricingSection) {
      return;
    }

    const updatePricingNavVisibility = () => {
      const sectionBounds = pricingSection.getBoundingClientRect();
      const revealPoint = window.innerHeight * 0.72;
      const shouldShow = sectionBounds.top <= revealPoint && sectionBounds.bottom > 160;

      setIsPricingNavVisible(shouldShow);
    };

    updatePricingNavVisibility();
    window.addEventListener('scroll', updatePricingNavVisibility, { passive: true });
    window.addEventListener('resize', updatePricingNavVisibility);

    return () => {
      window.removeEventListener('scroll', updatePricingNavVisibility);
      window.removeEventListener('resize', updatePricingNavVisibility);
    };
  }, []);

  return (
    <PageLayout>
      <PageHero
        label={content.heroLabel}
        labelTinaField={tinaField('heroLabel')}
        title={
          <h1 className="mb-8 font-display text-6xl font-medium leading-[0.95] tracking-tight text-white md:text-8xl lg:text-9xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="block"
              data-tina-field={tinaField('heroTitleLine1')}
            >
              {content.heroTitleLine1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block text-gray-500"
              data-tina-field={tinaField('heroTitleLine2')}
            >
              {content.heroTitleLine2}<span className="text-vish-accent">.</span>
            </motion.span>
          </h1>
        }
        description={content.heroSubtext}
        descriptionTinaField={tinaField('heroSubtext')}
        backgroundImage={heroBackgroundImage}
        backgroundImageClassName="object-[70%_50%]"
      />

      <section id="pricing-content" className="bg-black px-6 pb-40 pt-6 md:px-12 md:pb-44 md:pt-10">
        <div className="mx-auto max-w-[1400px]">
          {activeCategory && (
            <ActivePricingSection
              category={activeCategory}
              categoryIndex={activeCategoryIndex}
              tinaField={tinaField}
              rawCategory={activeRawCategory}
            />
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-white/8 bg-white/[0.02] p-8 md:flex-row md:items-center md:p-12"
          >
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-vish-accent" />
                <span
                  className="font-display text-3xl text-white"
                  data-tina-field={tinaField('customLabel')}
                >
                  {content.customLabel}
                </span>
              </div>
              <p
                className="max-w-2xl font-sans text-base leading-relaxed text-gray-400 md:text-lg"
                data-tina-field={tinaField('customDescription')}
              >
                {content.customDescription}
              </p>
            </div>
            <Button
              href={content.customCtaHref}
              variant="outline"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              className="shrink-0 font-mono text-xs font-semibold uppercase tracking-widest"
            >
              {content.customCtaLabel}
            </Button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isPricingNavVisible && (
          <motion.div
            initial={{ y: 40, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: 28, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-[720px] rounded-[1.75rem] border border-white/10 bg-black/80 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <Tabs
                items={tabItems}
                activeIndex={activeCategoryIndex}
                onChange={handleCategoryChange}
                ariaLabel="Pricing services"
                className="w-full justify-center border-white/5 bg-white/[0.025]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Contact />
    </PageLayout>
  );
};
