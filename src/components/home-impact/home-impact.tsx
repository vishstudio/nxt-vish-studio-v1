import { getHomePage } from '../../lib/content';
import { HeroStats } from '../hero-stats/hero-stats';

export const HomeImpact = () => {
  const content = getHomePage();
  const impactStats = content.heroStats.slice(0, 3);

  if (impactStats.length === 0) {
    return null;
  }

  return (
    <section className="home-impact relative overflow-hidden bg-vish-bg px-6 py-20 text-white md:px-12 md:py-28" aria-labelledby="home-impact-title">
      <img
        src="/assets/img/about-studio.jpg"
        alt=""
        className="absolute -top-[10%] left-0 h-[120%] w-full object-cover opacity-30 grayscale"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/45 to-black/85" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-12 max-w-4xl md:mb-16">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-vish-accent">
            {content.heroLabel}
          </p>
          <h2
            id="home-impact-title"
            className="mt-5 font-display text-4xl font-medium leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {content.heroDescription}
          </h2>
        </div>
        <HeroStats stats={impactStats} isHeroRevealed layout="impact" />
      </div>
    </section>
  );
};
