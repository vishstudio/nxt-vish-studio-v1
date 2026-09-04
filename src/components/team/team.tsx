'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'motion/react';
import type { TeamMember } from '../../lib/content';
import { getAboutPage } from '../../lib/content';
import { CarouselProgress } from '../carousel-progress/CarouselProgress';
import { SectionTitle } from '../ui/section-title/section-title';

const desktopTrackPositions = [
  '0%',
  'calc(-20% - 0.3rem)',
  'calc(-40% - 0.6rem)',
] as const;

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

interface TeamProps {
  showTitle?: boolean;
  members?: TeamMember[];
  /** Raw Tina team member objects for click-to-edit annotations */
  rawTinaMembers?: any[];
  /** tinaField helper from useTinaAbout */
  tinaField?: (objOrField: any, fieldName?: string) => string | undefined;
}

export const Team = ({ showTitle = true, members, rawTinaMembers, tinaField }: TeamProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [desktopTrackStep, setDesktopTrackStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  // Use provided members or fall back to static about page data
  const teamData = members ?? getAboutPage().teamMembers ?? [];
  const team = [...teamData].sort((a, b) => a.order - b.order);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
    const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
    const updateViewport = () => {
      setIsDesktop(desktopMediaQuery.matches);
      setIsMobile(mobileMediaQuery.matches);
    };

    updateViewport();
    desktopMediaQuery.addEventListener('change', updateViewport);
    mobileMediaQuery.addEventListener('change', updateViewport);

    return () => {
      desktopMediaQuery.removeEventListener('change', updateViewport);
      mobileMediaQuery.removeEventListener('change', updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setDesktopTrackStep(0);
      return;
    }

    const updateTrackStep = (progress: number) => {
      const nextStep = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2;
      setDesktopTrackStep((currentStep) => currentStep === nextStep ? currentStep : nextStep);
    };

    updateTrackStep(scrollYProgress.get());
    return scrollYProgress.on('change', updateTrackStep);
  }, [isDesktop, scrollYProgress]);

  useEffect(() => {
    if (!isMobile || team.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const advanceCarousel = () => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const cards = Array.from(carousel.querySelectorAll<HTMLElement>('[data-team-card]'));
      if (cards.length === 0) return;
      const nextCard = cards[(activeMemberIndex + 1) % cards.length];

      nextCard?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };

    const interval = window.setInterval(advanceCarousel, 5000);
    return () => window.clearInterval(interval);
  }, [activeMemberIndex, isMobile, team.length]);

  // Build a name → raw tina object map so sorting doesn't break index alignment
  const rawByName: Record<string, any> = {};
  if (rawTinaMembers && tinaField) {
    rawTinaMembers.forEach((m: any) => {
      if (m?.name) rawByName[m.name] = m;
    });
  }

  const handleCarouselScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(
      carousel.querySelectorAll<HTMLElement>('[data-team-card]'),
    );
    if (cards.length === 0) return;

    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    const closestIndex = cards.reduce((closest, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const closestCard = cards[closest];
      const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;

      return Math.abs(cardCenter - carouselCenter) < Math.abs(closestCenter - carouselCenter)
        ? index
        : closest;
    }, 0);

    setActiveMemberIndex(closestIndex);
  };

  return (
    <section
      ref={sectionRef}
      className="team bg-vish-bg px-6 pb-36 pt-24 text-white md:px-12 md:py-32 lg:h-[170vh] lg:py-0"
      id="team"
    >
      <div className="mx-auto max-w-[1400px] lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:flex-col lg:justify-center">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-20 lg:mb-16"
          >
            <SectionTitle className="mb-6">Our Team</SectionTitle>
            <p className="max-w-2xl font-sans text-xl leading-relaxed text-gray-400 md:text-2xl">
              We are a collective of specialists, working across disciplines to deliver unified digital experiences.
            </p>
          </motion.div>
        )}

        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="overflow-x-auto pb-5 [scrollbar-width:none] lg:overflow-hidden lg:pb-0 [&::-webkit-scrollbar]:hidden"
          aria-label="Team members"
        >
          <motion.div
            className="flex snap-x snap-mandatory gap-6 lg:w-[calc(166.666667%+1rem)] lg:snap-none"
            animate={{ x: isDesktop ? desktopTrackPositions[desktopTrackStep] : 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {team.map((member: TeamMember, index: number) => {
              const rawMember = rawByName[member.name];

              return (
                <motion.article
                  key={member.name}
                  data-team-card
                  initial={{ opacity: 0, x: 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group min-w-[78%] snap-center text-left md:min-w-[48%] lg:w-[calc((100%-6rem)/5)] lg:min-w-0"
                >
                  <div
                    className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-vish-subtle shadow-2xl shadow-black/40"
                    data-tina-field={rawMember && tinaField ? tinaField(rawMember, 'image') : undefined}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-vish-subtle">
                      <span className="font-display text-7xl font-medium text-white/10">
                        {getInitials(member.name)}
                      </span>
                    </div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-black px-5 py-4 shadow-xl shadow-black/30 sm:inset-x-5 sm:bottom-5 sm:px-6 sm:py-5 text-center">
                      <p
                        className="mt-2 font-mono text-xs uppercase leading-relaxed tracking-wider text-vish-accent"
                        data-tina-field={rawMember && tinaField ? tinaField(rawMember, 'role') : undefined}
                      >
                        {member.role}
                      </p>

                      <h3
                        className="font-display text-2xl font-medium leading-tight text-white md:text-3xl"
                        data-tina-field={rawMember && tinaField ? tinaField(rawMember, 'name') : undefined}
                      >
                        {member.name}
                        <span className="text-vish-accent">.</span>
                      </h3>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        <CarouselProgress
          count={team.length}
          activeIndex={activeMemberIndex}
          className="mt-6 flex justify-center md:hidden"
        />
      </div>
    </section>
  );
};
