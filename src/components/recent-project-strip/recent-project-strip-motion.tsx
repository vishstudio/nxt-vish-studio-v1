'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';

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
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function getInitialYOffset(index: number) {
  if (index === 1 || index === 2) {
    return index === 1 ? 38 : 56;
  }

  return index === 0 ? 132 : 112;
}

function RecentProjectTile({ project, index, progress }: RecentProjectTileProps) {
  const y = useTransform(progress, [0, 0.82], [getInitialYOffset(index), 0]);
  const opacity = useTransform(progress, [0, 0.55], [0.72, 1]);
  const scale = useTransform(progress, [0, 0.82], [0.985, 1]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className={index === 3 ? 'block md:hidden lg:block' : undefined}
    >
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
            loading="eager"
            decoding="async"
            fetchPriority="low"
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
    </motion.div>
  );
}

export function RecentProjectStripMotion({ projects }: RecentProjectStripMotionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  return (
    <section
      ref={sectionRef}
      id="recent-work"
      className="recent-project-strip bg-vish-bg pb-10 pt-20 md:pb-14 md:pt-24 lg:py-16"
      aria-label="Recent project images"
    >
      <div className="overflow-hidden pb-20 pt-4 md:pb-28 md:pt-8 lg:pb-32">
        <div className="mx-[calc(50%-50vw)] grid w-[148vw] -translate-x-[24vw] grid-cols-4 gap-3 md:w-[116vw] md:-translate-x-[8vw] md:grid-cols-3 md:gap-4 lg:w-[112vw] lg:-translate-x-[6vw] lg:grid-cols-4">
          {projects.map((project, index) => (
            <RecentProjectTile
              key={project.slug}
              project={project}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
