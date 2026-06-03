'use client';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useTinaProjectsList } from '../../hooks/useTinaVisualEditing';
import { Button } from '../ui/button/button';
import { SectionTitle } from '../ui/section-title/section-title';
import { ProjectCard } from '../ui/project-card/project-card';

export const Projects = ({ showViewAll = true }: { showViewAll?: boolean }) => {
  const { data: allProjects } = useTinaProjectsList();
  const projects = allProjects.filter((p) => p.featuredOnHome).slice(0, 4);

  return (
    <section className="projects py-32 px-6 md:px-12 bg-vish-bg" id="work">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <SectionTitle size="lg" className="mb-6">
              Selected Case Studies
            </SectionTitle>
            <p className="max-w-2xl font-sans text-lg leading-relaxed text-gray-400">
              Engineered for aesthetic authority and commercial impact.
            </p>
          </motion.div>
          <div className="hidden md:block font-mono text-sm text-gray-500 uppercase tracking-widest">
            // RECENT WORK 2024-2026
          </div>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              alternate
            />
          ))}
        </div>

        {showViewAll && (
          <div className="mt-20">
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
    </section>
  );
};
