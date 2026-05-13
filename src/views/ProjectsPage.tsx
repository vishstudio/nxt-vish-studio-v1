'use client';
import { motion } from 'motion/react';
import { useTinaProjectsList } from '../hooks/useTinaVisualEditing';
import type { Project } from '../lib/projects';
import { Contact } from '../components/contact/contact';
import { PageLayout } from '../components/ui/page-layout/page-layout';
import { PageHero } from '../components/ui/page-hero/page-hero';
import { Section } from '../components/ui/section/section';
import { ProjectCard } from '../components/ui/project-card/project-card';

export const ProjectsPage = () => {
  const { data: projects } = useTinaProjectsList();

  return (
    <PageLayout>
      <PageHero
        label="Our Portfolio"
        title={
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.95] text-white mb-12"
          >
            Selected <br />
            <span className="text-gray-500">works<span className="text-vish-accent">.</span></span>
          </motion.h1>
        }
        description="Explore a curated selection of our finest digital products. From immersive web experiences to comprehensive brand identities, each project represents our commitment to innovation and design excellence."
      />

      <Section className="mb-32">
        <div className="flex flex-col gap-20 md:gap-40">
          {projects.map((project: Project, index: number) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Section>

      <Contact />
    </PageLayout>
  );
};
