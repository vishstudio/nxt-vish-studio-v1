'use client';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { TeamMember } from '../../lib/content';
import { getAboutPage } from '../../lib/content';
import { CarouselProgress } from '../carousel-progress/CarouselProgress';
import { SectionTitle } from '../ui/section-title/section-title';

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  // Use provided members or fall back to static about page data
  const teamData = members ?? getAboutPage().teamMembers ?? [];
  const team = [...teamData].sort((a, b) => a.order - b.order);

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
    <section className="team px-6 pb-36 pt-24 md:px-12 md:py-32 bg-vish-bg text-white" id="team">
      <div className="max-w-[1400px] mx-auto">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-32"
          >
            <SectionTitle className="mb-6">Our Team</SectionTitle>
            <p className="font-sans text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
              We are a collective of specialists, working across disciplines to deliver unified digital experiences.
            </p>
          </motion.div>
        )}

        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5 [scrollbar-width:none] md:grid md:grid-cols-2 md:items-start md:gap-x-10 md:gap-y-20 md:overflow-visible md:pb-0 lg:grid-cols-4 lg:gap-x-12 [&::-webkit-scrollbar]:hidden"
          aria-label="Team members"
        >
          {team.map((member: TeamMember, index: number) => {
            const rawMember = rawByName[member.name];
            const staggerClass = index % 3 === 0
              ? 'md:pt-16'
              : index % 3 === 1
                ? 'md:pt-0'
                : 'md:pt-10';
            return (
              <motion.div
                key={member.name}
                data-team-card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group min-w-[78%] snap-center text-center md:min-w-0 ${staggerClass}`}
              >
                <div
                  className="relative mx-auto aspect-square w-full max-w-[17rem] overflow-hidden rounded-3xl border border-white/10 bg-vish-subtle shadow-2xl shadow-black/40 md:max-w-[19rem] lg:max-w-[18rem]"
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
                    loading="lazy"
                  />
                </div>

                <div className="mt-8">
                  <h3
                    className="font-display text-2xl font-medium leading-tight text-white transition-colors duration-500 group-hover:text-vish-gray md:text-3xl"
                    data-tina-field={rawMember && tinaField ? tinaField(rawMember, 'name') : undefined}
                  >
                    {member.name}
                    <span className="text-vish-accent">.</span>
                  </h3>

                  <p
                    className="mt-3 font-mono text-xs uppercase leading-relaxed tracking-wider text-vish-accent"
                    data-tina-field={rawMember && tinaField ? tinaField(rawMember, 'role') : undefined}
                  >
                    {member.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
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
