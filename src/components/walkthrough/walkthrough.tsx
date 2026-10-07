'use client';

import { CalendarCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useTinaPage } from '../../hooks/tina/usePage';
import { getWalkthroughPage } from '../../lib/content';
import { getIcon } from '../../lib/icons';
import { LogoText } from '../logo-text/logo-text';
import { Button } from '../ui/button/button';

export const Walkthrough = () => {
  const { data: content, tinaField, rawPage } = useTinaPage('walkthrough.json', getWalkthroughPage());

  return (
    <div className="min-h-screen bg-black px-6 pb-20 pt-24 text-white md:px-12 md:pt-28">
      <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]">
          <div className="flex items-center gap-3 border-b border-white/10 pb-5">
            <img src="/assets/icon.svg" alt="" className="h-7 w-7" aria-hidden="true" />
            <LogoText suffix="portal" />
          </div>

          <nav className="mt-6 grid gap-2" aria-label="Portal walkthrough sections" data-tina-field={tinaField('navigationItems')}>
            {content.navigationItems.map((item, index) => {
              const Icon = getIcon(item.icon);

              return (
                <a
                  key={item.label}
                  href={`#step-${index + 1}`}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-sans text-sm transition-colors ${
                    index === 0 ? 'bg-white text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-white/10 pt-5 lg:mt-auto">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-vish-accent" data-tina-field={tinaField('statusLabel')}>
              {content.statusLabel}
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-gray-400" data-tina-field={tinaField('statusText')}>
              {content.statusText}
            </p>
          </div>
        </aside>

        <main className="grid gap-8">
          <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-10 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-vish-accent" data-tina-field={tinaField('label')}>
                {content.label}
              </p>
              <h1
                className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.95] text-white md:text-7xl"
                data-tina-field={tinaField('heading')}
              >
                {content.heading}<span className="text-vish-accent">.</span>
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-gray-400" data-tina-field={tinaField('description')}>
                {content.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href="/book-call"
                  variant="cta"
                  size="md"
                  icon={<CalendarCheck className="h-4 w-4" />}
                  tinaField={tinaField('primaryCtaLabel')}
                >
                  {content.primaryCtaLabel}
                </Button>
                <Button href="#step-1" variant="outline" size="md" tinaField={tinaField('secondaryCtaLabel')}>
                  {content.secondaryCtaLabel}
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-gray-500" data-tina-field={tinaField('todayLabel')}>
                  {content.todayLabel}
                </p>
                <span
                  className="rounded-full bg-vish-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-black"
                  data-tina-field={tinaField('todayBadge')}
                >
                  {content.todayBadge}
                </span>
              </div>
              <div className="mt-6 grid gap-3" data-tina-field={tinaField('activityItems')}>
                {content.activityItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                    <CheckCircle2 className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    <p className="font-sans text-sm text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-4">
            {content.steps.map((step, index) => {
              const Icon = getIcon(step.icon);
              const rawStep = rawPage?.steps?.[index];
              const stepField = (name: string) => (rawStep ? tinaField(rawStep, name) : undefined);

              return (
                <article
                  key={step.title}
                  id={`step-${index + 1}`}
                  className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:grid-cols-[8rem_minmax(0,1fr)_12rem] md:items-center md:p-8"
                >
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-widest text-vish-accent" data-tina-field={stepField('eyebrow')}>
                      {step.eyebrow}
                    </p>
                    <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display text-3xl font-medium text-white" data-tina-field={stepField('title')}>
                      {step.title}<span className="text-vish-accent">.</span>
                    </h2>
                    <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-gray-400" data-tina-field={stepField('description')}>
                      {step.description}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-gray-500" data-tina-field={tinaField('outcomeLabel')}>
                      {content.outcomeLabel}
                    </p>
                    <p className="mt-3 font-sans text-sm text-white" data-tina-field={stepField('outcome')}>
                      {step.outcome}
                    </p>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-8">
            <div className="flex items-start gap-4">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-vish-accent" aria-hidden="true" />
              <div>
                <h2 className="font-display text-3xl font-medium text-white" data-tina-field={tinaField('closingHeading')}>
                  {content.closingHeading}
                </h2>
                <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-gray-400" data-tina-field={tinaField('closingDescription')}>
                  {content.closingDescription}
                </p>
              </div>
            </div>
            <Button
              href="/book-call"
              variant="outline"
              size="lg"
              icon={<CalendarCheck className="h-4 w-4" />}
              tinaField={tinaField('closingCtaLabel')}
            >
              {content.closingCtaLabel}
            </Button>
          </section>
        </main>
      </div>
    </div>
  );
}
