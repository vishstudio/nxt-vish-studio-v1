'use client';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { User, PenTool, Sparkles, Globe, Terminal } from 'lucide-react';
import type { TeamMember } from '../../lib/content';
import { getAboutPage } from '../../lib/content';
import { CarouselProgress } from '../carousel-progress/CarouselProgress';
import { SectionTitle } from '../ui/section-title/section-title';

// Helper to get icon based on role
const getIcon = (role: string) => {
  const lowerRole = role.toLowerCase();
  if (lowerRole.includes('founder') || lowerRole.includes('director')) return Sparkles;
  if (lowerRole.includes('designer') || lowerRole.includes('creative')) return PenTool;
  if (lowerRole.includes('technical') || lowerRole.includes('developer')) return Terminal;
  if (lowerRole.includes('strategist')) return Globe;
  return User;
};

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
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0 lg:gap-6 [&::-webkit-scrollbar]:hidden"
          aria-label="Team members"
        >
          {team.map((member: TeamMember, index: number) => {
            const Icon = getIcon(member.role);
            const rawMember = rawByName[member.name];
            return (
              <motion.div
                key={member.name}
                data-team-card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group min-w-[80%] snap-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-colors duration-500 hover:border-vish-accent/35 md:min-w-0"
              >
                <div
                  className="relative aspect-square overflow-hidden"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 font-mono text-xs text-vish-accent backdrop-blur-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-gray-300 backdrop-blur-sm transition-colors duration-500 group-hover:border-vish-accent/50 group-hover:text-vish-accent">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>

                <div className="border-t border-white/10 p-5 md:p-7">
                  <p
                    className="mb-4 font-mono text-xs uppercase leading-relaxed tracking-wider text-vish-accent"
                    data-tina-field={rawMember && tinaField ? tinaField(rawMember, 'role') : undefined}
                  >
                    {member.role}
                  </p>

                  <h3
                    className="font-display text-2xl font-medium leading-tight text-white transition-colors duration-500 group-hover:text-vish-gray md:text-4xl"
                    data-tina-field={rawMember && tinaField ? tinaField(rawMember, 'name') : undefined}
                  >
                    {member.name}
                    <span className="text-vish-accent">.</span>
                  </h3>

                  <p
                    className="mt-5 font-sans text-sm leading-relaxed text-gray-400 transition-colors duration-500 group-hover:text-gray-300 md:text-base"
                    data-tina-field={rawMember && tinaField ? tinaField(rawMember, 'bio') : undefined}
                  >
                    {member.bio}
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
