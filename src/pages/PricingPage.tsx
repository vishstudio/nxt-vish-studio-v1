import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useTinaPricing } from '../hooks/useTinaVisualEditing';
import { PageLayout } from '../components/ui/PageLayout';
import { PageHero } from '../components/ui/PageHero';
import { Contact } from '../components/Contact';
import type { PricingPlan } from '../lib/pricing';

function PlanCard({ plan, index, tinaField, rawPlan }: {
  plan: PricingPlan;
  index: number;
  tinaField: (obj: any, field: string) => string | undefined;
  rawPlan: any;
}) {
  const isExternal = plan.ctaHref.startsWith('http');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl border p-8 lg:p-10 transition-all duration-300 ${plan.featured
        ? 'border-vish-accent/60 bg-white/[0.06] shadow-[0_0_80px_-12px] shadow-vish-accent/25'
        : 'border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]'
        }`}
    >
      {plan.featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-vish-accent text-black font-mono text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <span
          className="font-mono text-xs text-vish-accent tracking-widest uppercase mb-3 block"
          data-tina-field={rawPlan ? tinaField(rawPlan, 'label') : undefined}
        >
          {plan.label}
        </span>
        <h2
          className="font-display text-4xl font-medium text-white mb-6"
          data-tina-field={rawPlan ? tinaField(rawPlan, 'name') : undefined}
        >
          {plan.name}
        </h2>
        <div className="flex items-baseline gap-2 mb-1">
          <span
            className="font-display text-6xl font-medium text-white tracking-tight"
            data-tina-field={rawPlan ? tinaField(rawPlan, 'price') : undefined}
          >
            {plan.price}
          </span>
        </div>
        <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
          {plan.priceNote}
        </span>

        <div className="flex items-center gap-2 mt-5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-vish-accent" />
          <span className="font-mono text-xs text-gray-400">
            Delivery: {plan.delivery}
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p
        className="font-sans text-base text-gray-400 leading-relaxed mb-8 pb-8 border-b border-white/8"
        data-tina-field={rawPlan ? tinaField(rawPlan, 'tagline') : undefined}
      >
        {plan.tagline}
      </p>

      {/* Feature list */}
      <ul
        className="flex flex-col gap-3.5 mb-10 flex-1"
        data-tina-field={rawPlan ? tinaField(rawPlan, 'features') : undefined}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.featured ? 'bg-vish-accent/20' : 'bg-white/8'}`}>
              <Check className={`w-3 h-3 ${plan.featured ? 'text-vish-accent' : 'text-gray-400'}`} />
            </span>
            <span className="font-sans text-sm text-gray-300 leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Meta */}
      <div className="mb-8 space-y-2 pt-4 border-t border-white/8">
        {plan.bestFor && (
          <p className="font-mono text-xs text-gray-500 leading-relaxed">
            <span className="text-gray-600">Best for: </span>{plan.bestFor}
          </p>
        )}
        {plan.revisions && (
          <p className="font-mono text-xs text-gray-500">
            <span className="text-gray-600">Revisions: </span>{plan.revisions}
          </p>
        )}
      </div>

      {/* CTA */}
      {isExternal ? (
        <a
          href={plan.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-mono text-sm font-semibold transition-all duration-200 ${plan.featured
            ? 'bg-vish-accent text-black hover:bg-white'
            : 'border border-white/15 text-white hover:border-white/40 hover:bg-white/5'
            }`}
        >
          {plan.ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </a>
      ) : (
        <Link
          to={plan.ctaHref}
          className={`inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-mono text-sm font-semibold transition-all duration-200 ${plan.featured
            ? 'bg-vish-accent text-black hover:bg-white'
            : 'border border-white/15 text-white hover:border-white/40 hover:bg-white/5'
            }`}
        >
          {plan.ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </motion.div>
  );
}

export const PricingPage = () => {
  const { data: content, tinaField, rawPricingPage } = useTinaPricing();

  return (
    <PageLayout>
      <PageHero
        label={content.heroLabel}
        labelTinaField={tinaField('heroLabel')}
        title={
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white mb-8">
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
      />

      {/* Subtext */}
      <div className="px-6 md:px-12 -mt-8 pb-24 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-sans text-xl text-gray-400 max-w-2xl leading-relaxed"
          data-tina-field={tinaField('heroSubtext')}
        >
          {content.heroSubtext}
        </motion.p>
      </div>

      {/* Plans */}
      <section className="px-6 md:px-12 pb-32 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {content.plans.map((plan, index) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                index={index}
                tinaField={tinaField}
                rawPlan={rawPricingPage?.plans?.[index]}
              />
            ))}
          </div>

          {/* Custom / Enterprise block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl border border-white/8 bg-white/[0.02] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
          >
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-vish-accent" />
                <span
                  className="font-display text-3xl text-white"
                  data-tina-field={tinaField('customLabel')}
                >
                  {content.customLabel}
                </span>
              </div>
              <p
                className="font-sans text-gray-400 text-lg max-w-2xl leading-relaxed"
                data-tina-field={tinaField('customDescription')}
              >
                {content.customDescription}
              </p>
            </div>
            <Link
              to={content.customCtaHref}
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-mono text-sm font-semibold hover:border-vish-accent hover:text-vish-accent transition-all duration-200 whitespace-nowrap"
            >
              {content.customCtaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      <Contact />
    </PageLayout>
  );
};
