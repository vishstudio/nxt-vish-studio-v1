"use client";
import { trackPricingCtaClick } from "@/src/lib/analytics";
import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useTinaPricing } from "../../hooks/useTinaVisualEditing";
import { buildCtaHref, type PricingPlan } from "../../lib/pricing";
import { CarouselProgress } from "../carousel-progress/CarouselProgress";
import { Tabs } from "../tabs/Tabs";
import { Button } from "../ui/button/button";
import { SectionTitle } from "../ui/section-title/section-title";

function PlanCard({
  plan,
  index,
  tinaField,
  rawPlan,
  isExpanded,
  onToggleDetails,
}: {
  plan: PricingPlan;
  index: number;
  tinaField: (obj: any, field: string) => string | undefined;
  rawPlan: any;
  isExpanded: boolean;
  onToggleDetails: () => void;
}) {
  const href = buildCtaHref(plan.ctaLink);

  return (
    <motion.div
      data-pricing-card
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`plan-card relative flex min-w-full snap-center flex-col rounded-2xl border p-6 transition-all duration-300 sm:min-w-[400px] sm:p-8 md:min-w-[440px] lg:min-w-0 ${
        plan.featured
          ? "border-vish-accent/60 bg-white/[0.06] shadow-[0_0_60px_-12px] shadow-vish-accent/20"
          : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"
      }`}
    >
      {plan.featured && (
        <div className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-vish-accent text-black font-mono text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-7 md:mb-8">
        <span
          className="mb-3 block font-mono text-[11px] uppercase tracking-widest text-vish-accent sm:text-xs"
          data-tina-field={rawPlan ? tinaField(rawPlan, "label") : undefined}
        >
          {plan.label}
        </span>
        <h3
          className="mb-5 font-display text-2xl font-medium leading-tight text-white sm:text-3xl md:mb-6"
          data-tina-field={rawPlan ? tinaField(rawPlan, "name") : undefined}
        >
          {plan.name}
        </h3>
        <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className="font-display text-4xl font-medium tracking-tight text-white sm:text-5xl"
            data-tina-field={
              rawPlan
                ? tinaField(
                    rawPlan,
                    plan.discountedPrice ? "discountedPrice" : "price",
                  )
                : undefined
            }
          >
            {plan.discountedPrice || plan.price}
          </span>
          {plan.discountedPrice && (
            <span
              className="font-mono text-xs text-gray-500 line-through sm:text-sm"
              data-tina-field={
                rawPlan ? tinaField(rawPlan, "price") : undefined
              }
            >
              {plan.price}
            </span>
          )}
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500 sm:text-xs">
          {plan.priceNote}
        </span>

        <div className="flex items-center gap-2 mt-4">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-vish-accent" />
          <span className="font-mono text-xs leading-relaxed text-gray-400">
            Delivery: {plan.delivery}
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p
        className="mb-7 border-b border-white/8 pb-7 font-sans text-sm leading-relaxed text-gray-400 md:mb-8 md:pb-8"
        data-tina-field={rawPlan ? tinaField(rawPlan, "tagline") : undefined}
      >
        {plan.tagline}
      </p>

      {/* CTA */}
      <div className="mt-auto space-y-3 lg:order-last">
        <Button
          href={href}
          variant={plan.featured ? "cta" : "outline"}
          size="md"
          onClick={() => trackPricingCtaClick(plan.name, plan.ctaLink.linkType)}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          className="w-full rounded-xl py-3.5 font-mono text-xs font-semibold uppercase tracking-widest sm:text-sm sm:normal-case sm:tracking-normal"
        >
          {plan.ctaLabel}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleDetails}
          icon={
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          }
          iconPosition="right"
          className="w-full rounded-xl border border-white/10 py-3 font-mono text-xs font-semibold uppercase tracking-widest lg:hidden"
          ariaLabel={`${isExpanded ? "Hide" : "Show"} ${
            plan.name
          } package details`}
          ariaExpanded={isExpanded}
        >
          {isExpanded ? "Hide All Details" : "See All Details"}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {(isExpanded || false) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <PlanDetails plan={plan} tinaField={tinaField} rawPlan={rawPlan} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden lg:block lg:flex-1">
        <PlanDetails plan={plan} tinaField={tinaField} rawPlan={rawPlan} />
      </div>
    </motion.div>
  );
}

function PlanDetails({
  plan,
  tinaField,
  rawPlan,
}: {
  plan: PricingPlan;
  tinaField: (obj: any, field: string) => string | undefined;
  rawPlan: any;
}) {
  return (
    <div className="mt-8 border-t border-white/8 pt-8 lg:border-t-0 lg:pt-0">
      <ul
        className="mb-8 flex flex-col gap-3"
        data-tina-field={rawPlan ? tinaField(rawPlan, "features") : undefined}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                plan.featured ? "bg-vish-accent/20" : "bg-white/8"
              }`}
            >
              <Check
                className={`w-2.5 h-2.5 ${
                  plan.featured ? "text-vish-accent" : "text-gray-400"
                }`}
              />
            </span>
            <span className="font-sans text-sm leading-relaxed text-gray-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        {plan.carePlan?.price && (
          <p
            className="font-mono text-xs text-gray-500"
            data-tina-field={
              rawPlan?.carePlan
                ? tinaField(rawPlan.carePlan, "price")
                : undefined
            }
          >
            <span className="text-gray-600">Care plan: </span>
            {plan.carePlan.price}
          </p>
        )}
        {plan.bestFor && (
          <p className="font-mono text-xs text-gray-500">
            <span className="text-gray-600">Best for: </span>
            {plan.bestFor}
          </p>
        )}
        {plan.revisions && (
          <p className="font-mono text-xs text-gray-500">
            <span className="text-gray-600">Revisions: </span>
            {plan.revisions}
          </p>
        )}
      </div>
    </div>
  );
}

export const Pricing = () => {
  const { data: content, tinaField, rawPricingPage } = useTinaPricing();
  const carouselRef = useRef<HTMLDivElement>(null);
  const pricingCategories =
    content.pricingCategories.length > 0
      ? content.pricingCategories
      : [
          {
            label: "Website",
            slug: "website",
            plans: [],
          },
        ];
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const activeCategory =
    pricingCategories[activeCategoryIndex] ?? pricingCategories[0];
  const activeRawCategory =
    rawPricingPage?.pricingCategories?.[activeCategoryIndex];
  const activeRawPlans = activeRawCategory?.plans;
  const tabItems = pricingCategories.map((category, index) => ({
    id: `pricing-${
      category.slug || category.label.toLowerCase().replace(/\s+/g, "-")
    }`,
    label: category.label,
    tinaField: rawPricingPage?.pricingCategories?.[index]
      ? tinaField(rawPricingPage.pricingCategories[index], "label")
      : undefined,
  }));

  const handleCarouselScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(
      carousel.querySelectorAll<HTMLElement>("[data-pricing-card]"),
    );
    if (cards.length === 0) return;

    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    const closestIndex = cards.reduce((closest, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const currentDistance = Math.abs(cardCenter - carouselCenter);
      const closestCard = cards[closest];
      const closestCenter =
        closestCard.offsetLeft + closestCard.offsetWidth / 2;
      return currentDistance < Math.abs(closestCenter - carouselCenter)
        ? index
        : closest;
    }, 0);

    setActivePlanIndex(closestIndex);
  };

  return (
    <section
      className="pricing overflow-hidden bg-vish-bg px-6 py-24 md:px-12 md:py-32"
      id="pricing"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              className="mb-6"
              tinaField={tinaField("sectionHeading")}
            >
              {content.sectionHeading}
            </SectionTitle>
            <p
              className="max-w-md font-sans text-base leading-relaxed text-gray-400 md:text-lg"
              data-tina-field={tinaField("sectionSubtext")}
            >
              {content.sectionSubtext}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block flex-shrink-0"
          >
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white font-sans text-sm hover:border-white/40 hover:bg-white/5 transition-all"
            >
              View all plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Category tabs */}
        {tabItems.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-10 w-full md:mb-12"
          >
            <Tabs
              items={tabItems}
              activeIndex={activeCategoryIndex}
              ariaLabel="Pricing categories"
              className="w-full md:w-auto"
              onChange={(index) => {
                setActiveCategoryIndex(index);
                setIsDetailsExpanded(false);
                setActivePlanIndex(0);
                carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
              }}
            />
          </motion.div>
        )}

        {/* Plans grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.slug || activeCategory.label}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 pt-5 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0 lg:pt-5 [&::-webkit-scrollbar]:hidden"
            role="tabpanel"
            id={`${tabItems[activeCategoryIndex]?.id || "pricing"}-panel`}
            aria-labelledby={`${
              tabItems[activeCategoryIndex]?.id || "pricing"
            }-tab`}
            aria-label={`${activeCategory.label} pricing packages`}
          >
            {activeCategory.plans.map((plan, index) => {
              return (
                <PlanCard
                  key={`${activeCategory.slug || activeCategory.label}-${
                    plan.name
                  }`}
                  plan={plan}
                  index={index}
                  tinaField={tinaField}
                  rawPlan={activeRawPlans?.[index]}
                  isExpanded={isDetailsExpanded}
                  onToggleDetails={() =>
                    setIsDetailsExpanded((current) => !current)
                  }
                />
              );
            })}
          </motion.div>
        </AnimatePresence>

        <CarouselProgress
          count={activeCategory.plans.length}
          activeIndex={activePlanIndex}
          className="mb-12 flex justify-center lg:hidden"
        />

        {/* Custom / Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl mt-6 border border-white/8 bg-white/[0.02] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-vish-accent" />
              <span
                className="font-display text-2xl text-white"
                data-tina-field={tinaField("customLabel")}
              >
                {content.customLabel}
              </span>
            </div>
            <p
              className="font-sans text-gray-400 text-base max-w-xl leading-relaxed"
              data-tina-field={tinaField("customDescription")}
            >
              {content.customDescription}
            </p>
          </div>
          <Link
            href={content.customCtaHref}
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-mono text-sm font-semibold hover:border-vish-accent hover:text-vish-accent transition-all duration-200 whitespace-nowrap"
          >
            {content.customCtaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Mobile link */}
        <div className="mt-10 md:hidden flex justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white font-sans text-sm hover:border-white/40 hover:bg-white/5 transition-all"
          >
            View all plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
