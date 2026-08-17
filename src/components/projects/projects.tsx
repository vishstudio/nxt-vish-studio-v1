'use client';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useTinaHome, useTinaProjectsList } from '../../hooks/useTinaVisualEditing';
import { trackProjectSiteClick } from '../../lib/analytics';
import { Button } from '../ui/button/button';
import { SectionTitle } from '../ui/section-title/section-title';
import { getImageUrl } from '../../utils/imageUrl';
import type { Project } from '../../lib/projects';

interface ProjectPreviewProps {
  project: Project;
}

const getCategoryLabel = (project: Project) => project.category.join(' / ');

const ProjectPreview = ({ project }: ProjectPreviewProps) => {
  const category = getCategoryLabel(project);

  return (
    <article className="group">
      <Link
        href={`/project/${project.slug}`}
        className="block overflow-hidden rounded-2xl bg-white/[0.035]"
        data-cursor="project"
      >
        <div className="relative aspect-4/5 overflow-hidden">
          <img
            src={getImageUrl(project.image)}
            alt={project.title}
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-vish-accent md:bottom-5 md:left-5">
            {project.year}
          </div>
          <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110 md:bottom-5 md:right-5">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </Link>

      <div className="pt-4">
        <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-vish-accent">
          {category}
        </p>
        <Link href={`/project/${project.slug}`} className="mt-2 block">
          <h3 className="font-display text-2xl font-medium leading-none text-white transition-colors duration-300 group-hover:text-vish-gray md:text-3xl">
            {project.title}
          </h3>
        </Link>
        {project.siteUrl && (
          <Button
            href={project.siteUrl}
            variant="link"
            size="text"
            className="mt-4 text-sm"
            onClick={() => trackProjectSiteClick(project.slug, project.title)}
            icon={<ExternalLink className="h-3.5 w-3.5" />}
            iconPosition="right"
          >
            View site
          </Button>
        )}
      </div>
    </article>
  );
};

export const Projects = ({ showViewAll = true }: { showViewAll?: boolean }) => {
  const { data: allProjects } = useTinaProjectsList();
  const { data: content, tinaField } = useTinaHome();
  const projects = allProjects.filter((p) => p.featuredOnHome).slice(0, 4);

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

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-12">
          {projects.map((project) => (
            <ProjectPreview
              key={project.slug}
              project={project}
            />
          ))}
        </div>

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
