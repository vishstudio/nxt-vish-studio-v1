'use client';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useTinaHome, useTinaProjectsList } from '../../hooks/useTinaVisualEditing';
import { Button } from '../ui/button/button';
import { SectionTitle } from '../ui/section-title/section-title';
import { getImageUrl } from '../../utils/imageUrl';
import type { Project } from '../../lib/projects';

interface ProjectShowcaseCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

const getCategoryLabel = (project: Project) => project.category.join(' / ');

const ProjectShowcaseCard = ({
  project,
  index,
  featured = false,
}: ProjectShowcaseCardProps) => {
  const category = getCategoryLabel(project);
  const caseNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.18), ease: [0.16, 1, 0.3, 1] }}
      className={
        featured
          ? 'group grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8'
          : 'group flex h-full flex-col'
      }
    >
      <Link
        href={`/project/${project.slug}`}
        className={
          featured
            ? 'block overflow-hidden rounded-2xl bg-white/[0.035] lg:col-span-7'
            : 'block overflow-hidden rounded-2xl bg-white/[0.035]'
        }
        data-cursor="project"
      >
        <div
          className={
            featured
              ? 'relative aspect-16/10 overflow-hidden lg:h-full lg:min-h-[34rem]'
              : 'relative aspect-16/11 overflow-hidden'
          }
        >
          <img
            src={getImageUrl(project.image)}
            alt={project.title}
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100"
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={featured ? 'high' : 'low'}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/55 px-3 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-widest text-white/75 backdrop-blur-sm md:left-5 md:top-5">
            Case {caseNumber}
          </div>
          <div className="absolute bottom-4 left-4 rounded-full bg-vish-accent px-3 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-black md:bottom-5 md:left-5">
            {project.year}
          </div>
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:right-5 md:top-5">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </Link>

      <div
        className={
          featured
            ? 'flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-6 lg:col-span-5 lg:p-8'
            : 'flex flex-1 flex-col pt-5'
        }
      >
        <div>
          <span className="mb-4 block font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-vish-accent">
            {category}
          </span>
          <Link href={`/project/${project.slug}`} className="block">
            <h3
              className={
                featured
                  ? 'font-display text-4xl font-medium leading-[1.02] text-white transition-colors duration-300 group-hover:text-vish-gray md:text-5xl xl:text-6xl'
                  : 'font-display text-2xl font-medium leading-[1.08] text-white transition-colors duration-300 group-hover:text-vish-gray md:text-3xl'
              }
            >
              {project.title}
            </h3>
          </Link>
          <p
            className={
              featured
                ? 'mt-5 max-w-md font-sans text-base leading-relaxed text-vish-gray md:text-lg'
                : 'mt-3 max-w-md font-sans text-sm leading-relaxed text-vish-gray'
            }
          >
            {project.description}
          </p>
        </div>

        <div className={featured ? 'mt-8 flex flex-wrap items-center gap-4' : 'mt-5 flex flex-wrap items-center gap-4'}>
          <Button
            href={`/project/${project.slug}`}
            variant="caseStudy"
            size="text"
          >
            View Case Study
          </Button>
          {project.siteUrl && (
            <Button
              href={project.siteUrl}
              variant="external"
              size="xs"
              icon={<ExternalLink className="h-3 w-3" />}
              iconPosition="right"
            >
              View Site
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export const Projects = ({ showViewAll = true }: { showViewAll?: boolean }) => {
  const { data: allProjects } = useTinaProjectsList();
  const { data: content, tinaField } = useTinaHome();
  const projects = allProjects.filter((p) => p.featuredOnHome).slice(0, 4);
  const [featuredProject, ...supportingProjects] = projects;

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      className="projects relative bg-vish-bg px-6 py-24 md:px-12 md:py-32"
      id="work"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p
              className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-vish-accent"
              data-tina-field={tinaField('projectsLabel')}
            >
              {content.projectsLabel}
            </p>
            <SectionTitle
              size="md"
              className="mb-4 md:mb-6 md:text-6xl lg:text-7xl"
              tinaField={tinaField('projectsHeading')}
            >
              {content.projectsHeading}
            </SectionTitle>
            <p
              className="max-w-2xl font-sans text-base leading-relaxed text-vish-gray md:text-lg"
              data-tina-field={tinaField('projectsDescription')}
            >
              {content.projectsDescription}
            </p>
          </motion.div>
          {showViewAll && (
            <Button
              href="/projects"
              variant="navigation"
              size="md"
              icon={<ArrowUpRight className="w-5 h-5" />}
              iconPosition="right"
              className="hidden w-fit md:inline-flex"
            >
              {content.projectsButtonText}
            </Button>
          )}
        </div>

        {featuredProject && (
          <ProjectShowcaseCard project={featuredProject} index={0} featured />
        )}

        {supportingProjects.length > 0 && (
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {supportingProjects.map((project, index) => (
              <ProjectShowcaseCard
                key={project.slug}
                project={project}
                index={index + 1}
              />
            ))}
          </div>
        )}

        {showViewAll && (
          <div className="mt-12 flex md:hidden">
            <Button
              href="/projects"
              variant="navigation"
              size="md"
              icon={<ArrowUpRight className="w-5 h-5" />}
              iconPosition="right"
              className="w-full"
            >
              {content.projectsButtonText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
