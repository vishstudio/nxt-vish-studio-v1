import type { Metadata } from 'next';
import { getProjectsPage } from '@/src/lib/content';
import { toMetadata } from '@/src/lib/seo';
import { ProjectsPage } from '@/src/views/ProjectsPage';

export const metadata: Metadata = toMetadata(getProjectsPage().seo);

const Projects = () => {
  return <ProjectsPage />;
}

export default Projects;
