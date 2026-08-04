import type { Metadata } from 'next';
import { ProjectsPage } from '@/src/views/ProjectsPage';

export const metadata: Metadata = {
  title: 'Projects | VISH Studio',
  description: 'Explore our portfolio of custom web applications, immersive frontend platforms, and brand architecture projects.',
};

const Projects = () => {
  return <ProjectsPage />;
}

export default Projects;
