'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

interface RecentProjectStripItem {
  slug: string;
  title: string;
  year: string;
  image: string;
}

interface RecentProjectStripMotionProps {
  projects: RecentProjectStripItem[];
}

interface RecentProjectTileProps {
  project: RecentProjectStripItem;
  index: number;
}

const RecentProjectTile = ({ project, index }: RecentProjectTileProps) => {
  return (
    <div className={index === 3 ? 'block md:hidden lg:block' : undefined}>
      <Link
        href={`/project/${project.slug}`}
        className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] md:rounded-2xl"
        data-cursor="project"
        aria-label={`View ${project.title} project`}
      >
        <div className="relative h-[21rem] md:h-[36rem] lg:h-[44rem]">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover opacity-90 transition duration-700 ease-out group-hover:scale-[1.035] group-hover:opacity-100"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'low'}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-black/0 opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
          <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5">
            <p className="font-mono text-[0.625rem] font-semibold uppercase leading-none tracking-widest text-vish-accent md:text-xs">
              {project.year}
            </p>
            <h2 className="mt-1 font-display text-sm font-medium leading-tight text-white sm:text-base md:mt-2 md:text-3xl">
              {project.title}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export const RecentProjectStripMotion = ({ projects }: RecentProjectStripMotionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const rawParallaxY = useTransform(scrollYProgress, [0, 1], [64, -42]);
  const parallaxY = useSpring(rawParallaxY, {
    stiffness: 90,
    damping: 28,
    mass: 0.45,
  });

  return (
    <section
      ref={sectionRef}
      id="recent-work"
      className="recent-project-strip bg-vish-bg pb-10 pt-20 md:pb-14 md:pt-24 lg:py-16"
      aria-label="Recent project images"
    >
      <div className="overflow-hidden pb-20 pt-4 md:pb-28 md:pt-8 lg:pb-32">
        <div className="mx-[calc(50%-50vw)] w-[148vw] -translate-x-[24vw] md:w-[116vw] md:-translate-x-[8vw] lg:w-[112vw] lg:-translate-x-[6vw]">
          <motion.div
            style={shouldReduceMotion ? undefined : { y: parallaxY }}
            className="grid grid-cols-4 gap-3 will-change-transform md:grid-cols-3 md:gap-4 lg:grid-cols-4"
          >
            {projects.map((project, index) => (
              <RecentProjectTile
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
