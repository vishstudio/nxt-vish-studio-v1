'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';

interface ProjectCardProject {
  slug: string;
  title: string;
  category: string | string[];
  image: string;
  year: string;
  description: string;
  siteUrl?: string;
}

interface ProjectCardProps {
  project: ProjectCardProject;
  index: number;
  alternate?: boolean;
}

export const ProjectCard = ({ project, index, alternate = true }: ProjectCardProps) => {
  const isReversed = alternate && index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-20 items-center`}
    >
      {/* Project Image */}
      <Link
        href={`/project/${project.slug}`}
        className="w-full md:w-3/5 group overflow-hidden rounded-2xl block relative"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="aspect-16/10 bg-gray-900"
        >
          <img
            src={getImageUrl(project.image)}
            alt={project.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />
        </motion.div>

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Overlay Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-vish-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-xl z-10">
          <ArrowUpRight className="w-8 h-8 text-black" />
        </div>
      </Link>

      {/* Project Details */}
      <div className="w-full md:w-2/5 flex flex-col items-start">
        <span className="font-mono text-vish-accent mb-4 md:mb-6 text-sm tracking-widest uppercase">
          {Array.isArray(project.category) ? project.category.join(' / ') : project.category}
        </span>

        <Link href={`/project/${project.slug}`} className="block">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-[1.1] hover:text-gray-300 transition-colors">
            {project.title}
          </h2>
        </Link>

        <p className="font-sans text-gray-400 text-lg leading-relaxed mb-8 max-w-sm">
          {project.description}
        </p>

        <div className="flex items-center gap-4">
          <span className="px-4 py-2 rounded-full border border-white/10 text-sm text-gray-400 font-mono">
            {project.year}
          </span>
          <Link
            href={`/project/${project.slug}`}
            className="text-white border-b border-transparent hover:border-vish-accent hover:text-vish-accent transition-all duration-300 pb-0.5"
          >
            View Case Study
          </Link>
          {project.siteUrl && (
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-vish-accent text-black font-mono text-xs font-semibold rounded-full hover:bg-white transition-colors duration-200 group"
            >
              View Site <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
