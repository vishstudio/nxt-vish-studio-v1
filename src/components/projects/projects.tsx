'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useTinaProjectsList } from '../../hooks/useTinaVisualEditing';
import { Button } from '../ui/button/button';
import { SectionTitle } from '../ui/section-title/section-title';
import { getImageUrl } from '../../utils/imageUrl';
import type { Project } from '../../lib/projects';

interface StickyProjectSlideProps {
  project: Project;
  isActive: boolean;
}

const StickyProjectSlide = ({
  project,
  isActive,
}: StickyProjectSlideProps) => {
  const category = Array.isArray(project.category) ? project.category.join(' / ') : project.category;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.36, ease: [0.33, 1, 0.68, 1] }}
      className={`absolute inset-0 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-16 ${
        isActive ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!isActive}
    >
      <Link
        href={`/project/${project.slug}`}
        className="group block overflow-hidden rounded-2xl bg-white/[0.035] lg:col-span-7"
        data-cursor="project"
        tabIndex={isActive ? 0 : -1}
      >
        <motion.div
          initial={{ opacity: 0, x: -28, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -18, scale: 0.985 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.58, ease: [0.33, 1, 0.68, 1] }}
          className="relative aspect-16/10"
        >
          <img
            src={getImageUrl(project.image)}
            alt={project.title}
            className="h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur-sm">
            {project.year}
          </div>
          <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-vish-accent text-black opacity-0 transition-all duration-500 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </motion.div>
      </Link>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 18 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.33, 1, 0.68, 1] }}
        className="relative lg:col-span-5 lg:pr-16 xl:pr-20"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.42, delay: 0.14, ease: [0.33, 1, 0.68, 1] }}
          className="mb-5 block font-mono text-xs font-semibold uppercase tracking-widest text-vish-accent"
        >
          {category}
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.48, delay: 0.18, ease: [0.33, 1, 0.68, 1] }}
        >
          <Link href={`/project/${project.slug}`} tabIndex={isActive ? 0 : -1}>
            <h3 className="font-display text-4xl font-medium leading-[0.98] tracking-tight text-white transition-colors hover:text-gray-300 md:text-6xl xl:text-7xl">
              {project.title}
            </h3>
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.48, delay: 0.22, ease: [0.33, 1, 0.68, 1] }}
          className="mt-6 max-w-md font-sans text-base leading-relaxed text-gray-400 md:text-lg"
        >
          {project.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.48, delay: 0.26, ease: [0.33, 1, 0.68, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <span className="rounded-full border border-white/10 px-4 py-2 font-mono text-sm text-gray-400">
            {project.year}
          </span>
          <Link
            href={`/project/${project.slug}`}
            tabIndex={isActive ? 0 : -1}
            className="font-sans text-white transition-colors hover:text-vish-accent"
          >
            View Case Study
          </Link>
          {project.siteUrl && (
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? 0 : -1}
              className="inline-flex items-center gap-1.5 rounded-full bg-vish-accent px-3 py-1 font-mono text-xs font-semibold text-black transition-colors duration-200 hover:bg-white"
            >
              View Site <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

interface ProjectProgressSliderProps {
  projects: Project[];
  activeIndex: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const ProjectProgressSlider = ({
  projects,
  activeIndex,
  orientation = 'horizontal',
  className = '',
}: ProjectProgressSliderProps) => (
  <div
    className={`${orientation === 'vertical' ? 'flex-col items-center gap-3' : 'items-center gap-2'} ${className}`}
    aria-hidden="true"
  >
    {projects.map((project, index) => (
      <span
        key={project.slug}
        className={`rounded-full transition-all duration-300 ${
          orientation === 'vertical'
            ? index === activeIndex
              ? 'h-8 w-1.5 bg-vish-accent'
              : 'h-1.5 w-1.5 bg-white/15'
            : index === activeIndex
              ? 'h-1.5 w-8 bg-vish-accent'
              : 'h-1.5 w-1.5 bg-white/15'
        }`}
      />
    ))}
  </div>
);

export const Projects = ({ showViewAll = true }: { showViewAll?: boolean }) => {
  const { data: allProjects } = useTinaProjectsList();
  const projects = allProjects.filter((p) => p.featuredOnHome).slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (projects.length === 0) return;

    const nextIndex = Math.min(projects.length - 1, Math.max(0, Math.floor(latest * projects.length)));
    setActiveIndex(nextIndex);
  });

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="projects relative bg-vish-bg px-6 md:px-12"
      id="work"
      style={{ height: `${projects.length * 115}svh` }}
    >
      <div className="sticky top-0 flex min-h-svh items-center overflow-hidden py-20 md:py-32">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-8 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <SectionTitle size="md" className="mb-4 md:mb-6 md:text-6xl lg:text-7xl">
                Selected Case Studies
              </SectionTitle>
              <p className="max-w-2xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
                Engineered for aesthetic authority and commercial impact.
              </p>
            </motion.div>
            <div className="hidden md:block font-mono text-sm text-gray-500 uppercase tracking-widest">
              // RECENT WORK 2024-2026
            </div>
          </div>

          <div className="relative min-h-[430px] sm:min-h-[500px] md:min-h-[680px] lg:min-h-[540px]">
            <ProjectProgressSlider
              projects={projects}
              activeIndex={activeIndex}
              orientation="vertical"
              className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 lg:flex"
            />
            <AnimatePresence mode="wait">
              <StickyProjectSlide
                key={projects[activeIndex].slug}
                project={projects[activeIndex]}
                isActive
              />
            </AnimatePresence>
          </div>

          {showViewAll && (
            <div className="mt-10 flex items-center justify-between gap-6">
              <ProjectProgressSlider projects={projects} activeIndex={activeIndex} className="flex lg:hidden" />
              <Button
                href="/projects"
                variant="white"
                size="md"
                icon={<ArrowUpRight className="w-5 h-5" />}
                iconPosition="right"
              >
                View All Projects
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
